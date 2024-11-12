
import re

import json
from openai import OpenAI
import os

# Configuração da API do OpenAI com a chave de API

client = OpenAI(api_key="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")

def limpar_texto(text):
    """Limpa o texto removendo quebras de linha e espaços desnecessários."""
    text = re.sub(r'\n+', '\n', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def extrair_dados_com_chatgpt(texto):
    prompt = (
        "Extraia as informações pessoais, informações de contato, habilidades, experiência profissional, formação e certificações do currículo abaixo."
        "Organize as informações em listas e seja breve:\n\n"
        f"{texto}\n\n"

    )

    # Chamada otimizada para a API do ChatGPT
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Você é um assistente que extrai informações de currículos."},
            {"role": "user", "content": prompt}
        ],
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": "curriculo_schema",
                "schema": {
                    "type": "object",
                    "properties": {
                        "nome": {"type": "string", "description": "O nome completo do candidato."},
                        "email": {"type": "string", "description": "Endereço de email do candidato.",
                                  "format": "email"},
                        "telefone": {"type": "string", "description": "Número de telefone do candidato."},
                        "habilidades": {"type": "array", "items": {"type": "string"}},
                        "experiencia": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "cargo": {"type": "string"},
                                    "empresa": {"type": "string"},
                                    "duracao": {"type": "string"}
                                },
                                "required": ["cargo", "empresa", "duracao"]
                            }
                        },
                        "formacao": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "curso": {"type": "string"},
                                    "instituicao": {"type": "string"},
                                    "ano": {"type": "string"}
                                },
                                "required": ["curso", "instituicao"]
                            }
                        }
                    },
                    "required": ["nome", "email", "telefone", "habilidades", "experiencia", "formacao"],
                    "additionalProperties": False
                }
            }
        }
    )
    print(response)

    content = response.choices[0].message.content
    dados = json.loads(content)
    print(dados)
    return dados



def calcular_compatibilidade(dados_curriculo, dados_vaga):
    # Cálculo de compatibilidade com pesos por seções
    compatibilidade_habilidades = len(set(dados_vaga["habilidades"]).intersection(set(dados_curriculo["habilidades"])))
    compatibilidade_experiencia = 1 if any(exp in dados_curriculo["experiencia"] for exp in dados_vaga["experiencia"]) else 0
    compatibilidade_formacao = 1 if any(form in dados_curriculo["formacao"] for form in dados_vaga["formacao"]) else 0

    compatibilidade_total = (compatibilidade_habilidades * 0.5) + (compatibilidade_experiencia * 0.3) + (compatibilidade_formacao * 0.2)
    compatibilidade_percentual = compatibilidade_total * 100 / len(dados_vaga["habilidades"])

    return round(compatibilidade_percentual, 2)

def processar_curriculo(texto_curriculo, dados_vaga):
    texto_limpo = limpar_texto(texto_curriculo)
    dados_extraidos = extrair_dados_com_chatgpt(texto_limpo)
    compatibilidade = calcular_compatibilidade(dados_extraidos, dados_vaga)

    return {
        "nome": dados_extraidos["nome"],
        "email": dados_extraidos["email"],
        "telefone": dados_extraidos["telefone"],
        "habilidades": dados_extraidos["habilidades"],
        "experiencia": dados_extraidos["experiencia"],
        "formacao": dados_extraidos["formacao"],
        "compatibilidade": compatibilidade
    }
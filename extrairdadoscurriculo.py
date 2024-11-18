
import re
import json
from openai import OpenAI

# Configuração da API do OpenAI com a chave de API
client = OpenAI(api_key="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")

def limpar_texto(text):
    """Limpa o texto removendo quebras de linha e espaços desnecessários."""
    text = re.sub(r'\n+', '\n', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def extrair_dados_com_chatgpt(texto, dados_vaga):
    # Adiciona os dados da vaga ao prompt para análise de compatibilidade
    prompt = (
        f"Extraia as informações pessoais, informações de contato, habilidades, experiência profissional, formação e certificações do currículo abaixo.\n\n"
        f"Os requisitos da vaga são:\n\n"
        f"Título: {dados_vaga['titulo']}\n"
        f"Descrição: {dados_vaga['descricao']}\n"
        f"Experiência necessária: {dados_vaga['experiencias']}\n"
        f"Habilidades requeridas: {dados_vaga['conhecimentos']}\n"
        f"Idiomas: {dados_vaga['idiomas']}\n"
        f"Formação exigida: {dados_vaga['formacao']}\n\n"
        f"Com base nesses requisitos, extraia os dados e calcule uma pontuação de compatibilidade para o currículo abaixo.\n\n"
        f"e então faça um resumo de porquê chegou nesse nivel de compatibilidade e um resumo sobre o candidato"
        f"Currículo:\n{texto}\n\n"
        "Responda no formato JSON com as chaves: nome, email, telefone, habilidades, experiencia, formacao, compatibilidade, resumocompatibilidade, resumocandidato."
    )

    # Chamada otimizada para a API do ChatGPT com schema atualizado
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Você é um assistente que extrai informações de currículos e calcula compatibilidade com uma vaga."},
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
                        "email": {"type": "string", "description": "Endereço de email do candidato.", "format": "email"},
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
                        },
                        "compatibilidade": {
                            "type": "number",
                            "description": "Porcentagem de compatibilidade do candidato com a vaga.",
                            "format": "float"
                        },
                        "resumocompatibilidade": {
                            "type": "string",
                            "description": "um resumo de porquê o candidato chegou nesse nivel de compatibilidade"
                        },
                        "resumocandidato": {
                            "type": "string",
                            "description": "um resumo do candidato"
                        },
                    },
                    "required": ["nome", "email", "telefone", "habilidades", "experiencia", "formacao", "compatibilidade", "resumocompatibilidade", "resumocandidato"],
                    "additionalProperties": False
                }
            }
        }
    )

    # Extrai e converte a resposta JSON para um dicionário Python
    content = response.choices[0].message.content
    dados = json.loads(content)
    print(dados)
    return dados



def processar_curriculo(texto_curriculo, dados_vaga):
    texto_limpo = limpar_texto(texto_curriculo)
    dados_extraidos = extrair_dados_com_chatgpt(texto_limpo, dados_vaga)


    return {
        "nome": dados_extraidos["nome"],
        "email": dados_extraidos["email"],
        "telefone": dados_extraidos["telefone"],
        "habilidades": dados_extraidos["habilidades"],
        "experiencia": dados_extraidos["experiencia"],
        "formacao": dados_extraidos["formacao"],
        "compatibilidade": dados_extraidos["compatibilidade"],
        "resumocompatibilidade": dados_extraidos["resumocompatibilidade"],
        "resumocandidato": dados_extraidos["resumocandidato"]

    }
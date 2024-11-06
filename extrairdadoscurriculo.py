
import re

from transformers import AutoTokenizer, AutoModelForCausalLM
import torch


def limpar_texto(text):
    text = re.sub(r'\n+', '\n', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


model_name = "meta-llama/Llama-3.2-11B-Vision-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)


def extrair_dados_com_modelo(texto):
    prompt = f"Extraia as habilidades, experiência profissional, formação e certificações do seguinte currículo:\n\n{texto}"
    inputs = tokenizer(prompt, return_tensors="pt")
    output = model.generate(**inputs, max_length=500)
    resultado = tokenizer.decode(output[0], skip_special_tokens=True)

    habilidades = re.findall(r"Habilidades:(.*?)\n", resultado, re.S)
    experiencia = re.findall(r"Experiencia:(.*?)\n", resultado, re.S)
    formacao = re.findall(r"Formacao e Certificacoes:(.*?)\n", resultado, re.S)

    return {
        "habilidades": habilidades[0].strip().split(', ') if habilidades else [],
        "experiencia": experiencia[0].strip().split('\n') if experiencia else [],
        "formacao": formacao[0].strip().split(', ') if formacao else []
    }


def calcular_compatibilidade(dados_curriculo, dados_vaga):
    compatibilidade_habilidades = len(set(dados_vaga["habilidades"]).intersection(set(dados_curriculo["habilidades"])))
    compatibilidade_experiencia = 1 if any(
        exp in dados_curriculo["experiencia"] for exp in dados_vaga["experiencia"]) else 0
    compatibilidade_formacao = 1 if any(form in dados_curriculo["formacao"] for form in dados_vaga["formacao"]) else 0

    compatibilidade_total = (compatibilidade_habilidades * 0.5) + (compatibilidade_experiencia * 0.3) + (
                compatibilidade_formacao * 0.2)
    compatibilidade_percentual = compatibilidade_total * 100 / len(dados_vaga["habilidades"])

    return round(compatibilidade_percentual, 2)


def processar_curriculo(texto_curriculo, dados_vaga):
    texto_limpo = limpar_texto(texto_curriculo)
    dados_extraidos = extrair_dados_com_modelo(texto_limpo)

    compatibilidade = calcular_compatibilidade(dados_extraidos, dados_vaga)

    return {
        "habilidades": dados_extraidos["habilidades"],
        "experiencia": dados_extraidos["experiencia"],
        "formacao": dados_extraidos["formacao"],
        "compatibilidade": compatibilidade
    }


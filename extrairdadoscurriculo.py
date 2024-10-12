import spacy
import re
from pathlib import Path
import utils
from bson import ObjectId  # Para lidar com ObjectId do MongoDB


# Função para limpar o texto extraído do currículo
def limpar_texto(text):
    """
    Limpa o texto removendo quebras de linha extras e espaços desnecessários.
    """
    text = re.sub(r'\n+', '\n', text)  # Remove múltiplas quebras de linha
    text = re.sub(r'\s+', ' ', text)  # Remove múltiplos espaços em branco
    return text.strip()


# Função para lidar com ObjectId
def json_converter(o):
    if isinstance(o, ObjectId):
        return str(o)
    raise TypeError(f"Type {type(o)} is not serializable")


# Função para extrair habilidades (skills) do currículo usando expressões regulares
def extrair_skills(text):
    """
    Extrai a seção de habilidades técnicas ou conhecimentos do currículo.
    """
    skills = []

    # Diversos padrões possíveis de "habilidades" ou "conhecimentos" em um currículo
    patterns = [
        r'Conhecimentos(.*?)(Projetos Realizados|Certificações|Idiomas|$)',
        r'Habilidades Técnicas(.*?)(Certificações|Idiomas|$)',
        r'Competências(.*?)(Projetos|Certificações|Idiomas|$)'
    ]

    for pattern in patterns:
        skills_sections = re.findall(pattern, text, re.S)
        if skills_sections:
            skills_text = skills_sections[0][0].strip()
            skills_lines = re.split(r'\n|,|;', skills_text)  # Divida por quebras de linha, vírgula ou ponto e vírgula
            for line in skills_lines:
                clean_line = line.strip("- ").strip()
                if clean_line:
                    skills.append(clean_line)

    return skills


# Função para extrair informações de contato do currículo


def extrair_contato(text):
    contato = {}

    # Melhorando a regex para capturar apenas o primeiro nome e o primeiro sobrenome
    nome_match = re.search(r'(?:Nome[: ]*)?([A-Z][a-zÀ-ÖØ-öø-ÿ\'\-]+(?:\s+[A-Z][a-zÀ-ÖØ-öø-ÿ\'\-]+))', text)

    if nome_match:
        contato['nome'] = nome_match.group(1).strip()
    else:
        contato['nome'] = None

    # Regex para extrair email
    email_match = re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', text)
    if email_match:
        contato['email'] = email_match.group(0).strip()
    else:
        contato['email'] = None

    # Regex para extrair telefone (exemplo simples)
    telefone_match = re.search(r'\(?\d{2,3}\)?\s?\d{4,5}-?\d{4}', text)
    if telefone_match:
        contato['telefone'] = telefone_match.group(0).strip()
    else:
        contato['telefone'] = None

    return contato

# Função principal para processar os currículos enviados
def processar_curriculo(texto_curriculo_complexo):
    """
    Processa o texto do currículo e usa spaCy para análise NER (entidades nomeadas).
    """

    # Defina o caminho completo para o modelo spaCy instalado
    modelo_path = Path(r"G:\Anaconda-python\Lib\site-packages\pt_core_news_sm\pt_core_news_sm-3.7.0")

    # Carrega o modelo spaCy a partir do caminho especificado
    nlp = spacy.load(modelo_path)

    # Limpa o texto extraído do currículo
    texto_limpo = limpar_texto(texto_curriculo_complexo)  # Agora apenas um currículo será processado

    # Processa o currículo com o modelo spaCy para análise mais avançada
    doc_complexo = nlp(texto_limpo)

    # Extrai as informações de contato (usando expressões regulares)
    contato_complexo = extrair_contato(texto_limpo)

    # Extrai habilidades usando regex aprimorado
    skills_complexo = extrair_skills(texto_limpo)

    # Exibe as informações extraídas
    print("Informações de Contato:", contato_complexo)
    print("Habilidades:", skills_complexo)

    # Retorna as informações de contato e habilidades extraídas
    return {
        "nome": contato_complexo['nome'],
        "email": contato_complexo['email'],
        "telefone": contato_complexo['telefone'],
        "habilidades": skills_complexo
    }


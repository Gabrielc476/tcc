from pypdf import PdfReader

import csv

# Dados dos perfis
def criarCSV(vagas):

    # Nome do arquivo
    nome_arquivo = "perfis.csv"


    # Abrir o arquivo CSV e escrever os dados
    with open(nome_arquivo, mode='w', newline='', encoding='utf-8') as arquivo:
        writer = csv.writer(arquivo)

        for vaga in vagas:
            if vaga:
              experiencias = vaga[2]
              conhecimentos = vaga[3]
              idiomas = vaga[4]
              formacoes = vaga[5]
              textovaga = ""
              for experiencia in experiencias:
                  textovaga += f"{experiencia['anos']} anos de experiencia em {experiencia['requerimento']}, "
              for conhecimento in conhecimentos:
                  textovaga += f"conhecimento em {conhecimento['descricao']}, "
              for idioma in idiomas:
                  textovaga += f"{idioma['proficiencia']} em {idioma['idioma']}, "
              for formacao in formacoes:
                  if formacao['situacao'] == "formado":

                    textovaga += f"formado em {formacao['curso']}, "
                  elif formacao['situacao'] == "cursando":
                      textovaga += f"cursando {formacao['curso']}, "
              writer.writerow([textovaga])

    print(f"Arquivo CSV '{nome_arquivo}' criado com sucesso!")
def setTexts(files):
    texts = []

    text = ""

    for file in files:
        pdf = PdfReader(file)

        for page in pdf.pages:
            text += page.extract_text()


        texts.append(text)

    return texts

vagas = [['', '', [{'anos': '2', 'requerimento': 'front end'}, {'anos': '3', 'requerimento': 'back end'}], [{'descricao': 'typescript'}, {'descricao': 'react'}], [{'proficiencia': 'fluente', 'idioma': 'ingles'}, {'proficiencia': 'fluente', 'idioma': 'portugues '}], [{'curso': 'arquitetura', 'situacao': 'cursando'}]],
['', '', [{'anos': '3', 'requerimento': 'front end'}, {'anos': '4', 'requerimento': 'back end'}], [{'descricao': 'typescript'}, {'descricao': 'java'}], [{'proficiencia': 'fluente', 'idioma': 'ingles'}, {'proficiencia': 'fluente', 'idioma': 'portugues '}], [{'curso': 'arquitetura', 'situacao': 'cursando'}]]
         ]

criarCSV(vagas)
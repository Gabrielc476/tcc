from pypdf import PdfReader


def setTexts(files):
    """
    Função para extrair o texto de uma lista de arquivos PDF.

    Parâmetros:
        files (list): Lista de arquivos enviados via request.

    Retorno:
        List[dict]: Lista de dicionários contendo o nome do arquivo e o texto extraído.
    """
    texts = []  # Lista para armazenar os textos extraídos de cada arquivo

    for file in files:
        try:
            # Abre o arquivo PDF
            pdf = PdfReader(file)
            text = ""  # Armazena o texto extraído do arquivo atual

            # Extrai o texto de cada página do PDF
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text

            # Armazena o texto extraído e o nome do arquivo
            texts.append({
                "filename": file.filename,
                "conteudo": text.strip() if text else "Texto não disponível"
            })

        except Exception as e:
            # Se ocorrer algum erro ao processar o PDF, armazenamos o erro
            texts.append({
                "filename": file.filename,
                "erro": f"Erro ao processar o arquivo: {str(e)}"
            })

    return texts



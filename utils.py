from pypdf import PdfReader

def setTexts(files):
    texts = []

    text = ""

    for file in files:
        pdf = PdfReader(file)

        for page in pdf.pages:
            text += page.extract_text()


        texts.append(text)

    return texts
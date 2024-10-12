import db
import utils
from flask import Flask, request, jsonify
from flask_cors import CORS
import extrairdadoscurriculo

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/inserir-user", methods=["POST"])
def inserirUser():
    data = request.get_json()
    user_data = {
        "username": data["username"],
        "email": data["email"],
        "senha": data["senha"],  # Assuming "senha" is the desired term for password
        "empresa": data["empresa"],
        "idempresa": data["idempresa"],
    }
    db.inserir_user_mongodb(user_data)
    return jsonify(data), 201

@app.route("/enviarvaga", methods=["POST"])
def enviarVaga():
    data = request.get_json()
    # chatgpt adicione id_vaga como um dos atributos de vaga
    vaga = {
        "userID" : data["userId"],
        "titulo": data["nome"],
        "descricao": data["resumo"],
        "experiencias": data["experiencias"],
        "conhecimentos": data["conhecimentos"],
        "idiomas": data["idiomas"],
        "formacao": data["cursos"]

    }
    db.inserir_vaga_mongodb(vaga)
    return jsonify(vaga), 201

@app.route("/enviarcurriculo", methods=["POST"])
def enviarCurriculo():
    try:
        # Obter o job_id do formulário enviado
        job_id = request.args.get("id_vaga")
        if not job_id:
            return jsonify({"error": "jobId is required"}), 400

        # Extrair os arquivos enviados
        filelist = request.files
        files = [filelist.get(key) for key in filelist]
        print(job_id)
        print(files)
        # Extrair o texto dos arquivos PDF
        textos_curriculos = utils.setTexts(files)

        # Salvar cada currículo no MongoDB com o id_vaga e o texto extraído
        for curriculo in textos_curriculos:
            print(job_id)
            curriculo_data = {
                "id_vaga": job_id,
                "texto": curriculo.get("conteudo", "Texto não disponível")
            }
            print(curriculo_data)
            db.inserir_curriculo_mongodb(curriculo_data)

        return jsonify({"message": "Currículos recebidos e salvos com sucesso"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route("/getvaga", methods=["GET"])
def getVaga():
    params = request.args.get("id")
    vagas = db.get_vaga_by_userID(params)
    print(vagas)
    return jsonify(vagas), 200


@app.route("/getcurriculos", methods=["GET"])
def getCurriculos():
    # Pega todos os currículos do banco de dados
    curriculos = db.get_all_curriculos()
    lista_curriculos_formatados = []

    # Itera por cada currículo armazenado no banco
    for curriculo in curriculos:
        # Processa o currículo para extrair as informações desejadas
        dados_extraidos = extrairdadoscurriculo.processar_curriculo(curriculo["texto"])

        # Cria um objeto para cada currículo extraído, com as informações formatadas
        curriculo_formatado = {
            "id_vaga": curriculo.get("id_vaga", "Não especificado"),  # ID da vaga relacionada ao currículo
            "nome": dados_extraidos.get("nome", "Nome não encontrado"),  # Nome do candidato
            "email": dados_extraidos.get("email", "Email não encontrado"),  # E-mail do candidato
            "telefone": dados_extraidos.get("telefone", "Telefone não encontrado"),  # Telefone do candidato
            "habilidades": dados_extraidos.get("habilidades", [])  # Lista de habilidades extraídas
        }

        # Adiciona o currículo formatado à lista que será enviada ao frontend
        lista_curriculos_formatados.append(curriculo_formatado)

    # Retorna a lista de currículos formatados como um objeto JSON para o frontend
    return jsonify(lista_curriculos_formatados), 200
@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        username = data["username"]
        password = data["password"]
        user = db.get_user_by_username(username)
        if user and user["senha"] == password:
            return jsonify({"success": True, "userId": str(user["_id"])}), 200  # Login successful
        else:
            return jsonify({"success": False, "message": "Invalid username or password."}), 401  # Unauthorized
    except Exception as error:
        print(f"Login error: {error}")
        return jsonify({"success": False, "message": "Internal server error."}), 500  # Internal Server Error

@app.route("/get-user-by-id", methods=["GET"])
def getUserById():
    userid = request.args.get("id")
    print(userid)
    if not userid:
        return jsonify({"error": "Missing userid parameter"}), 400
    user = db.get_user_by_id(userid)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user), 200




if __name__ == "__main__":
    app.run(debug=True)

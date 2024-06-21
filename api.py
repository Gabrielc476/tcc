import db
import utils
from flask import Flask, request, jsonify
from flask_cors import CORS

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
    filelist = request.files
    files = [filelist.get(key) for key in filelist]
    textos = utils.setTexts(files)
    curriculos = [{"conteudo": texto} for texto in textos]
    for curriculo in curriculos:
        db.inserir_curriculo_mongodb(curriculo)
    return 'Arquivos recebidos com sucesso', 201

@app.route("/getvaga", methods=["GET"])
def getVaga():

    vagas = db.get_all_vagas()
    print(vagas)
    return jsonify(vagas), 200

@app.route("/getcurriculos", methods=["GET"])
def getCurriculos():
    curriculos = db.get_all_curriculos()
    return jsonify(curriculos), 200

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

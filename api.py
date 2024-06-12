import db
import utils
from flask import Flask, request, jsonify
from flask_cors import CORS

dadosvaga = []

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/inserir-user", methods = ["POST"])
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

@app.route("/enviarvaga", methods = ["POST"])
def enviarVaga():
    data = request.get_json()

    vaga = {
        "titulo" : data[0],
        "descrição" : data[1],
        "experiencias" : data[2],
        "conhecimentos" : data[3],
        "idiomas" : data[4],
        "formação" : data[5]
    }

    db.inserir_vaga_mongodb(vaga)
    print(vaga)


    return jsonify(data), 201
@app.route("/enviarcurriculo", methods = ["POST"])
def enviarCurriculo():
    filelist = request.files
    files = []

    for key in filelist:

        files.append(request.files.get(key))

    print(utils.setTexts(files)[0])




    return 'Arquivos recebidos com sucesso', 201


@app.route("/getvaga", methods = ["GET"])
def getVaga():

    print(dadosvaga)
    return jsonify(dadosvaga), 200

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        username = data["username"]
        password = data["password"]

        # Retrieve user from MongoDB (without password comparison)
        user = db.get_user_by_username(username)

        if user:  # Check if user exists (username match)
            return jsonify({"success": True}), 200  # Login successful
        else:
            return jsonify({"success": False, "message": "Invalid username or password."}), 401  # Unauthorized
    except Exception as error:
        print(f"Login error: {error}")
        return jsonify({"success": False, "message": "Internal server error."}), 500  # Internal Server Error


@app.route("/get-user-by-username", methods=["GET"])
def getUserByUsername():
  username = request.args.get("username")
  if not username:
    return jsonify({"error": "Missing username parameter"}), 400

  user = db.get_user_by_username(username)
  if not user:
    return jsonify({"error": "User not found"}), 404

  # You might want to remove sensitive information like password before sending to frontend
  return jsonify(user), 200

if __name__ == "__main__":
    app.run(debug=True)




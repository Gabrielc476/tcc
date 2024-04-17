import db
import utils
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
user = {
    "username" : "trolianes",
    "userid" : 123456789,
    "email": "gabrielc.cavalcante@hotmail.com",
    "senha" : "1234567",
    "idade": 0
}

@app.route("/inserir-user", methods = ["POST"])
def inserirUser():
    data = request.get_json()
    print(data)
    db.insertUser(data)
    return jsonify(data), 201
@app.route("/checkuser", methods = ["GET"])
def checkAvaliable():
    username = request.args.get("username")
    email = request.args.get("email")
    userdata = {
        "username" : username,
        "email" : email
    }
    print(userdata)
    return jsonify(db.checkAvaliable(userdata)), 200

@app.route("/getuser/<username>", methods = ["GET"])
def getUser(username):
    dados = db.getUser(username)
    userdados = {
        "userid" : dados[0],
        "username" : dados[1],
        "email" : dados[2],
        "senha" : dados[3],
        "idade" : dados[4]
    }
    return jsonify(userdados) , 200

@app.route("/enviarvaga", methods = ["POST"])
def enviarVaga():
    data = request.get_json()
    print(data)

    return jsonify(data), 201
@app.route("/enviarcurriculo", methods = ["POST"])
def enviarCurriculo():
    filelist = request.files
    files = []

    for key in filelist:

        files.append(request.files.get(key))

    print(utils.setTexts(files)[0])




    return 'Arquivos recebidos com sucesso', 201

if __name__ == "__main__":
    app.run(debug=True)




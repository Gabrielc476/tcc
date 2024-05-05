import db
import utils
from flask import Flask, request, jsonify
from flask_cors import CORS

dadosvaga = ""

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/enviarvaga", methods = ["POST"])
def enviarVaga():
    data = request.get_json()
    dadosvaga = data
    print(data)
    utils.criarCSV(data)

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

if __name__ == "__main__":
    app.run(debug=True)




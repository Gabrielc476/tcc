import pymongo
from bson import ObjectId

# Replace the placeholders with your actual connection string and database name
conn_str = "mongodb+srv://gabrielccavalcante:ubVH3SPiTw2zEsuv@tcc2.gq0qtz7.mongodb.net/?retryWrites=true&w=majority&appName=TCC2"
db_name = "tcc"

client = pymongo.MongoClient(conn_str)
db = client[db_name]

def test_connection(conn_str):
    """
    Tests the connection to a MongoDB database.

    Args:
        conn_str (str): The MongoDB connection string.

    Returns:
        bool: True if the connection is successful, False otherwise.
    """
    try:
        client.admin.command('ping')
        print("Connection to MongoDB successful!")
        return True
    except pymongo.errors.ConnectionFailure as error:
        print(f"Could not connect to MongoDB: {error}")
        return False

def inserir_vaga_mongodb(vaga):
    """
    Insere uma vaga na collection "vagas" no MongoDB.

    Args:
        vaga (dict): Um dicionário contendo os dados da vaga.
    """
    try:
        collection = db["vagas"]
        collection.insert_one(vaga)
        print("Vaga inserida com sucesso no MongoDB!")
    except pymongo.errors.ConnectionFailure as error:
        print(f"Could not connect to MongoDB: {error}")

def inserir_user_mongodb(user):
    """
    Insere um usuário na collection "usuarios" no MongoDB.

    Args:
        user (dict): Um dicionário contendo os dados do usuário.
    """
    try:
        collection = db["usuarios"]
        collection.insert_one(user)
        print(f"Usuário '{user['username']}' registrado com sucesso!")
    except pymongo.errors.ConnectionFailure as error:
        print(f"Could not connect to MongoDB: {error}")

def get_user_by_username(username):
    """
    Busca um usuário no MongoDB pelo nome de usuário.

    Args:
        username (str): O nome de usuário.

    Returns:
        dict: O documento do usuário se encontrado, caso contrário None.
    """
    try:
        collection = db["usuarios"]
        user = collection.find_one({"username": username})
        if user:
            user["_id"] = str(user["_id"])
        return user
    except pymongo.errors.ConnectionFailure as error:
        print(f"Could not connect to MongoDB: {error}")
        return None


def get_all_vagas():
  """
  Retorna todas as vagas existentes na coleção "vagas" do MongoDB.

  Returns:
      list: Uma lista de documentos contendo todas as vagas.
  """
  try:
    collection = db["vagas"]
    vagas = list(collection.find())
    for vaga in vagas:
      vaga["_id"] = str(vaga["_id"])  # Converte ObjectId para string
    return vagas
  except pymongo.errors.ConnectionFailure as error:
    print(f"Could not connect to MongoDB: {error}")
    return []
  except Exception as error:
    print(f"Error fetching vagas: {error}")
    return []
def get_user_by_id(userid):
    """
    Busca um usuário no MongoDB pelo ID.

    Args:
        userid (str): O ID do usuário.

    Returns:
        dict: O documento do usuário se encontrado, caso contrário None.
    """
    try:
        collection = db["usuarios"]
        user = collection.find_one({"_id": ObjectId(userid)})
        if user:
            user["_id"] = str(user["_id"])
        return user
    except pymongo.errors.ConnectionFailure as error:
        print(f"Could not connect to MongoDB: {error}")
        return None
    except Exception as error:
        print(f"Error fetching user by id: {error}")
        return None


def inserir_curriculo_mongodb(curriculo):
    """
    Insere um currículo na collection "curriculos" no MongoDB.

    Args:
        curriculo (dict): Um dicionário contendo os dados do currículo.
    """
    try:
        collection = db["curriculos"]
        collection.insert_one(curriculo)
        print("Currículo inserido com sucesso no MongoDB!")
    except pymongo.errors.ConnectionFailure as error:
        print(f"Could not connect to MongoDB: {error}")
    except Exception as error:
        print(f"Error inserting curriculo: {error}")

def get_all_curriculos():
    """
    Retorna todos os currículos existentes na coleção "curriculos" do MongoDB.

    Returns:
        list: Uma lista de documentos contendo todos os currículos.
    """
    try:
        collection = db["curriculos"]
        curriculos = list(collection.find())
        for curriculo in curriculos:
            curriculo["_id"] = str(curriculo["_id"])  # Converte ObjectId para string
        return curriculos
    except pymongo.errors.ConnectionFailure as error:
        print(f"Could not connect to MongoDB: {error}")
        return []
    except Exception as error:
        print(f"Error fetching curriculos: {error}")
        return []
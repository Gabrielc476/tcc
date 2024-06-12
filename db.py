import pymongo
from bson import ObjectId
# Replace the placeholders with your actual connection string and database name
conn_str = "mongodb+srv://gabrielccavalcante:ubVH3SPiTw2zEsuv@tcc2.gq0qtz7.mongodb.net/?retryWrites=true&w=majority&appName=TCC2"
db_name = "tcc"

client = pymongo.MongoClient(conn_str)
db = client[db_name]

# Access the desired database


def test_connection(conn_str):
  """
  Tests the connection to a MongoDB database.

  Args:
    conn_str (str): The MongoDB connection string.

  Returns:
    bool: True if the connection is successful, False otherwise.
  """
  try:

    # The ping command is cheap and does not require auth.
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
  try:

    collection = db["usuarios"]

    collection.insert_one(user)
    print(f"Usuário '{user['username']}' registrado com sucesso!")
  except pymongo.errors.ConnectionFailure as error:
    print(f"Could not connect to MongoDB: {error}")

def get_user_by_username(username):

  try:
    collection = db["usuarios"]
    user = collection.find_one({"username": username})
    user["_id"] = str(user["_id"])
    return user
  except pymongo.errors.ConnectionFailure as error:
    print(f"Could not connect to MongoDB: {error}")
    return None


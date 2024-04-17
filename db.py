import psycopg2

conn = psycopg2.connect(database = "TCC",
                        user = "postgres",
                        host= 'localhost',
                        password = "791897",
                        port = 5432)
cur = conn.cursor()
def insertUser(user):
    cur.execute(
        "INSERT INTO usuarios(userid, username, email, senha,idade) VALUES(%s,%s,%s, %s, %s)", (user["userid"], user["username"], user["email"], user["senha"], user["idade"]));
    conn.commit()

def checkAvaliable(user):
    print(user)
    cur.execute("select username,email from usuarios where username = %s or email = %s", (user["username"],user["email"]))
    dado = cur.fetchone()
    resultado = {
        "nomedisponivel" : True,
        "emaildisponivel" : True,
        "mensagem" : ""
    }
    if dado:
        if dado[0] == user["username"]:
            resultado["nomedisponivel"] = False
            resultado["mensagem"] = "nome de usuario já existente"
            print(resultado)
            return resultado
        elif dado[1] == user["email"]:
            resultado["emaildisponivel"] = False
            resultado["mensagem"] = "email já existente"
            print(resultado)
            return resultado
    return resultado

def getUser(username):
    cur.execute("select * from usuarios where username = %s ",
                (username,))
    dado = cur.fetchone()
    return dado
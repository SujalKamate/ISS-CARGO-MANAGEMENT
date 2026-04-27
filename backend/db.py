import oracledb

def get_connection():
    return oracledb.connect(
        user="system",
        password="root347",
        dsn="localhost/XE"
    )
import cx_Oracle

def get_connection():
    return cx_Oracle.connect(
        user="system",
        password="root347",
        dsn="localhost/XE"
    )
import sqlite3
from config import DATABASE
from models import USER_TABLE

def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute(USER_TABLE)
    conn.commit()
    conn.close()

def get_all_users():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email FROM users")
    rows = cursor.fetchall()
    conn.close()
    return [ { "id": r[0], "name": r[1], "email": r[2] } for r in rows ]

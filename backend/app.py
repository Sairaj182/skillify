from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3
from config import DATABASE, PORT
from utils import init_db, get_all_users

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Flask backend is running!"

@app.route('/api/users', methods=['GET'])
def fetch_users():
    users = get_all_users()
    return jsonify(users)

if __name__ == '__main__':
    init_db()  # creates table if not exists
    app.run(port=PORT, debug=True)

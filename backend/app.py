from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
from config import DATABASE, PORT
from utils import (
    init_db,
    get_all_users,
    get_user_by_id,
    create_user,
    login_user,
    update_user_profile,
    toggle_visibility,
    update_availability
)

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Flask backend is running!"

@app.route("/api/users", methods=["GET"])
def fetch_users():
    users = get_all_users()
    return jsonify(users)

@app.route("/api/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = get_user_by_id(user_id)
    if user:
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 404

@app.route("/api/users/register", methods=["POST"])
def register():
    data = request.get_json()
    result = create_user(data)
    return jsonify(result)

@app.route("/api/users/login", methods=["POST"])
def login():
    credentials = request.get_json()
    result = login_user(credentials)
    return jsonify(result)

@app.route("/api/users/update/<int:user_id>", methods=["PUT"])
def update_profile(user_id):
    data = request.get_json()
    result = update_user_profile(user_id, data)
    return jsonify(result)

@app.route("/api/users/visibility/<int:user_id>", methods=["PUT"])
def set_visibility(user_id):
    data = request.get_json()
    visibility = data.get("visibility", True)
    result = toggle_visibility(user_id, visibility)
    return jsonify(result)

@app.route("/api/users/availability/<int:user_id>", methods=["PUT"])
def set_availability(user_id):
    data = request.get_json()
    result = update_availability(user_id, data)
    return jsonify(result)

if __name__ == "__main__":
    init_db()
    app.run(port=PORT, debug=True)
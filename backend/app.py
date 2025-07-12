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
    update_availability,
    add_skill_offered,
    add_skill_wanted,
    remove_skill,
    search_by_skill,
    list_user_skills,
    admin_ban_user_util,
    admin_reject_skill_util,
    admin_view_swaps_util,
    admin_view_feedback_util,
    admin_announce_util,
    admin_export_util,
    list_all_skills,
    submit_feedback_util,
    view_feedback_for_user_util,
)

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Flask backend is running!"

# users routes
@app.route("/api/users", methods=["GET"])
def fetch_users():
    users = get_all_users()
    return jsonify(users)

@app.route("/api/users/<user_id>", methods=["GET"])
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

@app.route("/api/users/update/<user_id>", methods=["PUT"])
def update_profile(user_id):
    data = request.get_json()
    result = update_user_profile(user_id, data)
    return jsonify(result)

@app.route("/api/users/visibility/<user_id>", methods=["PUT"])
def set_visibility(user_id):
    data = request.get_json()
    visibility = data.get("visibility", True)
    result = toggle_visibility(user_id, visibility)
    return jsonify(result)

@app.route("/api/users/availability/<user_id>", methods=["PUT"])
def set_availability(user_id):
    data = request.get_json()
    result = update_availability(user_id, data)
    return jsonify(result)

# skills routes
@app.route("/skills/offered/add", methods=["POST"])
def add_offered_skill():
    data = request.get_json()
    result = add_skill_offered(data)
    return jsonify(result)

@app.route("/skills/wanted/add", methods=["POST"])
def add_wanted_skill():
    data = request.get_json()
    result = add_skill_wanted(data)
    return jsonify(result)

@app.route("/skills/remove/<int:skill_id>", methods=["DELETE"])
def remove_user_skill(skill_id):
    result = remove_skill(skill_id)
    return jsonify(result)

@app.route("/skills/search", methods=["GET"])
def search_skill():
    skill_name = request.args.get("skill")
    result = search_by_skill(skill_name)
    return jsonify(result)

@app.route("/skills/user/<user_id>", methods=["GET"])
def user_skills(user_id):
    result = list_user_skills(user_id)
    return jsonify(result)

@app.route("/skills/all", methods=["GET"])
def all_skills():
    result = list_all_skills()
    return result
    
# admin routes
@app.route("/admin/ban/<user_id>", methods=["PUT"])
def admin_ban_user(user_id):
    result = admin_ban_user_util(user_id)
    return jsonify(result)

@app.route("/admin/reject_skill/<int:skill_id>", methods=["PUT"])
def admin_reject_skill(skill_id):
    result = admin_reject_skill_util(skill_id)
    return jsonify(result)

@app.route("/admin/swaps", methods=["GET"])
def admin_view_swaps():
    result = admin_view_swaps_util()
    return jsonify(result)

@app.route("/admin/feedback", methods=["GET"])
def admin_view_feedback():
    result = admin_view_feedback_util()
    return jsonify(result)

@app.route("/admin/announce", methods=["POST"])
def admin_announce():
    data = request.get_json()
    result = admin_announce_util(data)
    return jsonify(result)

@app.route("/admin/export", methods=["GET"])
def admin_export():
    export_type = request.args.get("type", "json")  # "json" or "csv"
    result = admin_export_util(export_type)
    return jsonify(result)

# feedback routes
@app.route("/feedback/submit", methods=["POST"])
def submit_feedback():
    data = request.get_json()
    result = submit_feedback_util(data)
    return jsonify(result)

@app.route("/feedback/user/<user_id>", methods=["GET"])
def view_feedback_for_user(user_id):
    result = view_feedback_for_user_util(user_id)
    return jsonify(result)

if __name__ == "__main__":
    init_db()
    app.run(port=PORT, debug=True)
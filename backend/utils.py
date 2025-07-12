import sqlite3
from config import DATABASE
from models import init_models
import json
import io
import csv
from flask import jsonify

def init_db():
    init_models()  # Initializes all tables

def get_all_users():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, location, profile_photo, availability, is_public, is_banned FROM users")
    rows = cursor.fetchall()
    conn.close()
    return [
        {
            "id": r[0],
            "name": r[1],
            "location": r[2],
            "profile_photo": r[3],
            "availability": r[4],
            "is_public": bool(r[5]),
            "is_banned": bool(r[6])
        }
        for r in rows
    ]

def get_user_by_id(user_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, location, profile_photo, availability, is_public, is_banned FROM users WHERE id = ?", (user_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return {
            "id": row[0],
            "name": row[1],
            "location": row[2],
            "profile_photo": row[3],
            "availability": row[4],
            "is_public": bool(row[5]),
            "is_banned": bool(row[6])
        }
    return None

def create_user(data):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO users (id, name, location, profile_photo, availability, is_public, is_banned) VALUES (?, ?, ?, ?, ?, ?, ?)",
            (
                data.get("id"),
                data.get("name"),
                data.get("location"),
                data.get("profile_photo"),
                ",".join(data.get("availability", [])),
                int(data.get("is_public", True)),
                int(data.get("is_banned", False))
            )
        )
        conn.commit()
        result = {"success": True, "message": "User registered"}
    except Exception as e:
        result = {"success": False, "error": str(e)}
    conn.close()
    return result

def login_user(credentials):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT user_id, password_hash FROM users_login WHERE email = ?", (credentials.get("email"),))
    row = cursor.fetchone()
    conn.close()
    if row and credentials.get("password") == row[1]:  # Replace with proper hash check!
        return {"success": True, "user_id": row[0]}
    return {"success": False, "error": "Invalid credentials"}

def update_user_profile(user_id, data):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE users SET name = ?, location = ?, profile_photo = ?, availability = ? WHERE id = ?",
        (
            data.get("name"),
            data.get("location"),
            data.get("profile_photo"),
            ",".join(data.get("availability", [])),
            user_id
        )
    )
    conn.commit()
    conn.close()
    return {"success": True, "message": "Profile updated"}

def toggle_visibility(user_id, visibility):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET is_public = ? WHERE id = ?", (int(visibility), user_id))
    conn.commit()
    conn.close()
    return {"success": True, "message": "Visibility updated"}

def update_availability(user_id, data):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET availability = ? WHERE id = ?", (",".join(data.get("availability", [])), user_id))
    conn.commit()
    conn.close()
    return {"success": True, "message": "Availability updated"}

def add_skill_offered(data):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO skills (user_id, category, skill_name) VALUES (?, ?, ?)",
        (data.get("user_id"), "offered", data.get("skill_name"))
    )
    conn.commit()
    conn.close()
    return {"success": True, "message": "Skill offered added"}

def add_skill_wanted(data):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO skills (user_id, category, skill_name) VALUES (?, ?, ?)",
        (data.get("user_id"), "wanted", data.get("skill_name"))
    )
    conn.commit()
    conn.close()
    return {"success": True, "message": "Skill wanted added"}

def remove_skill(skill_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM skills WHERE id = ?", (skill_id,))
    conn.commit()
    conn.close()
    return {"success": True, "message": "Skill removed"}

def search_by_skill(skill_name):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT user_id FROM skills WHERE skill_name = ? AND category = 'offered'",
        (skill_name,)
    )
    rows = cursor.fetchall()
    conn.close()
    return [r[0] for r in rows]

def list_user_skills(user_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT category, skill_name FROM skills WHERE user_id = ?",
        (user_id,)
    )
    rows = cursor.fetchall()
    conn.close()
    skills = {"offered": [], "wanted": []}
    for category, skill_name in rows:
        if category == "offered":
            skills["offered"].append(skill_name)
        elif category == "wanted":
            skills["wanted"].append(skill_name)
    return skills

def admin_ban_user_util(user_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET is_banned = 1 WHERE id = ?", (user_id,))
    conn.commit()
    conn.close()
    return {"success": True, "message": f"User {user_id} banned."}

def admin_reject_skill_util(skill_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("UPDATE skills SET category = 'rejected' WHERE id = ?", (skill_id,))
    conn.commit()
    conn.close()
    return {"success": True, "message": f"Skill {skill_id} marked as rejected."}

def admin_view_swaps_util():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM swap_requests")
    rows = cursor.fetchall()
    columns = [desc[0] for desc in cursor.description]
    conn.close()
    swaps = [dict(zip(columns, row)) for row in rows]
    return swaps

def admin_view_feedback_util():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM feedback")
    rows = cursor.fetchall()
    columns = [desc[0] for desc in cursor.description]
    conn.close()
    feedback = [dict(zip(columns, row)) for row in rows]
    return feedback

def admin_announce_util(data):
    message = data.get("message")
    if not message:
        return {"success": False, "error": "No message provided"}
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT notifications_sent FROM admin WHERE id = 'ADM1N00'")
    row = cursor.fetchone()
    notifications = []
    if row and row[0]:
        try:
            notifications = json.loads(row[0])
        except Exception:
            notifications = []
    notifications.append(message)
    cursor.execute("UPDATE admin SET notifications_sent = ? WHERE id = 'ADM1N00'", (json.dumps(notifications),))
    conn.commit()
    conn.close()
    return {"success": True, "message": "Announcement sent."}

def admin_export_util(export_type):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    # Example: Export users, feedback, and swaps
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    users_cols = [desc[0] for desc in cursor.description]
    cursor.execute("SELECT * FROM feedback")
    feedback = cursor.fetchall()
    feedback_cols = [desc[0] for desc in cursor.description]
    cursor.execute("SELECT * FROM swap_requests")
    swaps = cursor.fetchall()
    swaps_cols = [desc[0] for desc in cursor.description]
    conn.close()
    if export_type == "csv":
        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(["USERS"])
        writer.writerow(users_cols)
        writer.writerows(users)
        writer.writerow([])
        writer.writerow(["FEEDBACK"])
        writer.writerow(feedback_cols)
        writer.writerows(feedback)
        writer.writerow([])
        writer.writerow(["SWAPS"])
        writer.writerow(swaps_cols)
        writer.writerows(swaps)
        return {"csv": output.getvalue()}
    else:
        return {
            "users": [dict(zip(users_cols, row)) for row in users],
            "feedback": [dict(zip(feedback_cols, row)) for row in feedback],
            "swaps": [dict(zip(swaps_cols, row)) for row in swaps]
        }
def list_all_skills():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT id, user_id, category, skill_name FROM skills")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([{"id": r[0], "user_id": r[1], "category": r[2], "skill_name": r[3]} for r in rows])

def submit_feedback_util(data):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO feedback (from_user_id, to_user_id, rating, comment) VALUES (?, ?, ?, ?)",
            (
                data.get("from_user_id"),
                data.get("to_user_id"),
                int(data.get("rating")),
                data.get("comment", "")
            )
        )
        conn.commit()
        result = {"success": True, "message": "Feedback submitted"}
    except Exception as e:
        result = {"success": False, "error": str(e)}
    conn.close()
    return result

def view_feedback_for_user_util(user_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT from_user_id, rating, comment, timestamp FROM feedback WHERE to_user_id = ?",
        (user_id,)
    )
    rows = cursor.fetchall()
    conn.close()
    return [
        {
            "from_user_id": r[0],
            "rating": r[1],
            "comment": r[2],
            "timestamp": r[3]
        }
        for r in rows
    ]

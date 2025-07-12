import sqlite3
from config import DATABASE
from models import init_models

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

import json
import sqlite3
from models import init_models

DB_PATH = "data.db"
SAMPLE_PATH = "sample.json"

def main():
    init_models()  # <-- Add this line to create tables if not exist
    with open(SAMPLE_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    users = data.get("users", [])
    swaps = data.get("swaps", [])
    feedbacks = data.get("feedback", [])

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    for user in users:
        if not user.get("id") or not user.get("name"):
            continue
        cursor.execute(
            "INSERT OR IGNORE INTO users (id, name, location, profile_photo, availability, is_public, is_banned) VALUES (?, ?, ?, ?, ?, ?, ?)",
            (
                user["id"],
                user["name"],
                user.get("location"),
                user.get("profile_photo"),
                ",".join(user.get("availability", [])),
                int(user.get("is_public", True)),
                int(user.get("is_banned", False))
            )
        )
        # Offered skills
        for category, skills in user.get("skills_offered", {}).items():
            for skill in skills:
                cursor.execute(
                    "INSERT INTO skills (user_id, category, skill_name) VALUES (?, ?, ?)",
                    (user["id"], "offered", skill)
                )
        # Wanted skills
        for category, skills in user.get("skills_wanted", {}).items():
            for skill in skills:
                cursor.execute(
                    "INSERT INTO skills (user_id, category, skill_name) VALUES (?, ?, ?)",
                    (user["id"], "wanted", skill)
                )

    for swap in swaps:
        cursor.execute(
            "INSERT INTO swap_requests (from_user_id, to_user_id, skill_offered, skill_requested, status) VALUES (?, ?, ?, ?, ?)",
            (
                swap["from_user_id"],
                swap["to_user_id"],
                swap["skill_offered"],
                swap["skill_requested"],
                swap.get("status", "pending")
            )
        )

    for fb in feedbacks:
        cursor.execute(
            "INSERT INTO feedback (from_user_id, to_user_id, rating, comment) VALUES (?, ?, ?, ?)",
            (
                fb["from_user_id"],
                fb["to_user_id"],
                fb["rating"],
                fb.get("comment", "")
            )
        )

    # Ensure admin row exists
    cursor.execute("INSERT OR IGNORE INTO admin (id, notifications_sent, banned_users, rejected_descriptions, activity_reports, feedback_logs, swap_stats) VALUES ('ADM1N00', '[]', '[]', '[]', '[]', '[]', '[]')")

    conn.commit()
    conn.close()
    print("Database populated from sample.json.")

if __name__ == "__main__":
    main()
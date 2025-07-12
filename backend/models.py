import sqlite3
from config import DATABASE

USER_TABLE = """
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT,
    profile_photo TEXT,
    availability TEXT,
    is_public INTEGER DEFAULT 1,
    is_banned INTEGER DEFAULT 0
)
"""

SKILLS_TABLE = """
CREATE TABLE IF NOT EXISTS skills (
    user_id TEXT,
    category TEXT,
    skill_name TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
)
"""

USERS_LOGIN_TABLE = """
CREATE TABLE IF NOT EXISTS users_login (
    user_id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
)
"""

SWAP_REQUESTS_TABLE = """
CREATE TABLE IF NOT EXISTS swap_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_user_id TEXT,
    to_user_id TEXT,
    skill_offered TEXT,
    skill_requested TEXT,
    status TEXT DEFAULT 'pending',
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(from_user_id) REFERENCES users(id),
    FOREIGN KEY(to_user_id) REFERENCES users(id)
)
"""

FEEDBACK_TABLE = """
CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_user_id TEXT,
    to_user_id TEXT,
    rating INTEGER CHECK(rating >= 1 AND rating <= 5),
    comment TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(from_user_id) REFERENCES users(id),
    FOREIGN KEY(to_user_id) REFERENCES users(id)
)
"""

ADMIN_TABLE = """
CREATE TABLE IF NOT EXISTS admin (
    id TEXT PRIMARY KEY DEFAULT 'ADM1N00',
    notifications_sent TEXT,
    banned_users TEXT,
    rejected_descriptions TEXT,
    activity_reports TEXT,
    feedback_logs TEXT,
    swap_stats TEXT
)
"""

def init_models():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute(USER_TABLE)
    cursor.execute(SKILLS_TABLE)
    cursor.execute(USERS_LOGIN_TABLE)
    cursor.execute(SWAP_REQUESTS_TABLE)
    cursor.execute(FEEDBACK_TABLE)
    cursor.execute(ADMIN_TABLE)
    conn.commit()
    conn.close()

print("All tables created successfully.")

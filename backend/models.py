import sqlite3

# Connect to SQLite database
conn = sqlite3.connect('database/data.db')
cursor = conn.cursor()

# ------------------ USERS TABLE ------------------
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT,
    profile_photo TEXT,
    availability TEXT, -- store as comma-separated string
    is_public INTEGER DEFAULT 1,
    is_banned INTEGER DEFAULT 0
)
""")

# ------------------ SKILLS TABLE ------------------
cursor.execute("""
CREATE TABLE IF NOT EXISTS skills (
    user_id TEXT,
    category TEXT, -- 'technical' or 'non_technical'
    skill_name TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
)
""")

# ------------------ USERS LOGIN ------------------
cursor.execute("""
CREATE TABLE IF NOT EXISTS users_login (
    user_id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
)
""")

# ------------------ SWAP REQUESTS ------------------
cursor.execute("""
CREATE TABLE IF NOT EXISTS swap_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_user_id TEXT,
    to_user_id TEXT,
    skill_offered TEXT,
    skill_requested TEXT,
    status TEXT DEFAULT 'pending',  -- pending, accepted, rejected, cancelled
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(from_user_id) REFERENCES users(id),
    FOREIGN KEY(to_user_id) REFERENCES users(id)
)
""")

# ------------------ FEEDBACK ------------------
cursor.execute("""
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
""")

# ------------------ ADMIN TABLE ------------------
cursor.execute("""
CREATE TABLE IF NOT EXISTS admin (
    id TEXT PRIMARY KEY DEFAULT 'ADM1N00',
    notifications_sent TEXT,         -- JSON or comma-separated string
    banned_users TEXT,               -- JSON or comma-separated
    rejected_descriptions TEXT,
    activity_reports TEXT,
    feedback_logs TEXT,
    swap_stats TEXT
)
""")

conn.commit()
conn.close()
print("All tables created successfully.")

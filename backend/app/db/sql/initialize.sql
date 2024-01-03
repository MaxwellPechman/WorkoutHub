CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(16) NOT NULL,
    mail TEXT NOT NULL,
    hashed_password VARCHAR(64) NOT NULL,
    date_created DATE NOT NULL,
    date_changed DATE NULL,
    active BOOL NOT NULL
);
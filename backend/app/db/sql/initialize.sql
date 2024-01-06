CREATE TABLE IF NOT EXISTS users (
    name VARCHAR(16) NOT NULL PRIMARY KEY,
    mail TEXT NOT NULL,
    hashed_password VARCHAR(64) NOT NULL,
    date_created DATE NOT NULL,
    date_changed DATE NULL,
    active BOOL NOT NULL
);
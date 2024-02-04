INSERT INTO account (name, mail, hashed_password, created_at, active)
VALUES (%(name)s, %(mail)s, %(password)s, CURRENT_DATE, TRUE);
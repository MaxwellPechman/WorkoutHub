INSERT INTO users(name, mail, hashed_password, date_created, active)
VALUES (%(name)s, %(mail)s, %(password)s, CURRENT_DATE, TRUE);
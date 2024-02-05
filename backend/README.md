# WorkoutHub Backend

In diesem Ordner befinden sich alle Dateien notwendig für die Funktion des backends.
Das Backend ist in Python programmiert und verwendet als API-Framework FastAPI.
Zusätzlich wird psycopg als Schnittstelle zu PostgreSQL verwendet und psymongo für MongoDB.

## Aufbau

Der Einstiegspunkt der Applikation ist die `main.py` Datei. Hier wird das Backend gestartet und die Datenbanken aufgesetzt.
Der Hauptcode befindet sich im `app`-Ordner, hier befinden sich vier weiter Unterordner:

- `api` beinhaltet alle Dateien, um Daten der Datenbank als REST-API Schnittstelle bereitzustellen.
- `db` beinhaltet alles bezüglich Datenbanken. besitzt zwei weitere Unterordner:
  - `mongo` bietet die Schnittstelle zur MongoDB Datenbank an
  - `postgres` Schnittstelle zur PostgreSQL Datenbank und ablage von SQL-Skripts, welche beim Start vom Backend eingelesen werden und für die Datenbankkommunikation verwendet werden.
- `schema` Schema für Objekt-Mapping von Frontend-Daten
- `util` allgemein nützliche Skripte

## Installation

Um für das Backend alle Daten runterzuladen sind folgende Kommandos notwendig:

- `cd backend` (in den "backend"-Ordner wechseln)
- `pip install -r requirements.txt`

anschließend sollten alle Bibliotheken und Frameworks aus der requirements.txt installiert werden.
Um Datenbanken mit in das Projekt einzubinden muss zusätzlich eine `.env` in den "backend"-Ordner erstellt werden mit folgendem Schema:

Serveroptionen:
- `SERVER_HOST=<host>`
- `SERVER_PORT=<post>`

PostgreSQL-Daten:
- `POSTGRES_NAME=<db_name>`
- `POSTGRES_HOST=<db_host>`
- `POSTGRES_PORT=<db_post>`
- `POSTGRES_USER=<db_user>`
- `POSTGRES_PASSWORD=<db_password>`

MongoDB-Daten:
- `MONGO_NAME=<db_name>`
- `MONGO_HOST=<db_host>`
- `MONGO_PORT=<db_post>`
- `MONGO_USER=<db_user>`
- `MONGO_PASSWORD=<db_password>`
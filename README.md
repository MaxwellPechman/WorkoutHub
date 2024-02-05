# WorkoutHub

Webapplikation mit Monolith Architektur. Nutzt Postgresql und MongoDB als Datenbanken.
Backend ist in Python und FastAPI geschrieben. Für das Frontend wird TypeScript mit Native React und TailwindCSS verwendet.

## Installation

Sowohl für das Backend als auch für das Frontend müssen externe Bibliotheken und Frameworks installiert werden.
Um für das Backend alle Daten runterzuladen sind folgende Kommandos notwendig:

- `cd backend` (in den "backend"-Ordner wechseln)
- `pip install -r requirements.txt`

anschließend sollten alle Bibliotheken und Frameworks aus der requirements.txt installiert werden.
Für das Frontend sind folgende Kommandos zu verwenden:

- `cd frontend` (in den "frontend"-Ordner wechseln)
- `pnpm install`

Nun sollten auch für das Frontend alle notwendigen Dateien installiert werden.
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
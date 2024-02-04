import uvicorn

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from backend.app.api.router import api_routes
from backend.app.config import load_urls, load_host, load_port
from backend.app.db.postgres.postgres import postgres
from backend.app.db.postgres.sql import sql


app_name = "main:app"
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=load_urls(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_routes)


def init_db():
    query = sql.get_query("initialize.sql")
    postgres.execute(query)


if "__main__" == __name__:
    init_db()

    # generate_database_data(35)

    config = uvicorn.Config(host=load_host("SERVER_HOST"),
                            port=load_port("SERVER_PORT"),
                            log_level="info",
                            app=app_name)
    server = uvicorn.Server(config)
    server.run()

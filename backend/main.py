import uvicorn

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from backend.app.api.router import api_routes
from backend.app.config import load_urls, load_host, load_port
from backend.app.db.db import db
from backend.app.db.sql import sql, SQL


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
    query: SQL = sql.get_query("initialize.sql")
    db.execute(query)


if "__main__" == __name__:
    init_db()

    config = uvicorn.Config(host=load_host("SERVER_HOST"),
                            port=load_port("SERVER_PORT"),
                            log_level="info",
                            app=app_name)
    server = uvicorn.Server(config)
    server.run()

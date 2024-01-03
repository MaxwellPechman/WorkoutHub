import uvicorn

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from backend.app.config import load_urls, load_host, load_port


app_name = "main:app"
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=load_urls(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if "__main__" == __name__:
    config = uvicorn.Config(host=load_host("SERVER_HOST"),
                            port=load_port("SERVER_PORT"),
                            log_level="info",
                            app=app_name)
    server = uvicorn.Server(config)
    server.run()

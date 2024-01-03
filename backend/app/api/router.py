from fastapi import APIRouter
from backend.app.api.user import user_router


api_routes = APIRouter()


api_routes.include_router(user_router)

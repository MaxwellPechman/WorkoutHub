from fastapi import APIRouter

from backend.app.db.session import get_username_from_session
from backend.app.db.user import read_user
from backend.app.db.workout import create_workout, get_user_workouts
from backend.app.schema.user import User
from backend.app.schema.workout import Workout


workout_router = APIRouter(
    prefix="/workout",
    tags=["workouts"],
    responses={404: {"description": "Not found"}}
)


@workout_router.post("/save")
async def save_workout(workout: Workout):
    create_workout(workout)


@workout_router.post("/get")
async def get_workout(user: User):
    name = get_username_from_session(user.token)
    user_data = read_user(name)[0]
    workouts: list = []
    # user_workouts: list[Workout] = get_user_workouts(user_data[1])
    return get_user_workouts(39)

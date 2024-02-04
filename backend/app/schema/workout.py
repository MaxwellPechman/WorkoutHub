from typing import List

from pydantic import BaseModel


class Set(BaseModel):
    place: int
    reps: int


class Exercise(BaseModel):
    place: int
    name: str
    sets: List[Set]


class Workout(BaseModel):
    user: str
    date: str
    split: str
    exercises: List[Exercise]

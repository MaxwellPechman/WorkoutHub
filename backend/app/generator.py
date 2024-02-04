import random

from datetime import datetime
from backend.app.db.user import create_user, read_user_by_id
from backend.app.db.workout import create_workout
from backend.app.schema.workout import Set, Exercise, Workout

names = ["Bruce", "Scott", "Leslie", "Anna", "Sarah", "Smith", "Lucy", "Robert", "George", "Jack", "Bob", "Jackson",
         "Angela", "Bob", "Steve", "Chris", "Jennifer", "Aaron", "Fred", "Charlie", "Elizabeth", "Amy", "Hannah",
         "Barbara", "Thomas", "Bill", "Elon", "Edith", "Eric", "Emily", "Clark", "Clara", "Daniel", "Jasmin"]

letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
           "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

exercise_names = ["Push-Ups", "Pullups", "Squats", "Lunges", "Chin-Ups", "Bench Press", "Rows", "Overhead Press",
                  "Bicep Curls", "Crunches", "Sit-Ups", "Hip Thrusts", "Deadlifts"]


def generate_random_word(length):
    word = ""
    index = 0

    while index < length:
        word += letters[random.randint(0, len(letters) - 1)]
        index += 1

    return word


def generate_database_data(amount: int):
    generate_users(amount)
    generate_workouts(amount)


def generate_users(amount: int):
    index = 0

    while index < amount:
        name = names[random.randint(0, len(names) - 1)] + str(index)
        mail = generate_random_word(random.randint(1, 32 + 6)) + "@mail.com"
        password = generate_random_word(random.randint(1, 32))

        create_user(name, mail, password)

        index += 1


def generate_random_split() -> str:
    return str(random.choice(["Fullbody", "Upper-/Lowerbody", "Push Pull Legs", "Bro Split", "Custom"]))


def generate_sets(amount: int) -> list[Set]:
    sets: list[Set] = []
    index = 0

    while index < amount:
        set_data = {
            "place": index,
            "reps": random.randint(1, 20)
        }
        set_obj = Set(**set_data)

        sets.append(set_obj)
        index += 1

    return sets


def generate_exercise(amount: int) -> list[Exercise]:
    exercises: list[Exercise] = []
    index = 0

    while index < amount:
        exercise_data = {
            "place": index,
            "name": exercise_names[random.randint(0, len(exercise_names) - 1)],
            "sets": generate_sets(random.randint(2, 5))
        }
        exercise = Exercise(**exercise_data)

        exercises.append(exercise)
        index += 1

    return exercises


def generate_workouts(amount: int):
    index = 0

    while index < amount:
        workout_data = {
            "user": read_user_by_id(random.randint(1, amount - 1))[0][1],
            "date": datetime.utcnow().__str__(),
            "split": generate_random_split(),
            "exercises": generate_exercise(random.randint(1, 6))
        }

        workout = Workout(**workout_data)
        print(workout)

        create_workout(workout)

        index += 1

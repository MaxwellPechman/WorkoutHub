from backend.app.db.postgres.postgres import postgres
from backend.app.db.postgres.sql import sql
from backend.app.db.user import read_user, read_user_by_id
from backend.app.schema.workout import Workout, Exercise
from backend.app.util.num import strip_to_number_str


def get_user_workouts(account_id: int) -> list:
    workouts: list = []
    query = sql.get_query("readWorkoutByAccount.sql")
    schema = {"accountID": account_id}
    workouts_data = postgres.query(query, schema)

    for workout in workouts_data:
        workout_id = workout[0]
        sub_query = sql.get_query("readWorkout.sql")
        sub_schema = {"workoutID": workout_id}
        workout_data = postgres.query(sub_query, sub_schema)
        workout_dict = {
            "user": read_user_by_id(account_id),
            "date": str(workout_data[0][1]),
            "split": str(workout_data[0][2]),
            "exercises": get_workout_exercises(workout_id)
        }

        print(workout_dict)
        workouts.append(workout_dict)

    return workouts


def get_workout_exercises(workout_id: int) -> list:
    exercises: list = []
    query = sql.get_query("readExerciseByWorkout.sql")
    schema = {"workoutID": workout_id}
    exercises_data = postgres.query(query, schema)

    for exercise in exercises_data:
        exercise_id = exercise[0]
        sub_query = sql.get_query("readExercise.sql")
        sub_schema = {"exerciseID": exercise_id}
        exercise_data = postgres.query(sub_query, sub_schema)
        exercise_dict = {
            "place": str(exercise_data[0][2]),
            "name": str(exercise_data[0][1]),
            "sets": get_exercise_sets(exercise_id)
        }

        print(exercise_dict)
        exercises.append(exercise_dict)

    return exercises


def get_exercise_sets(exercise_id: int) -> list:
    sets: list = []
    query = sql.get_query("readSetByExercise.sql")
    schema = {"exerciseID": exercise_id}
    sets_data = postgres.query(query, schema)

    for set_data in sets_data:
        set_id = set_data[0]
        sub_query = sql.get_query("readSet.sql")
        sub_schema = {"setID": set_id}
        set_data_result = postgres.query(sub_query, sub_schema)
        sets_dict = {
            "place": str(set_data_result[0][2]),
            "reps": str(set_data_result[0][1])
        }

        print(sets_dict)

        sets.append(sets_dict)

    return sets


def create_workout(workout: Workout):
    query = sql.get_query("createWorkout.sql")
    schema = {
        "created_at": workout.date,
        "split": workout.split
    }

    workout_data = postgres.query(query, schema)
    workout_id = strip_to_number_str(str(workout_data[0]))
    create_account_workout(workout.user, workout_id)
    exercise_ids: list = create_exercise(workout.exercises)
    create_workout_exercise(workout_id, exercise_ids)
    sets: dict[str, list] = create_set(exercise_ids, workout.exercises)
    create_exercise_set(sets)


def create_account_workout(user: str, workout: str):
    query = sql.get_query("createAccountWorkout.sql")
    user_data = read_user(user)[0]
    schema = {
        "accountID": user_data[0],
        "workoutID": workout
    }

    postgres.execute(query, schema)


def create_set(exercise_ids: list, exercises: list[Exercise]) -> dict[str, list]:
    sets = []

    for exercise in exercises:
        for exercise_set in exercise.sets:
            sets.append(exercise_set)

    count = 0
    schema = {}
    query = "INSERT INTO set (reps, place) VALUES"

    for exercise_set in sets:
        reps = "reps" + str(count)
        place = "place" + str(count)

        if count == 0:
            query_addition = " (%(" + reps + ")s, %(" + place + ")s)"

        else:
            query_addition = ", (%(" + reps + ")s, %(" + place + ")s)"

        query = query + query_addition
        schema[reps] = exercise_set.reps
        schema[place] = exercise_set.place
        count += 1

    query = query + " RETURNING setID;"
    set_ids = postgres.query(query, schema)
    exercise_index = 0
    set_index = 0
    result: dict[str, list] = {}

    for exercise in exercises:
        set_result_ids: list = []

        for subdex in range(len(exercise.sets)):
            set_result_ids.append(set_ids[set_index])
            set_index += 1

        result[exercise_ids[exercise_index]] = set_result_ids
        exercise_index += 1

    return result


def create_exercise_set(sets: dict[str, list]):
    count = 0
    schema = {}
    query = "INSERT INTO exerciseSet (exerciseID, setID) VALUES"

    for exercise_sets in sets:
        for exercise_set in sets[exercise_sets]:
            exercise_id = "exercise" + str(count)
            set_id = "set" + str(count)

            if count == 0:
                query_addition = " (%(" + exercise_id + ")s, %(" + set_id + ")s)"

            else:
                query_addition = ", (%(" + exercise_id + ")s, %(" + set_id + ")s)"

            query = query + query_addition
            schema[exercise_id] = strip_to_number_str(str(exercise_sets))
            schema[set_id] = strip_to_number_str(str(exercise_set))
            count += 1

    query = query + ";"
    postgres.execute(query, schema)


def create_exercise(exercises: list[Exercise]) -> list:
    count = 0
    schema = {}
    query = "INSERT INTO exercise (name, place) VALUES"

    for exercise in exercises:
        name = "name" + str(count)
        place = "place" + str(count)

        if count == 0:
            query_addition = " (%(" + name + ")s, %(" + place + ")s)"

        else:
            query_addition = ", (%(" + name + ")s, %(" + place + ")s)"

        query = query + query_addition
        schema[name] = exercise.name
        schema[place] = exercise.place
        count += 1

    query = query + " RETURNING exerciseID;"
    return postgres.query(query, schema)


def create_workout_exercise(workout_id: str, exercise_ids: list):
    count = 0
    schema = {}
    query = "INSERT INTO workoutExercise (workoutID, exerciseID) VALUES"

    for exercises in exercise_ids:
        exercise_id = strip_to_number_str(str(exercises))
        workout = "workout" + str(count)
        exercise = "exercise" + str(count)

        if count == 0:
            query_addition = " (%(" + workout + ")s, %(" + exercise + ")s)"

        else:
            query_addition = ", (%(" + workout + ")s, %(" + exercise + ")s)"

        query = query + query_addition
        schema[workout] = workout_id
        schema[exercise] = exercise_id
        count += 1

    query = query + ";"
    postgres.execute(query, schema)

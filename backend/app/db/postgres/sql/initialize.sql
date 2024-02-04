CREATE TABLE IF NOT EXISTS account (
    accountID SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(16) NOT NULL,
    mail TEXT NOT NULL,
    hashed_password VARCHAR(64) NOT NULL,
    created_at DATE NOT NULL,
    changed_at DATE NULL,
    active BOOL NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_account ON account (accountID);

CREATE TABLE IF NOT EXISTS workout (
    workoutID SERIAL PRIMARY KEY NOT NULL,
    created_at DATE NOT NULL,
    split TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_workout ON workout (workoutID);

CREATE TABLE IF NOT EXISTS accountWorkout (
    accountID INTEGER NOT NULL,
    workoutID INTEGER NOT NULL,
    CONSTRAINT fk_account
      FOREIGN KEY (accountID)
        REFERENCES account (accountID) ON DELETE CASCADE,
    CONSTRAINT fk_workout
      FOREIGN KEY (workoutID)
        REFERENCES workout (workoutID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS exercise (
    exerciseID SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    place SMALLINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_exercise ON exercise (exerciseID);

CREATE TABLE IF NOT EXISTS workoutExercise (
    workoutID INTEGER NOT NULL,
    exerciseID INTEGER NOT NULL,
    CONSTRAINT fk_workout
      FOREIGN KEY (workoutID)
        REFERENCES workout (workoutID) ON DELETE CASCADE,
    CONSTRAINT fk_exercise
      FOREIGN KEY (exerciseID)
        REFERENCES exercise (exerciseID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS set (
    setID SERIAL PRIMARY KEY NOT NULL,
    reps SMALLINT NOT NULL,
    place SMALLINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_set ON set (setID);

CREATE TABLE IF NOT EXISTS exerciseSet (
    exerciseID INTEGER NOT NULL,
    setID INTEGER NOT NULL,
    CONSTRAINT fk_exercise
      FOREIGN KEY (exerciseID)
        REFERENCES exercise (exerciseID) ON DELETE CASCADE,
    CONSTRAINT fk_set
      FOREIGN KEY (setID)
        REFERENCES set (setID) ON DELETE CASCADE
);

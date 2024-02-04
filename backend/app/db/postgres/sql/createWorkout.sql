INSERT INTO workout (created_at, split)
VALUES (%(created_at)s, %(split)s)
RETURNING workoutID;
import { useContext } from "react";
import { WorkoutContext, Set, Exercise } from "../providers/WorkoutProvider.tsx";
import { loadUsername } from "../../api/api.ts";

export type SetCount = {
    exerciseOrder: number
    order: number
}

export function SetView({ exerciseOrder, order }: SetCount) {
    const workoutContext = useContext(WorkoutContext)

    order--

    function createLabel(order: number): string {
        const num = order + 1
        return num.toString() + ". Set"
    }

    function addSets(reps: string) {
        const exercises: Exercise[] = workoutContext.workout.exercises;
        const sets: Set[] = exercises[exerciseOrder].sets;

        sets.forEach((value) => {
            if(value.place == order) {
                const index = sets.indexOf(value)

                sets.splice(index)
            }
        })

        console.log("test")

        sets[order] = {
            place: order,
            reps: Number(reps)
        }

        exercises[exerciseOrder].sets = sets

        console.log(exercises)

        loadUsername().then((result) => {
            workoutContext.setWorkout({
                user: result.data,
                date: workoutContext.workout.date,
                split: workoutContext.workout.split,
                exercises: exercises
            })
        })
    }

    return (
        <div className="flex gap-x-2 items-center">
            <label className="font-barlow-semi-condensed" htmlFor="repetitions">{createLabel(order)}</label>
            <input className="px-2 py-1 w-20 font-barlow-semi-condensed" type="text" name="repetitions" placeholder="Repitions" onChange={(event) => addSets(event.target.value)}/>
        </div>
    )
}


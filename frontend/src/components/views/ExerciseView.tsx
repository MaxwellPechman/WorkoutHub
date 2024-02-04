import { SetView } from "./SetView.tsx";
import { useContext, useState } from "react";
import { Exercise, WorkoutContext } from "../providers/WorkoutProvider.tsx";
import { loadUsername } from "../../api/api.ts";

export type ExerciseCount = {
    count: number
}

export function ExerciseView({ count }: ExerciseCount) {
    const [set, setSets] = useState([1])
    const workoutContext = useContext(WorkoutContext)

    count--

    function createLabel(count: number): string {
        const num = count + 1
        return "Exercise " + num.toString()
    }

    function updateSets(set: number[]) {
        const len = set.length + 1;
        const nums: number[] = []

        for(let num: number = 0; num < len; num ++) {
           nums[num] = num + 1
        }

        setSets(nums)
    }

    function addExercise(name: string) {
        const currentExercises: Exercise[] = workoutContext.workout.exercises;

        currentExercises.forEach((value) => {
            if(value.place == count) {
                const index = currentExercises.indexOf(value)

                currentExercises.splice(index)
            }
        })

        if(workoutContext.workout.exercises[count] == undefined) {
            currentExercises[count] = {
                place: count,
                name: name,
                sets: []
            }

        } else {
            currentExercises[count] = {
                place: count,
                name: name,
                sets: workoutContext.workout.exercises[count].sets
            }
        }



        loadUsername().then((result) => {
            workoutContext.setWorkout({
                user: result.data,
                date: workoutContext.workout.date,
                split: workoutContext.workout.split,
                exercises: currentExercises
            })
        })
    }

    return (
        <div className="flex flex-col gap-y-2">
            <label className="font-barlow-semi-condensed" htmlFor="exercise">{createLabel(count)}</label>
            <input className="px-2 py-1 w-52 font-barlow-semi-condensed" placeholder="Exercise name" onChange={(event) => addExercise(event.target.value)}/>
            <div className="flex gap-x-2">
                {
                    set.map((value) => {
                        return (
                            <SetView key={value} exerciseOrder={count} order={value}/>
                        )
                    })
                }
                <button
                    className="px-2 py-1 w-20 bg-neutral-300 rounded-[8px] cursor-pointer font-barlow-semi-condensed hover:bg-neutral-400 transition duration-200 ease-in-out"
                    onClick={() => updateSets(set)}>Add set
                </button>
            </div>
            <div className="py-1 border-2 border-b-neutral-800 h-1 w-[107rem]"/>
        </div>
    )
}
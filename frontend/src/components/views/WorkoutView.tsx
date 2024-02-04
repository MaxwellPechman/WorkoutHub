import { useContext, useState } from "react";
import { ExerciseView } from "./ExerciseView.tsx";
import { Dropbox } from "../dropbox/Dropbox.tsx";
import { WorkoutContext } from "../providers/WorkoutProvider.tsx";

export function WorkoutView() {
    const [count, setCount] = useState([1])
    const workoutContext = useContext(WorkoutContext)
    const splits = ["Fullbody", "Upper-/Lowerbody", "Push Pull Legs", "Bro Split", "Custom"]

    function updateCounter(count: number[]) {
        const len = count.length + 1;
        const nums: number[] = []

        for(let num: number = 0; num < len; num ++) {
           nums[num] = num + 1
        }

        setCount(nums)
    }

    return (
        <div className="absolute top-20 left-20 h-[calc(100vh-10rem)] w-[calc(100vw-5rem)] bg-neutral-200 overflow-auto">
            <div className="absolute top-6 left-20 flex flex-col gap-y-6">
                <div className="flex gap-x-6">
                    <div className="flex flex-col gap-y-2">
                        <label className="font-barlow-semi-condensed" htmlFor="date">Date</label>
                        <input className="px-2 py-1" type="date" name="date" onChange={(event) => workoutContext.setWorkout({
                            user: workoutContext.workout.user,
                            date: event.target.value,
                            split: workoutContext.workout.split,
                            exercises: workoutContext.workout.exercises
                        })}/>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label className="font-barlow-semi-condensed">Split Type</label>
                        <Dropbox items={splits} selected={splits[0]}/>
                    </div>
                </div>
                {
                    count.map((value) => {
                        return (
                            <ExerciseView key={value} count={value}/>
                        )
                    })
                }
                <button
                    className="mb-4 px-2 py-1 w-32 bg-neutral-300 rounded-[8px] cursor-pointer font-barlow-semi-condensed hover:bg-neutral-400 transition duration-200 ease-in-out"
                    onClick={() => updateCounter(count)}>Add exercise
                </button>
            </div>
        </div>
    )
}
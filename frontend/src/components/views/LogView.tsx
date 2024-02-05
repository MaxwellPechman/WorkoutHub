import { Workout } from "../providers/WorkoutProvider.tsx";
import { useState } from "react";

export type Workouts = {
    workoutProp: Workout[]
}

export function LogView({ workoutProp }: Workouts) {
    const [workouts, setWorkouts] = useState(workoutProp)
    const [place, setPlace] = useState(0)

    function previous() {
        if(place > 0) {
            setPlace(place - 1)
        }
    }

    function next() {
        if(place < workouts.length) {
            setPlace(place + 1)
        }

        console.log(workouts)
    }

    return (
        <div className="absolute top-20 left-20 h-[calc(100vh-10rem)] w-[calc(100vw-5rem)] bg-neutral-200 overflow-auto">
            <div className="absolute top-4 left-14 flex flex-col gap-y-6">
                <div className="flex gap-x-4">
                    <button
                        className="px-3 py-1 bg-neutral-600 text-white text-sm hover:text-neutral-200 transition duration-200 ease-in-out"
                        onClick={() => previous()}>Previous
                    </button>
                    <button
                        className="px-3 py-1 bg-neutral-600 text-white text-sm hover:text-neutral-200 transition duration-200 ease-in-out"
                        onClick={() => next()}>Next
                    </button>
                </div>
                {
                    workouts[0] === undefined
                        ?
                        <p>No workouts available.</p>
                        :
                        <div>
                            <div className="flex gap-x-6">
                                <div className="flex flex-col gap-y-2">
                                    <p className="font-barlow-semi-condensed">Date</p>
                                    <p className="px-2 py-1 font-barlow-semi-condensed bg-white">{workouts[place].date}</p>
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <p className="font-barlow-semi-condensed">Split Type</p>
                                    <p className="px-2 py-1 font-barlow-semi-condensed bg-white">{workouts[place].split}</p>
                                </div>
                            </div>
                            {
                                workouts[place].exercises.map((exercise, index) => {
                                    return (
                                        <div key={index} className="pt-2 flex flex-col gap-y-2">
                                            <p className="font-barlow-semi-condensed">{(index + 1) + ". Exercise"}</p>
                                            <p className="px-2 py-1 font-barlow-semi-condensed">{exercise.name}</p>
                                            <div className="flex gap-x-2">
                                                {
                                                    exercise.sets.map((set, index) => {
                                                        return (
                                                            <div key={index} className="flex gap-x-2 items-center">
                                                                <p className="font-barlow-semi-condensed">{(index + 1) + ". Set"}</p>
                                                                <p className="px-2 py-1 font-barlow-semi-condensed bg-white">{set.reps}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div
                                                className="py-1 border-2 border-b-neutral-800 h-1 w-[calc(100vw-14rem)]"/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
            </div>
        </div>
    )
}
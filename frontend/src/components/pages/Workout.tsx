import { useContext, useState } from "react";
import { Topnav } from "../topnav/Topnav.tsx";
import { LogView } from "../views/LogView.tsx";
import { WorkoutView } from "../views/WorkoutView.tsx";
import { WorkoutContext } from "../providers/WorkoutProvider.tsx";
import { loadUsername, loadWorkouts } from "../../api/api.ts";
import axios from "axios";


export function WorkoutPage() {
    const [isWorkoutView, setWorkoutView] = useState(true)
    const workoutContext = useContext(WorkoutContext)

    function saveWorkout() {
        loadUsername().then((result) => {
            workoutContext.setWorkout({
                user: result.data,
                date: workoutContext.workout.date,
                split: workoutContext.workout.split,
                exercises: workoutContext.workout.exercises
            })
        })

        axios.post("http://127.0.0.1:3300/workout/save", workoutContext.workout, {
            withCredentials: true
        })
            .then(() => {
                console.log("Transmission successful")
            })
            .catch((error) => {
                console.log("An error occured while transmitting data to backend " + error)
            })
    }

    function changeView() {
        setWorkoutView(false)

        loadWorkouts().then((result) => {
            console.log(result.data)
        })
    }

    return (
        <div className="w-screen min-h-screen">
            <Topnav/>
            <div className="fixed top-20 z-10 min-h-[calc(100vh-5rem)] w-28 bg-neutral-700">
                <ul className="py-4 flex flex-col gap-y-2 items-center">
                    <li className="text-white text-base font-barlow-semi-condensed cursor-pointer hover:text-neutral-300 transition duration-200 ease-in-out"
                        onClick={() => setWorkoutView(true)}>Workouts
                    </li>
                    <li className="text-white text-base font-barlow-semi-condensed cursor-pointer hover:text-neutral-300 transition duration-200 ease-in-out"
                        onClick={() => changeView()}>Logs
                    </li>
                </ul>
            </div>
            {
                isWorkoutView
                    ?
                    <WorkoutView/>
                    :
                    <LogView/>
            }
            <div className="left-28 bottom-0 fixed w-[calc(100vw-7rem)] h-20 bg-blue-600 flex gap-x-4 items-center justify-end">
                <button className="px-2 py-1 text-white text-xl border-2 border-white font-barlow-semi-condensed cursor-pointer hover:bg-blue-400 transition duration-200 ease-in-out">Clear</button>
                <button className="px-2 py-1 mr-4 text-white text-xl bg-blue-400 border-2 border-blue-400 font-barlow-semi-condensed cursor-pointer hover:bg-blue-500 hover:border-blue-500 transition duration-200 ease-in-out"
                        onClick={() => saveWorkout()}>Save</button>
            </div>
        </div>
    )
}
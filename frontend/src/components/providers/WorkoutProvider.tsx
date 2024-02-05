import { createContext, useState } from "react";
import { ChildrenProps } from "../ChildrenProps.ts";

export type Set = {
    place: number
    reps: number
}

export type Exercise = {
    place: number
    name: string
    sets: Set[]
}

export type Workout = {
    user: string
    date: string
    split: string
    exercises: Exercise[]
}

export const emptyWorkout: Workout = {
    user: "---",
    date: "---",
    split: "Fullbody",
    exercises: [
        {
            place: 0,
            name: "",
            sets: []
        }
    ]
}

export type WorkoutProviderType = {
    workout: Workout
    setWorkout: (workout: Workout) => void
}

const emptyWorkoutProviderType: WorkoutProviderType = {
    workout: emptyWorkout,
    setWorkout: () => {}
}

export const WorkoutContext = createContext<WorkoutProviderType>(emptyWorkoutProviderType)

export function WorkoutProvider({ children }: ChildrenProps) {
    const [workout, setWorkout] = useState<Workout>(emptyWorkout)

    return (
        <WorkoutContext.Provider value={{ workout: workout, setWorkout: setWorkout }}>
            {children}
        </WorkoutContext.Provider>
    )
}
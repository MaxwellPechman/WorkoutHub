import { useContext, useState } from "react";
import { WorkoutContext } from "../providers/WorkoutProvider.tsx";

export type DropdownType = {
    items: string[]
    selected: string
}

export function Dropbox({ items, selected }: DropdownType) {
    const [dropped, setDropped] = useState(false)
    const [dropdown, setDropdown] = useState<DropdownType>({ items: items, selected: selected })
    const workoutContext = useContext(WorkoutContext)

    function updateDropbox({ items, selected }: DropdownType) {
        setDropdown({
            items: items,
            selected: selected
        })

        if(selected == "Fullbody" || selected == "Upper-/Lowerbody" || selected == "Push Pull Legs" || selected == "Bro Split" || selected == "Custom") {
            workoutContext.setWorkout({
                user: workoutContext.workout.user,
                date: workoutContext.workout.date,
                split: selected,
                exercises: workoutContext.workout.exercises
            })
        }
    }

    return (
        <div className="flex flex-col cursor-pointer select-none" onClick={() => setDropped(!dropped)}>
            <div className="flex items-center bg-white hover:bg-neutral-200 transition duration-200 ease-in-out">
                <p className="px-2 py-1 font-barlow-semi-condensed">{dropdown.selected}</p>
                {
                    dropped
                        ?
                        <div className="px-2 flex flex-col">
                            <div className="w-[1px] h-[7px] transform-gpu rotate-45 bg-neutral-800"/>
                            <div className="w-[1px] h-[7px] transform-gpu -rotate-45 bg-neutral-800"/>
                        </div>
                        :
                        <div className="pl-1 pr-3 pt-1 flex gap-x-1">
                            <div className="w-[1px] h-[7px] transform-gpu -rotate-45 bg-neutral-800"/>
                            <div className="w-[1px] h-[7px] transform-gpu rotate-45 bg-neutral-800"/>
                        </div>
                }
            </div>
            {
                dropped
                    ?
                    dropdown.items.map((item) => {
                        return (
                            <div key={item} onClick={() => updateDropbox({ items: dropdown.items, selected: item })}>
                                <p className="px-2 py-1 bg-white font-barlow-semi-condensed hover:bg-neutral-200 transition duration-200 ease-in-out">{item}</p>
                            </div>
                        )
                    })
                    :
                    <div/>
            }
        </div>
    )
}
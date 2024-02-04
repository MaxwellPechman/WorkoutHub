export function LogView() {
    return (
        <div className="absolute top-20 left-20 h-[calc(100vh-10rem)] w-[calc(100vw-5rem)] bg-neutral-200 overflow-auto">
            <div className="absolute top-4 left-14 flex flex-col gap-y-6">
                <div className="flex gap-x-4">
                    <button className="px-3 py-1 bg-neutral-600 text-white text-sm hover:text-neutral-200 transition duration-200 ease-in-out">Previous</button>
                    <button className="px-3 py-1 bg-neutral-600 text-white text-sm hover:text-neutral-200 transition duration-200 ease-in-out">Next</button>
                </div>
            </div>
        </div>
    )
}
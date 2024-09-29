import React from 'react'

const SearchAndSort = () => {
    return (
        <div className="mx-4 bg-white shadow-sm  p-4  mt-2">
            <div className="flex items-center justify-between">
                <div>
                    <span className="font-semibold">Search: </span> <input type="text" className="border w-96 border-gray-300 outline-none rounded-md px-2 py-1" placeholder="Search..." />
                </div>
                <div>
                    <span className="font-semibold">Sort By: </span>
                    <select name="" id="" className="outline-none p-1 rounded-md border border-gray-300">
                        <option value="recent">Recent</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default SearchAndSort
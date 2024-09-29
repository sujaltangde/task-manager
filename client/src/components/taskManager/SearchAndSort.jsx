import React, { useState, useEffect, useCallback } from "react";

const SearchAndSort = ({ fetchTasks }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("recent");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    // Wrap fetchTasks in useCallback to prevent unnecessary re-renders
    const debouncedFetch = useCallback(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchTasks(searchTerm, sortOption);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, sortOption, fetchTasks]);

    useEffect(() => {
        debouncedFetch();
    }, [searchTerm, sortOption]);

    return (
        <div className="mx-4 bg-white shadow-sm p-4 mt-2">
            <div className="flex sm:flex-row flex-col sm:gap-0 gap-4 sm:items-center justify-between">
                <div>
                    <span className="font-semibold">Search: </span>
                    <input
                        type="text"
                        className="border w-96 border-gray-300 outline-none rounded-md px-2 py-1"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div>
                    <span className="font-semibold">Sort By: </span>
                    <select
                        className="outline-none p-1 rounded-md border border-gray-300"
                        value={sortOption}
                        onChange={handleSortChange}
                    >
                        <option value="recent">Recent</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SearchAndSort;

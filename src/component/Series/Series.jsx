import React from "react";

export default function Series({ id, name, type, start, end, winner, handleClick }) {
    return (
        <div className="border-2 border-gray-600 rounded-md p-3 w-full" onClick={() =>handleClick(id)}>
            <div className="flex justify-between bg-green-400 p-2">
                <h1 className="text-xl font-bold">{name}</h1>
                <h3 className="text-gray-600">{type}</h3>
            </div>
            <div className="flex justify-between gap-3">
                <div>
                    <p className="p-2">started: {new Date(start).toLocaleDateString()}</p>
                    <p className="px-2">ended: {new Date(end).toLocaleDateString()}</p>
                </div>
                <div>
                    <p className="text-amber-500 font-bold p-2">Winner: {winner}</p>
                </div>
            </div>
        </div>
    );
}
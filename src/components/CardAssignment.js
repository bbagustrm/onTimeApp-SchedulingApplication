import React from "react";
import assignments from "../data/assignment.json";

function getPriorityColor(priority) {
    switch (priority) {
        case "hard":
            return "bg-error";
        case "normal":
            return "bg-warning";
        case "easy":
            return "bg-success";
        default:
            return "bg-gray-400";
    }
}


function CardAssignment() {
    return (
        <div className="space-y-4">
            {assignments.map((assignment) => (
                <div key={assignment.id} className="bg-surface w-full p-4 rounded-md space-y-2">
                    <h1 className="text-onBackground text-subtitle2">{assignment.tugas}</h1>
                    <div className={`w-12 h-1.5 rounded-full ${getPriorityColor(assignment.priority)}`}></div>
                    <p className="text-onSurface text-body1">{assignment.description}</p>
                    <div className="flex gap-1">
                        {assignment.tags.map((tag) => (
                            <span key={tag} className="text-overline py-1 px-4 rounded-full bg-onSurface text-surface">{tag}</span>
                        ))}
                    </div>

                </div>
            ))}
        </div>
    )
}

export default CardAssignment;




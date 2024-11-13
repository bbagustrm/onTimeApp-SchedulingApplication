import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = "?auth=kCScjmp3OSNBh2EstclolWV3jduOQ7EocsdbWqvL";
    const user_id = "-OBZ3bUE2zRmeX90l-ws";

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await fetch("https://restapi-3bfde-default-rtdb.firebaseio.com/tugas.json" + token);
                if (!response.ok) {
                    throw new Error("Gagal mengambil data assignments");
                }
                const data = await response.json();

                const assignmentsArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key]
                }))
                .filter((assignment) => assignment.user_id === user_id);

                setAssignments(assignmentsArray);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAssignments();
    }, []);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="space-y-4">
            {assignments.map((assignment) => (
                <div
                    key={assignment.id}
                    className="bg-surface w-full p-4 rounded-md space-y-2 cursor-pointer"
                    onClick={() => navigate(`/detail-assignment/${assignment.id}`)}
                >
                    <h1 className="text-onBackground text-subtitle2">{assignment.nama_tugas}</h1>
                    <div className={`w-12 h-1.5 rounded-full ${getPriorityColor(assignment.priority)}`}></div>
                    <p className="text-onSurface text-body1">{assignment.description}</p>
                    <div className="flex gap-1">
                        {assignment.tags && assignment.tags.map((tag, index) => (
                            <span key={`${tag}-${index}`} className="text-overline py-1 px-4 rounded-full bg-onSurface text-surface">{tag}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardAssignment;

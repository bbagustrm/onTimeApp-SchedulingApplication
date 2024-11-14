import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as TrashIcon } from '../assets/ic-trash.svg';

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
    const [selectedAssignments, setSelectedAssignments] = useState([]);
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

    const handleSelect = (id) => {
        setSelectedAssignments((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((assignmentId) => assignmentId !== id)
                : [...prevSelected, id]
        );
    };

    const handleDelete = async () => {
        try {
            await Promise.all(
                selectedAssignments.map(async (id) => {
                    await fetch(`https://restapi-3bfde-default-rtdb.firebaseio.com/tugas/${id}.json${token}`, {
                        method: "DELETE"
                    });
                })
            );
            // Filter out deleted assignments from the state
            setAssignments(assignments.filter((assignment) => !selectedAssignments.includes(assignment.id)));
            // Clear the selected assignments
            setSelectedAssignments([]);
        } catch (err) {
            setError("Gagal menghapus assignments yang dipilih");
        }
    };

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="space-y-4">
            {selectedAssignments.length > 0 && (
                <div className="flex justify-end mb-2">
                    <button
                        onClick={handleDelete}
                        className="fixed top-4 right-4 bg-error text-white p-4 rounded-full hover:bg-red-600 transition"
                    >
                        <TrashIcon />
                    </button>
                </div>
            )}
            {assignments.map((assignment) => (
                <div
                    key={assignment.id}
                    className={`bg-surface w-full pl-4 pr-6 py-4 rounded-md cursor-pointer transition-opacity ${selectedAssignments.includes(assignment.id) ? "opacity-50" : "opacity-100"}`}>
                    <div className="flex items-center justify-between gap-6">
                        <div onClick={() => navigate(`/update-assignment/${assignment.id}`)} className="space-y-2 w-full">
                            <h1 className="text-onBackground text-subtitle2">{assignment.nama_tugas}</h1>

                            <div className={`w-12 h-1.5 rounded-full ${getPriorityColor(assignment.priority)}`}></div>
                            <p className="text-onSurface text-body1 line-clamp-1">{assignment.description}</p>
                            <div className="flex gap-2">
                                {assignment.tags && assignment.tags.map((tag, index) => (
                                    <span key={`${tag}-${index}`} className="text-overline py-2 px-3 h-full rounded-full bg-surface2 text-primary">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={selectedAssignments.includes(assignment.id)}
                            onChange={() => handleSelect(assignment.id)}
                            className={`form-checkbox appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-primary checked:border-surface checked:ring-2 checked:ring-onBackground transition-all duration-300 cursor-pointer`}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardAssignment;

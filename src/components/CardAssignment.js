import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as TrashIcon } from '../assets/ic-trash.svg';
import useLongPress from './useLongPress';

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
    const [isDeleteMode, setIsDeleteMode] = useState(false);
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
                })).filter((assignment) => assignment.user_id === user_id);

                setAssignments(assignmentsArray);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAssignments();
    }, []);

    const handleStatusToggle = async (assignment) => {
        try {
            const updatedAssignment = { ...assignment, status: !assignment.status };
            await fetch(`https://restapi-3bfde-default-rtdb.firebaseio.com/tugas/${assignment.id}.json${token}`, {
                method: "PATCH",
                body: JSON.stringify({ status: updatedAssignment.status })
            });
            setAssignments((prev) =>
                prev.map((item) => (item.id === assignment.id ? updatedAssignment : item))
            );
        } catch (err) {
            setError("Gagal mengubah status tugas");
        }
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
            setAssignments(assignments.filter((assignment) => !selectedAssignments.includes(assignment.id)));
            setSelectedAssignments([]);
            setIsDeleteMode(false);
        } catch (err) {
            setError("Gagal menghapus assignments yang dipilih");
        }
    };

    const handleSelect = (id) => {
        setSelectedAssignments((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((assignmentId) => assignmentId !== id)
                : [...prevSelected, id]
        );
    };

    const longPress = (assignmentId) => {
        setIsDeleteMode(true);
        setSelectedAssignments([assignmentId]);
    };

    const longPressEvent = useLongPress(() => longPress(), 500);

    useEffect(() => {
        if (selectedAssignments.length === 0) {
            setIsDeleteMode(false);
        }
    }, [selectedAssignments]);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="space-y-4">
            {isDeleteMode && selectedAssignments.length > 0 && (
                <div className="flex justify-end mb-2">
                    <button
                        onClick={handleDelete}
                        className="absolute z-20 top-4 right-4 hover:opacity-90 border-2 border-error text-white p-2 rounded-full transition"
                    >
                        <TrashIcon />
                    </button>
                </div>
            )}
            {assignments.map((assignment) => (
                <div
                    key={assignment.id}
                    className={`bg-surface w-full pl-4 pr-6 py-4 rounded-md cursor-pointer transition-opacity ${assignment.status ? "opacity-50" : "opacity-100"}`}
                    {...longPressEvent} // Menggunakan variabel longPressEvent yang sudah di-bind
                >
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex gap-6 items-center w-10/12">
                            {isDeleteMode && (
                                <input
                                    type="checkbox"
                                    checked={selectedAssignments.includes(assignment.id)}
                                    onChange={() => handleSelect(assignment.id)}
                                    className="form-checkbox appearance-none w-4 h-4 rounded-sm ml-2 border-2 border-gray-400 checked:bg-primary checked:border-surface checked:ring-2 checked:ring-onBackground transition-all duration-300 cursor-pointer"
                                />
                            )}
                            <div onClick={() => navigate(`/update-assignment/${assignment.id}`)} className="w-8/12 space-y-2">
                                <h1 className="text-onBackground text-subtitle2">{assignment.nama_tugas}</h1>
                                <div className={`w-12 h-1.5 rounded-full ${getPriorityColor(assignment.priority)}`}></div>
                                <p className="text-onSurface text-body1 line-clamp-1">{assignment.description}</p>
                                <div className="flex gap-2">
                                    {assignment.tags && assignment.tags.map((tag, index) => (
                                        <span key={`${tag}-${index}`} className="text-overline py-2 px-3 h-full rounded-full bg-surface2 text-primary">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={assignment.status}
                            onChange={() => handleStatusToggle(assignment)}
                            className="form-checkbox appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-primary checked:border-surface checked:ring-2 checked:ring-onBackground transition-all duration-300 cursor-pointer"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardAssignment;

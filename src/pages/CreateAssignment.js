import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assignmentsData from "../data/assignment.json";

function CreateAssignment() {
    const navigate = useNavigate();
    const [newAssignment, setNewAssignment] = useState({
        id: assignmentsData.length + 1,
        tugas: "",
        description: "",
        tags: [],
        priority: "normal",
        deadline: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAssignment((prev) => ({
            ...prev,
            [name]: name === "tags" ? value.split(",").map(tag => tag.trim()) : value
        }));
    };

    const handleSubmit = () => {

    };

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-subtitle1 text-onBackground">Create New Assignment</h1>
            <input
                type="text"
                name="tugas"
                placeholder="Nama Tugas"
                value={newAssignment.tugas}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
            <textarea
                name="description"
                placeholder="Deskripsi"
                value={newAssignment.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
            <input
                type="text"
                name="tags"
                placeholder="Tags (pisahkan dengan koma)"
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
            <select
                name="priority"
                value={newAssignment.priority}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            >
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="hard">Hard</option>
            </select>
            <input
                type="date"
                name="deadline"
                value={newAssignment.deadline}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
            <button onClick={handleSubmit} className="w-full bg-blue-500 text-white p-2 rounded">
                Submit
            </button>
        </div>
    );
}

export default CreateAssignment;

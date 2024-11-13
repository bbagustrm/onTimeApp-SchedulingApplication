// src/pages/DetailAssignment.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function DetailAssignment() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        tugas: "",
        description: "",
        priority: "easy",
        tags: [],
    });

    const token = "?auth=kCScjmp3OSNBh2EstclolWV3jduOQ7EocsdbWqvL";

    // Fetch assignment details
    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const response = await fetch(`https://restapi-3bfde-default-rtdb.firebaseio.com/tugas/${id}.json${token}`);
                if (!response.ok) {
                    throw new Error("Gagal mengambil data assignment");
                }
                const data = await response.json();
                setAssignment(data);
                setFormData({
                    tugas: data.tugas,
                    description: data.description,
                    priority: data.priority,
                    tags: data.tags.join(", "),
                });
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAssignment();
    }, [id]);

    // Update form data when input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Submit updated data
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedAssignment = {
            ...formData,
            tags: formData.tags.split(",").map((tag) => tag.trim()), // Convert tags to an array
        };

        try {
            const response = await fetch(`https://restapi-3bfde-default-rtdb.firebaseio.com/tugas/${id}.json${token}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedAssignment),
            });
            if (!response.ok) {
                throw new Error("Gagal mengupdate assignment");
            }
            alert("Assignment updated successfully!");
            navigate("/assignment");
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="p-4 bg-surface rounded-md space-y-4">
            <h1 className="text-subtitle2">Update Assignment</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tugas</label>
                    <input
                        type="text"
                        name="tugas"
                        value={formData.nama_tugas}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="hard">Hard</option>
                        <option value="normal">Normal</option>
                        <option value="easy">Easy</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                    Update Assignment
                </button>
            </form>
        </div>
    );
}

export default DetailAssignment;

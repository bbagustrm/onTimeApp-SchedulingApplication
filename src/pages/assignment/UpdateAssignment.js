import React, { useState, useEffect } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { ReactComponent as BackIcon } from '../../assets/ic-arrow-left.svg';

function UpdateAssignment() {
    const token = "?auth=kCScjmp3OSNBh2EstclolWV3jduOQ7EocsdbWqvL";
    const { id } = useParams();
    const navigate = useNavigate();
    const user_id = "-OBZ3bUE2zRmeX90l-ws";
    const [assignment, setAssignment] = useState({
        nama_tugas: "",
        description: "",
        tags: [],
        priority: "normal",
        deadline: "",
        user_id: user_id 
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const response = await fetch(`https://restapi-3bfde-default-rtdb.firebaseio.com/tugas/${id}.json${token}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch assignment data");
                }
                const data = await response.json();
                setAssignment({
                    nama_tugas: data.nama_tugas || "",
                    description: data.description || "",
                    tags: data.tags || [],
                    priority: data.priority || "normal",
                    deadline: data.deadline || "",
                    user_id: user_id
                });
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchAssignment();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAssignment((prev) => ({
            ...prev,
            [name]: name === "tags" ? value.split(",").map(tag => tag.trim()) : value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`https://restapi-3bfde-default-rtdb.firebaseio.com/tugas/${id}.json${token}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(assignment)
            });

            if (!response.ok) {
                throw new Error("Failed to update assignment");
            }

            navigate("/assignment");
        } catch (err) {
            console.log(err.message);
        }
    };

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="container-box text-body1">
            <div className="flex gap-2 items-center">
                <NavLink to="/assignment">
                    <BackIcon className="text-onBackground fill-current" />
                </NavLink>
                <h1 className="text-subtitle2 text-onBackground">Update Assignment</h1>
            </div>
            <div className="space-y-4">
                <input
                    type="text"
                    name="nama_tugas"
                    value={assignment.nama_tugas}
                    onChange={handleChange}
                    placeholder="Nama Tugas"
                    className="form-input"
                />
                <input
                    type="date"
                    name="deadline"
                    value={assignment.deadline}
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="text"
                    name="tags"
                    value={assignment.tags.join(", ")}
                    onChange={handleChange}
                    placeholder="Tags (pisahkan dengan koma)"
                    className="form-input"
                />
                <select
                    name="priority"
                    value={assignment.priority}
                    onChange={handleChange}
                    className="form-input"
                >
                    <option value="easy">Easy</option>
                    <option value="normal">Normal</option>
                    <option value="hard">Hard</option>
                </select>
                <textarea
                    name="description"
                    value={assignment.description}
                    onChange={handleChange}
                    placeholder="Deskripsi"
                    className="form-input h-32"
                />
                <button onClick={handleSubmit} className="w-full bg-primary text-background p-3 rounded-md">
                    <p className="text-button text-background text-center">Update</p>
                </button>
            </div>
        </div>
    );
}

export default UpdateAssignment;

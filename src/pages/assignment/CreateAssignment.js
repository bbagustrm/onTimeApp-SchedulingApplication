import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { NavLink } from "react-router-dom";
import { ReactComponent as BackIcon } from '../../assets/ic-arrow-left.svg';


function CreateAssignment() {
    const token = "?auth=kCScjmp3OSNBh2EstclolWV3jduOQ7EocsdbWqvL";
    const user_id = localStorage.getItem('userKey');
    const navigate = useNavigate();
    const [newAssignment, setNewAssignment] = useState({
        nama_tugas: "",
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

    const handleSubmit = async () => {
        try {
            const assignmentWithUserId = { ...newAssignment, user_id };
            const response = await fetch("https://restapi-3bfde-default-rtdb.firebaseio.com/tugas.json" + token, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(assignmentWithUserId)
            });

            if (!response.ok) {
                throw new Error("Failed to create tugas");
            }

            navigate("/assignment");
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="container-box2 text-body1">
            <div className="flex gap-2 items-center">
                <NavLink to="/assignment">
                    <BackIcon className="text-onBackground fill-current" />
                </NavLink>
                <h1 className="text-subtitle2 text-onBackground">Create New Assignment</h1>
            </div>
            <div className="space-y-4">
                <input
                    type="text"
                    name="nama_tugas"
                    placeholder="Nama Tugas"
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="date"
                    name="deadline"
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="text"
                    name="tags"
                    placeholder="Tags (pisahkan dengan koma)"
                    onChange={handleChange}
                    className="form-input"
                />
                <select
                    name="priority"
                    onChange={handleChange}
                    className="form-input"
                >
                    <option value="easy" className="text-body2">Easy</option>
                    <option value="normal" className="text-body2">Normal</option>
                    <option value="hard" className="text-body2">Hard</option>
                </select>
                <textarea
                    name="description"
                    placeholder="Deskripsi"
                    onChange={handleChange}
                    className="form-input h-32"
                />
                <button onClick={handleSubmit} className="w-full bg-primary text-background p-3 rounded-md">
                    <p className="text-button text-background text-center">submit</p>
                </button>
            </div>
        </div>
    );
}

export default CreateAssignment;

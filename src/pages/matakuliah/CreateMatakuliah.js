import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ReactComponent as BackIcon } from '../../assets/ic-arrow-left.svg';


function CreateMatakuliah() {
    const token = "?auth=kCScjmp3OSNBh2EstclolWV3jduOQ7EocsdbWqvL";
    const user_id = "-OBZ3bUE2zRmeX90l-ws";
    const navigate = useNavigate();
    const [newMatakuliah, setNewMatakuliah] = useState({
        nama_matkul: "",
        hari: "Senin",
        start_jam: "",
        end_jam: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewMatakuliah((prev) => ({
            ...prev, [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const assignmentWithUserId = { ...newMatakuliah, user_id };
            const response = await fetch("https://restapi-3bfde-default-rtdb.firebaseio.com/matakuliah.json" + token, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(assignmentWithUserId)
            });

            if (!response.ok) {
                throw new Error("Failed to create tugas");
            }

            navigate("/matakuliah");
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="container-box2 text-body1">
            <div className="flex gap-2 items-center">
                <NavLink to="/matakuliah">
                    <BackIcon className="text-onBackground fill-current" />
                </NavLink>
                <h1 className="text-subtitle2 text-onBackground">Create New Matakuliah</h1>
            </div>
            <div className="space-y-4">
                <input
                    type="text"
                    name="nama_matkul"
                    placeholder="Nama Matakuliah"
                    onChange={handleChange}
                    className="form-input"
                />
                <select
                    name="hari"
                    onChange={handleChange}
                    className="form-input"
                >
                    <option value="Senin" className="text-body2">Senin</option>
                    <option value="Selasa" className="text-body2">Selasa</option>
                    <option value="Rabu" className="text-body2">Rabu</option>
                    <option value="Kamis" className="text-body2">Kamis</option>
                    <option value="Jumat" className="text-body2">Jumat</option>
                    <option value="Sabtu" className="text-body2">Sabtu</option>
                    <option value="Minggu" className="text-body2">Minggu</option>
                </select>
                <input
                    type="time"
                    name="start_jam"
                    onChange={handleChange}
                    className="form-input"
                    required
                />
                <input
                    type="time"
                    name="end_jam"
                    onChange={handleChange}
                    className="form-input"
                    required
                />
                <button onClick={handleSubmit} className="w-full bg-primary text-background p-3 rounded-md">
                    <p className="text-button text-background text-center">submit</p>
                </button>
            </div>
        </div>
    );
}

export default CreateMatakuliah;

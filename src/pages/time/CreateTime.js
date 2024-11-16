import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { ReactComponent as BackIcon } from '../../assets/ic-arrow-left.svg';

function CreateTime() {
    const token = "?auth=kCScjmp3OSNBh2EstclolWV3jduOQ7EocsdbWqvL";
    const user_id = "-OBZ3bUE2zRmeX90l-ws";
    const navigate = useNavigate();

    const [newTime, setNewTime] = useState({
        tugas_id: "",
        user_id: "",
        status: false,
        start_jam: "",
        end_jam: ""
    });

    const [tugasList, setTugasList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTugas = async () => {
            try {
                const response = await fetch("https://restapi-3bfde-default-rtdb.firebaseio.com/tugas.json" + token);
                if (!response.ok) {
                    throw new Error("Gagal mengambil data tugas");
                }
                const data = await response.json();
                const tugasArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                })).filter((assignment) => assignment.user_id === user_id);
                
                setTugasList(tugasArray);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchTugas();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTime((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const timeWithUserId = { ...newTime, user_id };
            const response = await fetch(
                "https://restapi-3bfde-default-rtdb.firebaseio.com/time.json" + token,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(timeWithUserId),
                }
            );

            if (!response.ok) {
                throw new Error("Gagal membuat time");
            }

            navigate("/");
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="container-box2 text-body1">
            <div className="flex gap-2 items-center">
                <NavLink to="/">
                    <BackIcon className="text-onBackground fill-current" />
                </NavLink>
                <h1 className="text-subtitle2 text-onBackground">Create Your Time</h1>
            </div>
            <div className="space-y-4">
                {error && <p className="text-red-500">{error}</p>}
                <select
                    name="tugas_id"
                    value={newTime.tugas_id}
                    onChange={handleChange}
                    className="form-input"
                    required
                >
                    <option value="">Pilih Tugas</option>
                    {tugasList.map((tugas) => (
                        <option key={tugas.id} value={tugas.id}>
                            {tugas.nama_tugas}
                        </option>
                    ))}
                </select>
                <div className="flex gap-3 items-center">
                    <input
                        type="time"
                        name="start_jam"
                        value={newTime.start_jam}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <p className="text-body1 text-onBackground">-</p>
                    <input
                        type="time"
                        name="end_jam"
                        value={newTime.end_jam}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full bg-primary text-background p-3 rounded-md"
                >
                    <p className="text-button text-background text-center">Submit</p>
                </button>
            </div>
        </div>
    );
}

export default CreateTime;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { ReactComponent as BackIcon } from "../../assets/ic-arrow-left.svg";

function UpdateTime() {
    const token = "?auth=kCScjmp3OSNBh2EstclolWV3jduOQ7EocsdbWqvL";
    const { id } = useParams();
    const navigate = useNavigate();
    const user_id = localStorage.getItem('userKey');

    const [timeData, setTimeData] = useState({
        tugas_id: "",
        user_id: user_id,
        status: false,
        start_jam: "",
        end_jam: "",
    });

    const [tugasList, setTugasList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data tugas untuk dropdown
        const fetchTugas = async () => {
            try {
                const response = await fetch(
                    "https://restapi-3bfde-default-rtdb.firebaseio.com/tugas.json" + token
                );
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

        // Fetch data time untuk form
        const fetchTimeData = async () => {
            try {
                const response = await fetch(
                    `https://restapi-3bfde-default-rtdb.firebaseio.com/time/${id}.json` + token
                );
                if (!response.ok) {
                    throw new Error("Gagal mengambil data time");
                }
                const data = await response.json();
                setTimeData({
                    tugas_id: data.tugas_id || "",
                    user_id: data.user_id || user_id,
                    status: data.status || false,
                    start_jam: data.start_jam || "",
                    end_jam: data.end_jam || "",
                });
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTugas();
        fetchTimeData();
    }, [id, user_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTimeData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(
                `https://restapi-3bfde-default-rtdb.firebaseio.com/time/${id}.json` + token,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(timeData),
                }
            );

            if (!response.ok) {
                throw new Error("Gagal mengupdate time");
            }

            navigate("/");
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
        <div className="container-box2 text-body1">
            <div className="flex gap-2 items-center">
                <NavLink to="/">
                    <BackIcon className="text-onBackground fill-current" />
                </NavLink>
                <h1 className="text-subtitle2 text-onBackground">Update Time</h1>
            </div>
            <div className="space-y-4">
                <select
                    name="tugas_id"
                    value={timeData.tugas_id}
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
                        value={timeData.start_jam}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <p className="text-body1 text-onBackground">-</p>
                    <input
                        type="time"
                        name="end_jam"
                        value={timeData.end_jam}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full bg-primary text-background p-3 rounded-md"
                >
                    <p className="text-button text-background text-center">Update</p>
                </button>
            </div>
        </div>
    );
}

export default UpdateTime;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { ReactComponent as BackIcon } from '../../assets/ic-arrow-left.svg';

function UpdateMatakuliah() {
    const token = "?auth=kCScjmp3OSNBh2EstclolWV3jduOQ7EocsdbWqvL";
    const { id } = useParams();
    const navigate = useNavigate();
    const user_id = "-OBZ3bUE2zRmeX90l-ws";
    const [matakuliah, setMatakuliah] = useState({
        nama_matkul: "",
        hari: "Senin",
        start_jam: "",
        end_jam: "",
        user_id: user_id
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatakuliah = async () => {
            try {
                const response = await fetch(`https://restapi-3bfde-default-rtdb.firebaseio.com/matakuliah/${id}.json${token}`);
                if (!response.ok) {
                    throw new Error("Gagal mengambil data matakuliah");
                }
                const data = await response.json();
                setMatakuliah({
                    nama_matkul: data.nama_matkul || "",
                    hari: data.hari || "Senin",
                    start_jam: data.start_jam || "",
                    end_jam: data.end_jam || "",
                    user_id: user_id
                });
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchMatakuliah();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMatakuliah((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`https://restapi-3bfde-default-rtdb.firebaseio.com/matakuliah/${id}.json${token}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(matakuliah)
            });

            if (!response.ok) {
                throw new Error("Gagal memperbarui matakuliah");
            }

            navigate("/matakuliah");
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
                <NavLink to="/matakuliah">
                    <BackIcon className="text-onBackground fill-current" />
                </NavLink>
                <h1 className="text-subtitle2 text-onBackground">Update Matakuliah</h1>
            </div>
            <div className="space-y-4">
                <input
                    type="text"
                    name="nama_matkul"
                    value={matakuliah.nama_matkul}
                    onChange={handleChange}
                    placeholder="Nama Matakuliah"
                    className="form-input"
                />
                <select
                    name="hari"
                    value={matakuliah.hari}
                    onChange={handleChange}
                    className="form-input"
                >
                    <option value="Senin">Senin</option>
                    <option value="Selasa">Selasa</option>
                    <option value="Rabu">Rabu</option>
                    <option value="Kamis">Kamis</option>
                    <option value="Jumat">Jumat</option>
                    <option value="Sabtu">Sabtu</option>
                    <option value="Minggu">Minggu</option>
                </select>
                <input
                    type="time"
                    name="start_jam"
                    onChange={handleChange}
                    value={matakuliah.start_jam}
                    className="form-input"
                    required
                />
                <input
                    type="time"
                    name="end_jam"
                    onChange={handleChange}
                    value={matakuliah.end_jam}
                    className="form-input"
                    required
                />
                <button onClick={handleSubmit} className="w-full bg-primary text-background p-3 rounded-md">
                    <p className="text-button text-background text-center">Update</p>
                </button>
            </div>
        </div>
    );
}

export default UpdateMatakuliah;

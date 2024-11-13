import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CardAssignment() {
    const [matakuliah, setMatakuliah] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = "?auth=kCScjmp3OSNBh2EstclolWV3jduOQ7EocsdbWqvL";
    const user_id = "-OBZ3bUE2zRmeX90l-ws";

    useEffect(() => {
        const fetchMatakuliah = async () => {
            try {
                const response = await fetch("https://restapi-3bfde-default-rtdb.firebaseio.com/matakuliah.json" + token);
                if (!response.ok) {
                    throw new Error("Gagal mengambil data matakuliah");
                }
                const data = await response.json();

                const matakuliahArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key]
                }))
                .filter((assignment) => assignment.user_id === user_id);

                setMatakuliah(matakuliahArray);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMatakuliah();
    }, []);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="space-y-4">
            {matakuliah.map((matakuliah) => (
                <div
                    key={matakuliah.id}
                    className="bg-surface w-full p-4 rounded-md space-y-2 cursor-pointer"
                    onClick={() => navigate(`/detail-matakuliah/${matakuliah.id}`)}
                >
                    <h1 className="text-onBackground text-subtitle2">{matakuliah.nama_matkul}</h1>
                    <p className="text-onSurface text-body1">{matakuliah.hari}|{matakuliah.jam} </p>
                </div>
            ))}
        </div>
    );
}

export default CardAssignment;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as TrashIcon } from '../assets/ic-trash.svg';
import { ReactComponent as ClockIcon } from '../assets/ic-clock-mini.svg';

function CardMatakuliah() {
    const [matakuliah, setMatakuliah] = useState([]);
    const [selectedMatakuliah, setSelectedMatakuliah] = useState([]);
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
                    .filter((matkul) => matkul.user_id === user_id);

                setMatakuliah(matakuliahArray);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMatakuliah();
    }, []);

    const handleSelect = (id) => {
        setSelectedMatakuliah((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((matkulId) => matkulId !== id)
                : [...prevSelected, id]
        );
    };

    const handleDelete = async () => {
        try {
            await Promise.all(
                selectedMatakuliah.map(async (id) => {
                    await fetch(`https://restapi-3bfde-default-rtdb.firebaseio.com/matakuliah/${id}.json${token}`, {
                        method: "DELETE"
                    });
                })
            );
            setMatakuliah(matakuliah.filter((matkul) => !selectedMatakuliah.includes(matkul.id)));
            setSelectedMatakuliah([]);
        } catch (err) {
            setError("Gagal menghapus matakuliah yang dipilih");
        }
    };

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="space-y-4">
            {/* Floating Delete Button */}
            {selectedMatakuliah.length > 0 && (
                <div className="flex justify-end mb-2">
                    <button
                        onClick={handleDelete}
                        className="absolute z-20 top-4 right-4 hover:opacity-90 border-2 border-error text-white p-2 rounded-full transition"
                    >
                        <TrashIcon />
                    </button>
                </div>
            )}
            {matakuliah.map((matkul) => (
                <div
                    key={matkul.id}
                    className={`bg-surface w-full p-4 rounded-md space-y-2 cursor-pointer`}
                >
                    <div className="flex gap-6 items-center w-full">
                        <input
                            type="checkbox"
                            checked={selectedMatakuliah.includes(matkul.id)}
                            onChange={() => handleSelect(matkul.id)}
                            className="form-checkbox appearance-none w-5 h-[17px] rounded-sm ml-2 border-2 border-gray-400 checked:bg-primary checked:border-surface checked:ring-2 checked:ring-onBackground transition-all duration-300 cursor-pointer"
                        />
                        <div onClick={() => navigate(`/update-matakuliah/${matkul.id}`)} className="w-full space-y-2">
                            <h1 className="text-onBackground text-subtitle2">{matkul.nama_matkul}</h1>
                            <div className="flex gap-2 items-center">
                                <ClockIcon />
                                <p className="text-onSurface text-body1"> {matkul.hari} | {matkul.start_jam} - {matkul.end_jam}</p>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardMatakuliah;

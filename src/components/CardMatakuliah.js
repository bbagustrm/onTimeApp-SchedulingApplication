import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as TrashIcon } from "../assets/ic-trash.svg";
import { ReactComponent as ClockIcon } from "../assets/ic-clock-mini.svg";
import useLongPress from "./useLongPress"; // Import custom hook

// Komponen untuk setiap Card
const CardItem = ({
    matkul,
    isSelectMode,
    selected,
    onLongPress,
    onSelect,
    onClick,
}) => {
    const longPressEvent = useLongPress(onLongPress, 500);

    return (
        <div
            className="bg-surface w-full p-4 rounded-md space-y-2 cursor-pointer"
            {...longPressEvent} // Tambahkan event long-press
        >
            <div className="flex gap-6 items-center w-full">
                {isSelectMode && (
                    <input
                        type="checkbox"
                        checked={selected}
                        onChange={onSelect}
                        className="form-checkbox appearance-none w-4 h-4 rounded-sm ml-2 border-2 border-gray-400 checked:bg-primary checked:border-surface checked:ring-2 checked:ring-onBackground transition-all duration-300 cursor-pointer"
                    />
                )}
                <div
                    onClick={onClick}
                    className="w-10/12 space-y-2"
                >
                    <h1 className="text-onBackground text-subtitle2">{matkul.nama_matkul}</h1>
                    <div className="flex gap-2 items-center">
                        <ClockIcon />
                        <p className="text-onSurface text-body1">
                            {matkul.hari} | {matkul.start_jam} - {matkul.end_jam}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

function CardMatakuliah() {
    const [matakuliah, setMatakuliah] = useState([]);
    const [selectedMatakuliah, setSelectedMatakuliah] = useState([]);
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = "?auth=kCScjmp3OSNBh2EstclolWV3jduOQ7EocsdbWqvL";
    const user_id = "-OBZ3bUE2zRmeX90l-ws";

    useEffect(() => {
        const fetchMatakuliah = async () => {
            try {
                const response = await fetch(
                    "https://restapi-3bfde-default-rtdb.firebaseio.com/matakuliah.json" +
                        token
                );
                if (!response.ok) {
                    throw new Error("Gagal mengambil data matakuliah");
                }
                const data = await response.json();

                const matakuliahArray = Object.keys(data)
                    .map((key) => ({
                        id: key,
                        ...data[key],
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
        setSelectedMatakuliah((prevSelected) => {
            const newSelected = prevSelected.includes(id)
                ? prevSelected.filter((matkulId) => matkulId !== id)
                : [...prevSelected, id];

            // Matikan mode select jika tidak ada item yang dipilih
            if (newSelected.length === 0) {
                setIsSelectMode(false);
            }

            return newSelected;
        });
    };

    const handleDelete = async () => {
        try {
            await Promise.all(
                selectedMatakuliah.map(async (id) => {
                    await fetch(
                        `https://restapi-3bfde-default-rtdb.firebaseio.com/matakuliah/${id}.json${token}`,
                        {
                            method: "DELETE",
                        }
                    );
                })
            );
            setMatakuliah(
                matakuliah.filter(
                    (matkul) => !selectedMatakuliah.includes(matkul.id)
                )
            );
            setSelectedMatakuliah([]);
            setIsSelectMode(false); // Tutup mode select setelah delete
        } catch (err) {
            setError("Gagal menghapus matakuliah yang dipilih");
        }
    };

    const enableSelectMode = (id) => {
        setIsSelectMode(true);
        handleSelect(id);
    };

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return (
            <p className="text-center text-red-500">Error: {error}</p>
        );
    }

    return (
        <div className="space-y-4">
            {/* Floating Delete Button */}
            {isSelectMode && selectedMatakuliah.length > 0 && (
                <div className="flex justify-end mb-2">
                    <button
                        onClick={handleDelete}
                        className="fixed z-20 top-4 right-4 hover:opacity-90 border-2 border-error text-white p-2 rounded-full transition"
                    >
                        <TrashIcon />
                    </button>
                </div>
            )}
            {matakuliah.map((matkul) => (
                <CardItem
                    key={matkul.id}
                    matkul={matkul}
                    isSelectMode={isSelectMode}
                    selected={selectedMatakuliah.includes(matkul.id)}
                    onLongPress={() => enableSelectMode(matkul.id)}
                    onSelect={() => handleSelect(matkul.id)}
                    onClick={() =>
                        !isSelectMode &&
                        navigate(`/update-matakuliah/${matkul.id}`)
                    }
                />
            ))}
        </div>
    );
}

export default CardMatakuliah;

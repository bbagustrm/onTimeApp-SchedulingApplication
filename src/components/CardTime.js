import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as TrashIcon } from '../assets/ic-trash.svg';
import { ReactComponent as ClockIcon } from '../assets/ic-clock-mini.svg';
import useLongPress from './useLongPress';

function getPriorityColor(priority) {
    switch (priority) {
        case "hard":
            return "bg-error";
        case "normal":
            return "bg-warning";
        case "easy":
            return "bg-success";
        default:
            return "bg-gray-400";
    }
}

function CardTime() {
    const [times, setTimes] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = "?auth=kCScjmp3OSNBh2EstclolWV3jduOQ7EocsdbWqvL";
    const user_id = "-OBZ3bUE2zRmeX90l-ws";

    useEffect(() => {
        const fetchTimes = async () => {
            try {
                const response = await fetch("https://restapi-3bfde-default-rtdb.firebaseio.com/time.json" + token);
                if (!response.ok) {
                    throw new Error("Gagal mengambil data time");
                }
                const data = await response.json();

                const timesArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key]
                })).filter((time) => time.user_id === user_id);

                // Ambil data tugas terkait dengan tugas_id
                const fetchTugasData = async (tugas_id) => {
                    const tugasResponse = await fetch(`https://restapi-3bfde-default-rtdb.firebaseio.com/tugas/${tugas_id}.json${token}`);
                    if (!tugasResponse.ok) {
                        throw new Error("Gagal mengambil data tugas");
                    }
                    return await tugasResponse.json();
                };

                const updatedTimes = await Promise.all(timesArray.map(async (time) => {
                    const tugasData = await fetchTugasData(time.tugas_id);
                    return { ...time, tugasData }; // Menambahkan data tugas ke time
                }));
                setTimes(updatedTimes);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTimes();
    }, []);

    console.log(times);
    const handleStatusToggle = async (time) => {
        try {
            const updatedTime = { ...time, status: !time.status };
            await fetch(`https://restapi-3bfde-default-rtdb.firebaseio.com/time/${time.id}.json${token}`, {
                method: "PATCH",
                body: JSON.stringify({ status: updatedTime.status })
            });
            setTimes((prev) =>
                prev.map((item) => (item.id === time.id ? updatedTime : item))
            );
        } catch (err) {
            setError("Gagal mengubah status tugas");
        }
    };


    const handleDelete = async () => {
        try {
            await Promise.all(
                selectedTimes.map(async (id) => {
                    await fetch(`https://restapi-3bfde-default-rtdb.firebaseio.com/time/${id}.json${token}`, {
                        method: "DELETE"
                    });
                })
            );
            setTimes(times.filter((time) => !selectedTimes.includes(time.id)));
            setSelectedTimes([]);
            setIsDeleteMode(false);
        } catch (err) {
            setError("Gagal menghapus times yang dipilih");
        }
    };

    const handleSelect = (id) => {
        setSelectedTimes((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((timeId) => timeId !== id)
                : [...prevSelected, id]
        );
    };

    const longPress = (timeId) => {
        setIsDeleteMode(true);
        setSelectedTimes([timeId]);
    };

    const longPressProps = useLongPress(() => longPress(), 500);

    useEffect(() => {
        if (selectedTimes.length === 0) {
            setIsDeleteMode(false);
        }
    }, [selectedTimes]);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="space-y-4">
            {isDeleteMode && selectedTimes.length > 0 && (
                <div className="flex justify-end mb-2">
                    <button
                        onClick={handleDelete}
                        className="absolute z-20 top-4 right-4 hover:opacity-90 border-2 border-error text-white p-2 rounded-full transition"
                    >
                        <TrashIcon />
                    </button>
                </div>
            )}
            {times.map((time) => (
                <div className="space-y-3 pb-2">
                    <div className="flex gap-2">
                        <ClockIcon />
                        <h1 className="text-subtitle1 text-onSurface">{time.start_jam} - {time.end_jam}</h1>
                    </div>
                    <div
                        key={time.id}
                        className={`flex justify-between bg-surface w-full overflow-hidden rounded-lg cursor-pointer transition-opacity ${time.status ? "opacity-50" : "opacity-100"}`}
                        {...longPressProps}
                    >
                        <div className={`w-6 h-fill ${getPriorityColor(time.tugasData.priority)}`}></div>
                        <div className="flex items-center p-4 w-full justify-between gap-6">
                            <div className="flex gap-6 items-center w-10/12">
                                {isDeleteMode && (
                                    <input
                                        type="checkbox"
                                        checked={selectedTimes.includes(time.id)}
                                        onChange={() => handleSelect(time.id)}
                                        className="form-checkbox appearance-none w-4 h-4 rounded-sm ml-2 border-2 border-gray-400 checked:bg-primary checked:border-surface checked:ring-2 checked:ring-onBackground transition-all duration-300 cursor-pointer"
                                    />
                                )}
                                <div onClick={() => navigate(`/update-time/${time.id}`)} className="w-8/12 space-y-2">
                                    <h1 className="text-onBackground text-subtitle2">{time.tugasData.nama_tugas}</h1>
                                    <p className="text-onSurface text-body1">{time.tugasData.description}</p>
                                    <div className="flex gap-2">
                                        {time.tugasData.tags && time.tugasData.tags.map((tag, index) => (
                                            <span key={`${tag}-${index}`} className="text-overline py-2 px-3 h-full rounded-full bg-surface2 text-primary">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={time.status}
                                onChange={() => handleStatusToggle(time)}
                                className="form-checkbox appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-primary checked:border-surface checked:ring-2 checked:ring-onBackground transition-all duration-300 cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="w-full py-2">
                        <div className="w-full h-[3px] rounded-full bg-surface2 my-2"></div>

                    </div>
                </div>
            ))}

        </div>
    );
}

export default CardTime;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

function Profile() {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="container-box">
            <Navigation />
            <div className="flex flex-col gap-4 justify-between text-onBackground bg-background">
                <div className='w-full flex flex-col gap-2'>
                    <div className="p-3 bg-surface rounded-md">
                        <p className="text-gray-400 text-caption mb-1">Username</p>
                        <p className="text-subtitle2">{username}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 py-3 rounded text-white hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </div>

    );
}

export default Profile;

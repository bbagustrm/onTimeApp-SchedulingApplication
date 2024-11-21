import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const token = "?auth=kCScjmp3OSNBh2EstclolWV3jduOQ7EocsdbWqvL";
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const newUser = { username, password };
            const response = await fetch(
                'https://restapi-3bfde-default-rtdb.firebaseio.com/users.json' + token,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser),
                }
            );

            if (response.ok) {
                const result = await response.json(); 

                localStorage.setItem('isAuthenticated', true);
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                localStorage.setItem('userKey', result.name);

                alert('Registration successful! Redirecting to Home...');
                navigate('/'); // Arahkan ke halaman Home
            } else {
                throw new Error('Failed to register');
            }
        } catch (err) {
            setError('Failed to register. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-background">
            <form onSubmit={handleRegister} className="bg-surface text-white p-6 rounded-md shadow-md w-80">
                <h2 className="text-headline2 mb-6">Register</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 rounded bg-surface2 text-white text-subtitle1 border-none focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="mb-4 relative flex items-center">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded bg-surface2 text-white text-subtitle1 border-none focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-[18px] right-3 cursor-pointer text-sm text-primary text-overline"
                    >
                        {showPassword ? 'hide' : 'show'}
                    </span>
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-primary py-3 rounded-full text-button hover:bg-[#5c417c] transition"
                >
                    Register
                </button>
                <p className="text-sm text-center mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Register;

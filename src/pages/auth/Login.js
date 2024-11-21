import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const token = "?auth=kCScjmp3OSNBh2EstclolWV3jduOQ7EocsdbWqvL";
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://restapi-3bfde-default-rtdb.firebaseio.com/users.json' + token);
      const data = await response.json();

      const userEntry = Object.entries(data).find(
        ([key, user]) => user.username === username && user.password === password
      );

      if (userEntry) {
        const [userKey, userDetails] = userEntry; // Ambil key dan detail pengguna

        // Simpan informasi autentikasi ke localStorage
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('username', userDetails.username);
        localStorage.setItem('password', userDetails.password);
        localStorage.setItem('userKey', userKey);

        alert('Login successful!');
        navigate('/'); // Arahkan ke halaman Home
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <form onSubmit={handleLogin} className="bg-surface text-white p-6 rounded-md shadow-md w-80">
        <h2 className="text-headline2 mb-6">Login</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded bg-surface2 text-white text-subtitle1 border-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4 relative">
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
          Login
        </button>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

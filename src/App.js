import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/time/Home';
import CreateTime from './pages/time/CreateTime';
import UpdateTime from './pages/time/UpdateTime';
import Assignment from './pages/assignment/Assignment';
import CreateAssignment from './pages/assignment/CreateAssignment';
import UpdateAssignment from './pages/assignment/UpdateAssignment';
import Matakuliah from './pages/matakuliah/Matakuliah';
import CreateMatakuliah from './pages/matakuliah/CreateMatakuliah';
import UpdateMatakuliah from './pages/matakuliah/UpdateMatakuliah';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <Router>
      <div className="bg-background min-h-[100vh] scroll-smooth">
        <div className="container mx-auto px-6 flex flex-col gap-6 justify-center">
          <Routes>
            {/* Rute Login dan Register */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/create-time" element={
              <PrivateRoute>
                <CreateTime />
              </PrivateRoute>
            } />
            <Route path="/update-time/:id" element={
              <PrivateRoute>
                <UpdateTime />
              </PrivateRoute>
            } />
            <Route path="/assignment" element={
              <PrivateRoute>
                <Assignment />
              </PrivateRoute>
            } />
            <Route path="/create-assignment" element={
              <PrivateRoute>
                <CreateAssignment />
              </PrivateRoute>
            } />
            <Route path="/update-assignment/:id" element={
              <PrivateRoute>
                <UpdateAssignment />
              </PrivateRoute>
            } />
            <Route path="/matakuliah" element={
              <PrivateRoute>
                <Matakuliah />
              </PrivateRoute>
            } />
            <Route path="/create-matakuliah" element={
              <PrivateRoute>
                <CreateMatakuliah />
              </PrivateRoute>
            } />
            <Route path="/update-matakuliah/:id" element={
              <PrivateRoute>
                <UpdateMatakuliah />
              </PrivateRoute>
            } />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

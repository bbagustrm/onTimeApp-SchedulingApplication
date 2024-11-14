import React from 'react';
import Home from './pages/Home';
import CreateTime from './pages/CreateTime';

import Assignment from './pages/assignment/Assignment';
import CreateAssignment from './pages/assignment/CreateAssignment';
import UpdateAssignment from './pages/assignment/UpdateAssignment';

import Matakuliah from './pages/matakuliah/Matakuliah';
import CreateMatakuliah from './pages/matakuliah/CreateMatakuliah';
import UpdateMatakuliah from './pages/matakuliah/UpdateMatakuliah';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="bg-background min-h-[100vh] scroll-smooth ">
        <div className="container mx-auto px-6 flex flex-col gap-6 justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-time" element={<CreateTime />} />

            <Route path="/assignment" element={<Assignment />} />
            <Route path="/create-assignment" element={<CreateAssignment />} />
            <Route path="/update-assignment/:id" element={<UpdateAssignment />} />

            <Route path="/matakuliah" element={<Matakuliah />} />
            <Route path="/create-matakuliah" element={<CreateMatakuliah />} />
            <Route path="/update-matakuliah/:id" element={<UpdateMatakuliah />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

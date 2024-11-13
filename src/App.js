import React from 'react';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import CreateTime from './pages/CreateTime';
import Assignment from './pages/assignment/Assignment';
import CreateAssignment from './pages/assignment/CreateAssignment';
import DetailAssignment from './pages/assignment/DetailAssignment';
import Matakuliah from './pages/matakuliah/Matakuliah';
import CreateMatakuliah from './pages/matakuliah/CreateMatakuliah';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="bg-background min-h-[100vh] ">
        <div className="container mx-auto p-6 flex flex-col gap-6 justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-time" element={<CreateTime />} />
            <Route path="/assignment" element={<Assignment />} />
            <Route path="/create-assignment" element={<CreateAssignment />} />
            <Route path="/detail-assignment/:id" element={<DetailAssignment />} />
            <Route path="/matakuliah" element={<Matakuliah />} />
            <Route path="/create-matakuliah" element={<CreateMatakuliah />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import Home from './pages/Home';
import Assignment from './pages/Assignment';
import Navigation from './components/Navigation';
import CreateTime from './pages/CreateTime';
import CreateAssignment from './pages/CreateAssignment';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="bg-background h-[100vh] ">
        <div className="container mx-auto p-6 flex flex-col gap-6 justify-center">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assignment" element={<Assignment />} />
            <Route path="/create-time" element={<CreateTime />} />
            <Route path="/create-assignment" element={<CreateAssignment />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BlurredText from './components/blur';
import BackendTest from './components/BackendTest';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Login from './pages/login'; 

function App() {
  return (
    <Router>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/test" element={<BackendTest/>}/>
      </Routes>
    </Router>
  );
}

export default App;

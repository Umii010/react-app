import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Text_Form from './components/Text_Form';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Alert from './components/Alert';
import Sidebar from './components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import WordToPdf from './components/WordToPdf';

const AppContent = () => {
  const location = useLocation();
  const [mode, setMode] = useState('light'); // State to manage light/dark mode
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert(null);
    }, 1500); // Hide alert after 1.5 seconds
  };

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      showAlert('Dark mode has been enabled', 'success');
    } else {
      setMode('light');
      showAlert('Light mode has been enabled', 'success');
    }
  };

  return (
    <>
      {location.pathname !== '/dashboard' && <Navbar mode={mode} toggleMode={toggleMode} />}
      <Alert alert={alert} />
      <div className="app-container" style={{ display: 'flex' }}>
        {location.pathname === '/dashboard' && <Sidebar />}
        <div className="content" style={{ flexGrow: 1, padding: '1rem' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/" element={<Navbar />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/text-services" element={<Text_Form />} />
            <Route path="/word-to-pdf" element={<WordToPdf />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

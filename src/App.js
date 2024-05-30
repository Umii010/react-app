import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Text_Form from './components/Text_Form';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
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
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navbar />} />

          {/* Add other routes here */}
        </Routes>
      </Router>

      {/* Uncomment the following code if you want to use Navbar and Text_Form components */}
      {/* 
      <Navbar title="TextUtils" about_text="About" mode={mode} toggleMode={toggleMode} />
      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.msg}
        </div>
      )}
      <div className={`container my-4 bg-${mode}`} style={{ color: mode === 'dark' ? 'white' : 'black' }}>
        <Text_Form mode={mode} showAlert={showAlert} />
      </div>
      */}
    </>
  );
}

export default App;

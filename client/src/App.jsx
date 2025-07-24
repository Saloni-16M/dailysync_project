import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import NewsPage from './pages/NewsPage';
import NotesPage from './pages/NotesPage';
import ProfilePage from './pages/ProfilePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-bootstrap';


function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? stored === 'true' : false;
  });
  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => {
      localStorage.setItem('darkMode', !prev);
      return !prev;
    });
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  return (
    <Router>
      <ToastContainer position="top-end" className="mt-3 me-3" autoClose={3000} />
      <Routes>
        <Route path="/" element={<HomePage isDarkMode={isDarkMode} onToggleDarkMode={handleToggleDarkMode} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage isDarkMode={isDarkMode} onToggleDarkMode={handleToggleDarkMode} />} />
        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <NewsPage isDarkMode={isDarkMode} onToggleDarkMode={handleToggleDarkMode} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesPage isDarkMode={isDarkMode} onToggleDarkMode={handleToggleDarkMode} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Add the CSS for Navbar
import { Dropdown } from 'react-bootstrap';
import { FaNewspaper, FaStickyNote, FaUserCircle } from 'react-icons/fa';

function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

const Navbar = ({ onToggleDarkMode, isDarkMode }) => {
  const token = localStorage.getItem('token');
  const user = parseJwt(token);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-teal">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          DailySync
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link nav-pill-btn d-flex align-items-center gap-2" to="/news">
                <FaNewspaper /> News
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-pill-btn d-flex align-items-center gap-2" to="/notes">
                <FaStickyNote /> Notes
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center ms-3">
              <button className="btn btn-outline-light btn-sm" onClick={onToggleDarkMode}>
                {isDarkMode ? '☀️ Light' : '🌙 Dark'}
              </button>
            </li>
            {/* Divider */}
            <li className="nav-item mx-2" style={{ borderLeft: '1.5px solid #e0e0e0', height: 28 }}></li>
            {/* User dropdown with avatar */}
            {user && (
              <li className="nav-item dropdown ms-2">
                <Dropdown show={showDropdown} onToggle={setShowDropdown} align="end">
                  <Dropdown.Toggle variant="outline-light" id="dropdown-user" className="d-flex align-items-center gap-2">
                    <span className="avatar-navbar d-flex align-items-center justify-content-center">
                      {user.name ? user.name[0].toUpperCase() : <FaUserCircle />}
                    </span>
                    <span className="d-none d-md-inline">{user.name || 'User'}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

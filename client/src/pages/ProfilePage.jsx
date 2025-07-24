import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toast, Spinner } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { FaUser, FaEnvelope, FaLock, FaSave } from 'react-icons/fa';

const ProfilePage = ({ isDarkMode, onToggleDarkMode }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/api/auth/profile', { name, email }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(res.data);
      setToastMessage('Profile updated!');
      setToastVariant('success');
      setShowToast(true);
    } catch (error) {
      setToastMessage(error.response?.data?.error || 'Failed to update profile.');
      setToastVariant('danger');
      setShowToast(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (isLoading) {
    return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}><Spinner animation="border" /></div>;
  }

  if (error) {
    return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>;
  }

  return (
    <>
      <Navbar isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />
      <div className={`container-fluid settings-root${isDarkMode ? ' bg-dark text-light' : ''}`} style={{ minHeight: '90vh', paddingTop: 40 }}>
        <div className="row justify-content-center">
          {/* Sidebar */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <div className={`settings-sidebar p-4 rounded shadow-sm${isDarkMode ? ' bg-secondary text-light' : ' bg-white'}`}
                 style={{ minHeight: 300 }}>
              <div className="sidebar-section mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="avatar-circle bg-teal text-white d-flex align-items-center justify-content-center" style={{ width: 56, height: 56, borderRadius: '50%', fontSize: 28, fontWeight: 700 }}>
                    {user?.name ? user.name[0].toUpperCase() : <FaUser />}
                  </div>
                  <div>
                    <div className="fw-bold" style={{ fontSize: 18 }}>{user?.name}</div>
                    <div className="text-muted small"><FaEnvelope className="me-1" />{user?.email}</div>
                  </div>
                </div>
              </div>
              <div className="sidebar-links mt-4">
                <div className="fw-bold mb-2 text-teal">Settings</div>
                <ul className="list-unstyled">
                  <li className="mb-2"><span className="text-teal"><FaUser className="me-2" /></span>Profile</li>
                  <li className="mb-2 text-muted"><span className="me-2"><FaLock /></span>Security</li>
                  <li className="mb-2 text-muted"><span className="me-2"><FaEnvelope /></span>Notifications</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="col-12 col-md-7">
            <div className={`settings-card p-4 rounded shadow-sm${isDarkMode ? ' bg-secondary text-light' : ' bg-white'}`}
                 style={{ minHeight: 300 }}>
              <div className="mb-4 border-bottom pb-2">
                <h4 className="fw-bold mb-0">Profile Settings</h4>
                <div className="text-muted small">Update your personal information</div>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaUser /></span>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaEnvelope /></span>
                    <input type="email" className="form-control" value={email} disabled />
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-teal px-4 py-2 d-flex align-items-center gap-2" style={{ fontWeight: 600, fontSize: 16 }}>
                    <FaSave /> Save Changes
                  </button>
                </div>
              </form>
              <hr className="my-4" />
              <div className="account-actions mt-4">
                <div className="mb-3 fw-bold text-danger">Account</div>
                <button className="btn btn-outline-danger w-100 py-2 d-flex align-items-center justify-content-center gap-2" style={{ fontWeight: 600, fontSize: 16 }} onClick={handleLogout} type="button">
                  <FaLock /> Logout
                </button>
              </div>
            </div>
            <Toast show={showToast} onClose={() => setShowToast(false)} bg={toastVariant} delay={2000} autohide style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
              <Toast.Body className="text-white">{toastMessage}</Toast.Body>
            </Toast>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage; 
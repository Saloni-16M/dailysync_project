import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import { Toast } from 'react-bootstrap';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(`${apiUrl}/auth/register`, form);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#e6f4f1', minHeight: '100vh' }}>
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }}>
        <h3 className="text-center text-teal mb-4">Create Your Account</h3>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <input 
            type="text" 
            className="form-control mb-3" 
            placeholder="Name" 
            onChange={e => setForm({ ...form, name: e.target.value })} 
            required
          />
          
          {/* Email Input */}
          <input 
            type="email" 
            className="form-control mb-3" 
            placeholder="Email" 
            onChange={e => setForm({ ...form, email: e.target.value })} 
            required
          />
          
          {/* Password Input */}
          <input 
            type="password" 
            className="form-control mb-3" 
            placeholder="Password" 
            onChange={e => setForm({ ...form, password: e.target.value })} 
            required
          />
          {/* Error Message */}
          {error && <div className="alert alert-danger mb-3" role="alert">{error}</div>}
          {/* Submit Button */}
          <button type="submit" className="btn btn-teal w-100 mb-3" style={{ backgroundColor: '#008080', color: 'white', border: 'none', padding: '14px 20px', fontSize: '16px', fontWeight: 'bold', borderRadius: '5px' }}>Register</button>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <p>Already have an account? <a href="/login" className="text-teal" >Login here</a></p>
        </div>
        {/* Success Toast */}
        <Toast show={showToast} onClose={() => setShowToast(false)} bg="success" delay={2000} autohide style={{ position: 'absolute', top: 10, right: 10 }}>
          <Toast.Body className="text-white">Registered successfully! Redirecting to login...</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default RegisterPage;

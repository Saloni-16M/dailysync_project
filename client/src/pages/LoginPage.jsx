import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import isTokenExpired from '../utils/isTokenExpired';
import { Toast } from 'react-bootstrap';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  // Check if token already exists and redirect to the news page
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isTokenExpired()) {
      navigate('/news'); // If the token exists and is valid, redirect to the NewsPage
    }
  }, [navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, form);
      localStorage.setItem('token', res.data.token);
      setToastMessage('Login successful! Redirecting...');
      setToastVariant('success');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate('/news');
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data && error.response.data.error) {
        setToastMessage(error.response.data.error);
      } else {
        setToastMessage('Login failed. Please check your credentials.');
      }
      setToastVariant('danger');
      setShowToast(true);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#e6f4f1', minHeight: '100vh' }}>
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '8px', position: 'relative' }}>
        <h3 className="text-center text-teal mb-4">Login to Your Account</h3>
        <form onSubmit={handleSubmit}>
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
          {/* Error Message (hidden, replaced by toast) */}
          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn btn-teal w-100 mb-3" 
            disabled={isLoading}
            style={{ backgroundColor: '#008080', color: 'white', border: 'none', padding: '14px 20px', fontSize: '16px', fontWeight: 'bold', borderRadius: '5px' }}
          >
            {isLoading ? 'Logging In...' : 'Login'}
          </button>
        </form>
        {/* Forgot Password Link */}
        <div className="text-center">
          <p><a href="/forgot-password" className="text-teal" >Forgot your password?</a></p>
        </div>
        {/* Register Link */}
        <div className="text-center">
          <p>Don't have an account? <a href="/register" className="text-teal">Register here</a></p>
        </div>
        {/* Toast Feedback */}
        <Toast show={showToast} onClose={() => setShowToast(false)} bg={toastVariant} delay={2000} autohide style={{ position: 'absolute', top: 10, right: 10 }}>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default LoginPage;

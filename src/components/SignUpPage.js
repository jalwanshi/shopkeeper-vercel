import React, { useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaBriefcase, FaLock, FaEye, FaEyeSlash,FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../Firebase'; // Ensure Firebase is correctly configured and exported
import '../global.css';
const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessType: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setMessageType('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const snapshot = await db.ref('Admin').orderByChild('username').equalTo(formData.username).once('value');

      if (snapshot.exists()) {
        setError('Username already exists.');
      } else {
        const newUserRef = db.ref('Admin').push();
        await newUserRef.set({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          businessType: formData.businessType,
          username: formData.username,
          password: formData.password,
          status: 'Pending'
        });
        setMessage('Sign Up successful! Wait for approval.');
        setMessageType('success');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card" style={{background: 'linear-gradient(148deg, rgba(108,89,111,1) 66%, rgba(205,178,186,0.9976365546218487) 100%)', color: 'white'}}>
            <div className="card-body p-5">
              <h5 className="card-title text-center mb-4 text-white display-4 fw-bold">Sign Up</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    <FaUser className="me-2 text-secondary" />
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: '20px', borderColor: '#ced4da' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    <FaPhone className="me-2 text-secondary" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: '20px', borderColor: '#ced4da' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <FaEnvelope className="me-2 text-secondary" />
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: '20px', borderColor: '#ced4da' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="businessType" className="form-label">
                    <FaBriefcase className="me-2 text-secondary" />
                    Business Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: '20px', borderColor: '#ced4da' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    <FaUser className="me-2 text-secondary" />
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: '20px', borderColor: '#ced4da' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <FaLock className="me-2 text-secondary" />
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: '20px 0 0 20px', borderColor: '#ced4da' }}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePasswordVisibility}
                      style={{ borderRadius: '0 20px 20px 0', backgroundColor: '#f8f9fa', borderColor: '#ced4da' }}
                    >
                      {passwordVisible ? <FaEyeSlash style={{ color: '#6c757d' }} /> : <FaEye style={{ color: '#6c757d' }} />}
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    <FaLock className="me-2 text-secondary" />
                    Confirm Password
                  </label>
                  <div className="input-group">
                    <input
                      type={confirmPasswordVisible ? 'text' : 'password'}
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: '20px 0 0 20px', borderColor: '#ced4da' }}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={toggleConfirmPasswordVisibility}
                      style={{ borderRadius: '0 20px 20px 0', backgroundColor: '#f8f9fa', borderColor: '#ced4da' }}
                    >
                      {confirmPasswordVisible ? <FaEyeSlash style={{ color: '#6c757d' }} /> : <FaEye style={{ color: '#6c757d' }} />}
                    </button>
                  </div>
                </div>
                {error && <p className="text-danger text-center">{error}</p>}
                {message && (
                  <p className={`text-center ${messageType === 'warning' ? 'text-warning' : 'text-success'}`}>
                    {message}
                  </p>
                )}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-block" style={{ borderRadius: '20px' }}>Sign Up</button>
                </div>
              </form>
              <p className="mt-3 mb-0 text-center">Already have an account? <Link to="/login" className="text-decoration-none text-primary">Login</Link></p>
            </div>
          
          </div>
          <div className="home-icon-container text-center mt-4">
            <Link to="/pannel">
              <FaHome className="home-icon" />
            </Link>
          </div>
        </div>
       
      </div>
    </div>
    
  );
}

export default SignUpPage;

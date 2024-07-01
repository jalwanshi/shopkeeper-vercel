import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../Firebase'; // Ensure Firebase is correctly configured and exported

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
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

    // Check if the credentials are for the admin user
    if (formData.username === 'Admin' && formData.password === 'Admin123') {
      setMessage('Login successful!');
      setMessageType('success');
      navigate('/admin'); // Redirect to the admin page
      return;
    }

    try {
      // Query Firebase to find the user by username
      const snapshot = await db.ref('Admin').orderByChild('username').equalTo(formData.username).once('value');

      if (snapshot.exists()) {
        const users = snapshot.val();
        const userId = Object.keys(users)[0];
        const user = users[userId];

        if (user.password === formData.password) {
          if (user.status === 'Approved') {
            // Log in the user (Here you can set the user data in local storage or a global state)
            setMessage('Login successful!');
            setMessageType('success');
            navigate(`/home/${userId}`); // Redirect to the home page with userId
          } else {
            setMessage('Wait for approval.');
            setMessageType('warning');
          }
        } else {
          setError('Invalid username or password.');
        }
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card" style={{background: 'linear-gradient(148deg, rgba(108,89,111,1) 66%, rgba(205,178,186,0.9976365546218487) 100%)', color: 'white'}}>
            <div className="card-body p-5">
              <h5 className="card-title text-center mb-4 text-white display-4 fw-bold">Login</h5>
              <form onSubmit={handleSubmit}>
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
                {error && <p className="text-danger text-center">{error}</p>}
                {message && (
                  <p className={`text-center ${messageType === 'warning' ? 'text-warning' : 'text-success'}`}>
                    {message}
                  </p>
                )}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-block" style={{ borderRadius: '20px' }}>Sign in</button>
                </div>
              </form>
              <p className="mt-3 mb-0 text-center">Don't have an account? <Link to="/signup" className="text-decoration-none text-primary">Sign Up</Link></p>
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

export default LoginPage;

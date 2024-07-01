import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CustomerHeader = ({ key1 }) => { // Accept key1 as a prop
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(`/home/${key1}`); // Use navigate instead of window.location.href
  };

  return (
    <header className="bg-gradient py-4 px-3 mb-4 d-flex justify-content-between align-items-center shadow">
      <h1 className="text-white display-4 fw-bold mx-auto">Customer</h1>
      <div className="d-flex align-items-center">
        <button className="btn btn-danger" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" /> Logout
        </button>
      </div>
    </header>
  );
};

export default CustomerHeader;

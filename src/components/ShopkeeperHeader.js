import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShopkeeperHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here, such as clearing local storage or session storage
    // Then navigate to the login page
    navigate('/pannel');
  };

  return (
    <header className="bg-gradient py-4 px-3 mb-4 d-flex justify-content-between align-items-center shadow">
      <h1 className="text-white display-4 fw-bold mx-auto">Shopkeeper</h1>
      <div className="d-flex align-items-center">
        <button className="btn btn-danger" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" /> Logout
        </button>
      </div>
    </header>
  );
};

export default ShopkeeperHeader;

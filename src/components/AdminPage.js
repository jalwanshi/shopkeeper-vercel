import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import Loader from './Loader';
import './Adminpage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await db.ref('Admin').once('value');
        if (snapshot.exists()) {
          const usersData = snapshot.val();
          const usersList = Object.keys(usersData).map(key => ({
            id: key,
            ...usersData[key]
          }));
          setUsers(usersList);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Set a delay of 1 second before hiding the loader
    };

    fetchUsers();
  }, []);

  const handleApprove = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'Approved' ? 'Wait for approval' : 'Approved';
    try {
      await db.ref(`Admin/${userId}`).update({ status: newStatus });
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await db.ref(`Admin/${userId}`).remove();
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleLogout = () => {
    navigate('/pannel');
  };

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container-fluid p-0">
      <header className="bg-gradient py-4 px-3 mb-4 d-flex justify-content-between align-items-center shadow">
        <h1 className="text-white display-4 fw-bold mx-auto">Admin Page</h1>
        <div className="d-flex align-items-center">
          <button className="btn btn-danger" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>
  
      <div className="search-bar-container">
        <input
          type="text"
          className="form-control search-bar"
          placeholder="Search by Name, Email, Phone, or Username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
  
      <div className="table-responsive mt-4">
        <table className="table table-striped table-sm table-hover custom-table">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th className="d-none d-md-table-cell">Business Type</th>
              <th className="d-none d-lg-table-cell">Username</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.id} className="table-row">
                  <td>{index + 1}</td>
                  <td>
                    <span
                      style={{ cursor: 'pointer', color: 'black', textDecoration: 'none' }}
                      onClick={() => handleShowModal(user)}
                    >
                      {user.name}
                    </span>
                  </td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td className="d-none d-md-table-cell">{user.businessType}</td>
                  <td className="d-none d-lg-table-cell">{user.username}</td>
                  <td>{user.status || 'Wait for approval'}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button
                        className={`btn btn-sm me-2 ${user.status === 'Approved' ? 'btn-success' : 'btn-primary'}`}
                        onClick={() => handleApprove(user.id, user.status || 'Wait for approval')}
                      >
                        {user.status === 'Approved' ? 'Approved' : 'Approve'}
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
      {/* User Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Business Type:</strong> {selectedUser.businessType}</p>
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Status:</strong> {selectedUser.status || 'Wait for approval'}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPage;


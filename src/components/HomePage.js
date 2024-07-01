import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../Firebase'; // Assuming Firebase is correctly configured and imported
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import ShopkeeperHeader from './ShopkeeperHeader'; // Assuming correct path for ShopkeeperHeader
import ShopkeeperLoader from './ShopkeeperLoader';

const HomePage = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    email: '',
    location: ''
  });
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editing, setEditing] = useState(false); // State to manage editing mode
  const [editedUserData, setEditedUserData] = useState({}); // State to store edited user data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const snapshot = await db.ref(`Admin/${key}`).once('value');
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserData(data);
        } else {
          setUserData({ name: 'User' });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData({ name: 'User' });
      }
      setLoading(false);
    };

    const fetchCustomers = async () => {
      try {
        const snapshot = await db.ref(`Admin/${key}/Customers`).once('value');
        if (snapshot.exists()) {
          const data = snapshot.val();
          const customerList = data ? Object.keys(data).map(id => ({ id, ...data[id] })) : [];
          setCustomers(customerList);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchUserData();
    fetchCustomers();
  }, [key]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const newCustomerRef = await db.ref(`Admin/${key}/Customers`).push(customerData);
      setMessage('Customer details added successfully.');
      setCustomerData({
        name: '',
        phone: '',
        email: '',
        location: ''
      });
      setCustomers(prevCustomers => [...prevCustomers, { id: newCustomerRef.key, ...customerData }]);
    } catch (error) {
      console.error('Error adding customer details:', error);
      toast.error('Failed to add customer details. Please try again.');
    }
  };

  const handleEdit = () => {
    // Set the edited user data to current user data
    setEditedUserData({
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
      businessType: userData.businessType,
      username: userData.username,
    });
    setEditing(true); // Enable editing mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      await db.ref(`Admin/${key}`).update(editedUserData);
      setUserData(editedUserData);
      setEditing(false); // Disable editing mode
      toast.success("User details updated successfully.");
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("Failed to update user details. Please try again.");
    }
  };

  const handleOpenAccount = (customerId) => {
    const customerDetails = customers.find(customer => customer.id === customerId);
    localStorage.setItem('customerDetails', JSON.stringify(customerDetails));
    navigate(`/useraccountpages/${key}/${customerId}`);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <ShopkeeperLoader />;
  }

  return (
    <div>
      <ShopkeeperHeader />
      <div className="container mt-5">
        <header className="d-flex justify-content-between align-items-center">
          <h1>Hello, {userData.name}!</h1>
        </header>
        <div className="mt-4 p-4" style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)' }}>
          <h2 className="mb-4">Add Customer Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="name" className="form-label">Customer Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={customerData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="phone" className="form-label">Phone:</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={customerData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={customerData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="location" className="form-label">Location:</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  value={customerData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {message && <p className="text-center text-success">{message}</p>}
            <div className="text-center">
              <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#28a745', border: 'none' }}>
                <span className="me-2"><i className="bi bi-person-plus"></i></span>
                Add Customer
              </button>
            </div>
          </form>
        </div>
        <div className="mt-4 p-4" style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)' }}>
          <h2>User Details</h2>
          {editing ? (
            <form onSubmit={handleSubmitEdit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={editedUserData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone:</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={editedUserData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={editedUserData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="businessType" className="form-label">Business Type:</label>
                <input
                  type="text"
                  className="form-control"
                  id="businessType"
                  name="businessType"
                  value={editedUserData.businessType}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={editedUserData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditing(false)}>Cancel</button>
            </form>
          ) : (
            <div>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Phone:</strong> {userData.phone}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Business Type:</strong> {userData.businessType}</p>
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Key:</strong> {key}</p>
              <button className="btn btn-primary mt-3" onClick={handleEdit}>Edit</button>
            </div>
          )}
        </div>
        <div className="mt-4 p-4" style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)' }}>
          <h2 className="mb-3">Customer List</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, phone, or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {filteredCustomers.length === 0 ? (
            <p>No customers found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered" style={{ backgroundColor: '#f8f9fa' }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.name}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.email}</td>
                      <td>{customer.location}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleOpenAccount(customer.id)}
                        >
                          Open Account
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;


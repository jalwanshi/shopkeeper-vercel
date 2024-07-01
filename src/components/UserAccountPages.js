import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../Firebase';
import Modal from 'react-bootstrap/Modal';
import './UserAccountPages.css'; // Import CSS file for custom styling

import CustomerHeader from './CustomerHeader';

const UserAccountPages = () => {
  const { key1, key2 } = useParams();
  const [customerDetails, setCustomerDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [showDebitModal, setShowDebitModal] = useState(false);
  const [transaction, setTransaction] = useState({
    itemName: '',
    amount: '',
    qty: '',
    description: '',
  });
  const [transactions, setTransactions] = useState([]);
  const [debitAmount, setDebitAmount] = useState('');

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const customerSnapshot = await db.ref(`Admin/${key1}/Customers/${key2}`).once('value');
        if (customerSnapshot.exists()) {
          const customerData = customerSnapshot.val();
          setCustomerDetails(customerData);
          setTransactions(customerData.Transactions || []);
        } else {
          console.error('No customer details found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [key1, key2]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await db.ref(`Admin/${key1}/Customers/${key2}`).set(customerDetails);
      setEditMode(false);
      alert('Details updated successfully.');
    } catch (error) {
      console.error('Error updating details:', error);
      alert('Failed to update details. Please try again.');
    }
  };

  const handleTransactionChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  };

  const calculateTotal = (transactions) => {
    return transactions.reduce((acc, tran) => acc + tran.subtotal, 0);
  };

  const handleTransactionSave = async () => {
    const date = new Date();
    const transactionData = {
      ...transaction,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      subtotal: transaction.amount * transaction.qty,
    };

    const updatedTransactions = Array.isArray(transactions) ? [...transactions, transactionData] : [transactionData];
    const total = calculateTotal(updatedTransactions);

    try {
      await db.ref(`Admin/${key1}/Customers/${key2}`).update({
        Transactions: updatedTransactions,
        total: total,
      });
      setTransactions(updatedTransactions);
      setCustomerDetails((prevDetails) => ({
        ...prevDetails,
        total: total,
      }));
      setShowCreditModal(false);
      alert('Transaction saved successfully.');
    } catch (error) {
      console.error('Error saving transaction:', error);
      alert('Failed to save transaction. Please try again.');
    }
  };

  const handleDebitSave = async () => {
    const date = new Date();
    const debitData = {
      itemName: 'Payment',
      description: 'Payment received',
      amount: debitAmount,
      qty: 1,
      subtotal: -debitAmount,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };

    const updatedTransactions = Array.isArray(transactions) ? [...transactions, debitData] : [debitData];
    const total = calculateTotal(updatedTransactions);

    try {
      await db.ref(`Admin/${key1}/Customers/${key2}`).update({
        Transactions: updatedTransactions,
        total: total,
      });
      setTransactions(updatedTransactions);
      setCustomerDetails((prevDetails) => ({
        ...prevDetails,
        total: total,
      }));
      setShowDebitModal(false);
      alert('Payment recorded successfully.');
    } catch (error) {
      console.error('Error recording payment:', error);
      alert('Failed to record payment. Please try again.');
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div>
      <CustomerHeader key1={key1} />
      <div className="container">
        <div className="row">
          <div className="col">
          <div className="customer-details-box p-4 rounded shadow">
  <div className="mb-3">
    <h2>Customer Details</h2>
  </div>
  <div>
    {['name', 'phone', 'email', 'location'].map((field) => (
      <div key={field} className="mb-3">
        <label className="form-label"><strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong></label>
        {editMode ? (
          <input
            type="text"
            className="form-control"
            name={field}
            value={customerDetails[field] || ''}
            onChange={handleChange}
          />
        ) : (
          <p className="form-control-plaintext">{customerDetails[field]}</p>
        )}
      </div>
    ))}
    {editMode ? (
      <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
    ) : (
      <button className="btn btn-primary me-2" onClick={() => setEditMode(true)}>Edit Details</button>
    )}
  </div>
</div>



          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
          <div className="transaction-box p-4 rounded shadow">
  <div className="mb-3">
    <h4>Hello {customerDetails.name}, Your Due Amount is: ₹{customerDetails.total}</h4>
  </div>
  <div>
    <button className="btn btn-success me-2" onClick={() => setShowCreditModal(true)}>Credit</button>
    <button className="btn btn-danger" onClick={() => setShowDebitModal(true)}>Debit</button>
  </div>
</div>

          </div>
        </div>
        <div className="row mt-4">
  <div className="col">
    <div className="card shadow">
      <div className="card-body">
        <h3 className="card-title">Transactions</h3>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Item Name</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tran, index) => (
                <tr key={index} className={tran.subtotal > 0 ? 'table-row-bold' : ''}>
                  <td>{tran.itemName}</td>
                  <td>{tran.description}</td>
                  <td>{tran.amount}</td>
                  <td>{tran.qty}</td>
                  <td>{tran.subtotal}</td>
                  <td>{tran.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>


      </div>

      <Modal show={showCreditModal} onHide={() => setShowCreditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Item Name</label>
              <input
                type="text"
                className="form-control"
                name="itemName"
                value={transaction.itemName}
                onChange={handleTransactionChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Amount</label>
              <input
                type="number"
                className="form-control"
                name="amount"
                value={transaction.amount}
                onChange={handleTransactionChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                name="qty"
                value={transaction.qty}
                onChange={handleTransactionChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={transaction.description}
                onChange={handleTransactionChange}
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowCreditModal(false)}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleTransactionSave}>
            Save Transaction
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDebitModal} onHide={() => setShowDebitModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Record Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Amount</label>
              <input
                type="number"
                className="form-control"
                name="debitAmount"
                value={debitAmount}
                onChange={(e) => setDebitAmount(parseFloat(e.target.value))}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowDebitModal(false)}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleDebitSave}>
            Record Payment
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserAccountPages;


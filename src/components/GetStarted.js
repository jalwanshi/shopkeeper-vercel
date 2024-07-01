import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { useNavigate } from 'react-router-dom';
const GetStarted = () => {
  const showPrivacyPolicy = () => {
    Swal.fire({
      title: 'Privacy Policy',
      html: `
        <div style="text-align: left;">
          <h4>Introduction</h4>
          <p>This privacy policy governs the collection, use, and protection of user data on our Shopkeeper Management Website.</p>
          <h4>Information Collection</h4>
          <p>We collect shopkeeper information such as names, business details, and contact information for administrative purposes.</p>
          <h4>Use of Information</h4>
          <p>Shopkeeper information is used for account management, communication, and service delivery purposes.</p>
          <h4>Data Security</h4>
          <p>We employ industry-standard security measures to protect shopkeeper data against unauthorized access or disclosure.</p>
          <h4>Third-Party Access</h4>
          <p>Shopkeeper data is not shared with third parties except for essential service providers integral to our operations.</p>
          <h4>Cookies and Tracking</h4>
          <p>We use cookies for site functionality and analytics but do not track shopkeeper activity beyond necessary operational needs.</p>
          <h4>User Choices</h4>
          <p>Shopkeepers have options to update their information and can request data deletion as per applicable regulations.</p>
          <h4>Marketing Communications</h4>
          <p>We do not use shopkeeper data for marketing purposes without explicit consent.</p>
          <h4>Children's Privacy</h4>
          <p>Our services are not directed at children under 13, and we do not knowingly collect their personal information.</p>
          <h4>Data Retention</h4>
          <p>Shopkeeper data is retained only as long as necessary for business purposes or as required by law.</p>
          <h4>International Transfers</h4>
          <p>Shopkeeper data may be transferred internationally only with adequate safeguards in place.</p>
          <h4>Updates to Policy</h4>
          <p>Changes to this policy will be communicated to shopkeepers via email or through our website.</p>
          <h4>Legal Basis</h4>
          <p>We process shopkeeper data based on legitimate business interests and consent where applicable.</p>
          <h4>Contact Information</h4>
          <p>Shopkeepers can contact us for privacy-related inquiries or to exercise their rights regarding their data.</p>
          <h4>User Rights</h4>
          <p>Shopkeepers have rights to access, rectify, or delete their data, subject to legal requirements.</p>
          <h4>Data Breach Notification</h4>
          <p>In the event of a data breach affecting shopkeeper data, we will notify affected parties promptly.</p>
          <h4>Compliance</h4>
          <p>We adhere to applicable privacy laws and regulations to protect shopkeeper data.</p>
          <h4>User Responsibilities</h4>
          <p>Shopkeepers are responsible for maintaining the confidentiality of their account credentials and for ensuring the accuracy of their information.</p>
          <h4>Policy Acceptance</h4>
          <p>By using our services, shopkeepers agree to the terms of this privacy policy.</p>
          <h4>Effective Date</h4>
          <p>This privacy policy is effective as of [Effective Date], with previous versions available upon request.</p>
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      width: '50%'
    });
  };

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    Swal.fire({
      title: 'How to Register',
      html: `
        <div style="text-align: left;">
          <p>To register:</p>
          <ul>
            <li>Go to the Sign Up page.</li>
            <li>Fill in your details including name, phone, email, business type, username, and password.</li>
            <li>Submit your details and wait for admin approval.</li>
            <li>Note: If you are already registered, do not register again. Wait for admin approval and check your email for further information.</li>
          </ul>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Signup Now',
      cancelButtonText: 'Cancel',
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/signup'); // Navigate to '/signup' route
      }
    });
  };
  
  const handleLoginClick = () => {
    Swal.fire({
      title: 'How to Login',
      html: `
        <div style="text-align: left;">
          <p>To login:</p>
          <ul>
            <li>Go to the Login page.</li>
            <li>Enter your username and password.</li>
            <li>Click the Login button to access your account.</li>
            <li>If you encounter issues, use the Forgot Password link or contact support for assistance.</li>
          </ul>
        </div>
      `,
      showCancelButton: false,
      confirmButtonText: 'Got It',
      icon: 'info'
    });
  };

  const firstBoxContent = "This website is designed to manage shopkeepers' customer accounts and transactions effectively. Customers can create accounts, add customers, and manage transactions.";

  const secondBoxContent = "To learn how to register on our website, click the box below for detailed instructions";

  const thirdBoxContent = "You have explored all the information on our website. We appreciate your interest and hope you found everything you were looking for.";

  const lineStyle = {
    position: 'absolute',
    width: '2px',
    backgroundColor: 'black',
    height: 'calc(100% - 20px)', // Adjusted to align with the card's height minus marginBottom
    top: '10px', // Adjusted to center the line vertically
    left: '50%',
    transform: 'translateX(-50%)'
  };

  const boxStyle = {
    width: '45%',
    marginBottom: '20px',
    position: 'relative',
    borderRadius: '39px',
    color: 'white',
    cursor: 'pointer'
  };

  const boxRightStyle = {
    ...boxStyle,
    marginRight: '0',
    float: 'left',
    clear: 'both',
    backgroundColor: '#7e518a',
    boxShadow: 'inset 7px 7px 19px #322037, inset -7px -7px 19px #ca82dd'
  };

  const boxLeftStyle = {
    ...boxStyle,
    marginLeft: '0',
    float: 'right',
    clear: 'both',
    backgroundColor: '#fdca3f',
    boxShadow: 'inset 7px 7px 19px #d1b08d, inset -7px -7px 19px #f7d88b'
  };

  const thirdBoxStyle = {
    ...boxRightStyle,
    marginLeft: '0',
    float: 'right',
    clear: 'both',
    backgroundColor: '#c3612c',
    boxShadow: 'inset 7px 7px 19px #8d3e1f, inset -7px -7px 19px #f88439'
  };

  const loginBoxStyle = {
    ...boxLeftStyle,
    marginLeft: '0',
    float: 'left',
    clear: 'both',
    backgroundColor: '#007bff',
    boxShadow: 'inset 7px 7px 19px #0056b3, inset -7px -7px 19px #4da8ff'
  };

  const titleStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#7e518a',
    color: 'white',
    borderRadius: '10px',
    boxShadow: '7px 7px 19px #322037, -7px -7px 19px #ca82dd',
    marginBottom: '20px' // Add margin bottom to separate title from boxes
  };

  return (
    <div className="container mt-5">
      <h2 style={titleStyle}>Shopkeeper Management Overview</h2>
  
      <div className="row">
        <div className="col-12 position-relative" style={{ marginBottom: '20px' }}>
          <div style={lineStyle}></div>
          <div className="card" style={boxRightStyle} onClick={showPrivacyPolicy}>
            <div className="card-body">
              <h5 className="card-title">Website Purpose</h5>
              <p className="card-text">{firstBoxContent}</p>
              <p className="card-text"><a href="#!" onClick={showPrivacyPolicy}>Privacy Policy</a></p>
            </div>
          </div>
        </div>
        <div className="col-12 position-relative" style={{ marginBottom: '20px' }}>
          <div style={lineStyle}></div>
          <div className="card" style={boxLeftStyle} onClick={handleRegisterClick}>
            <div className="card-body">
              <h5 className="card-title">How to Register</h5>
              <p className="card-text">{secondBoxContent}</p>
            </div>
          </div>
        </div>
        <div className="col-12 position-relative" style={{ marginBottom: '20px' }}>
          <div style={lineStyle}></div>
          <div className="card" style={loginBoxStyle} onClick={handleLoginClick}>
            <div className="card-body">
              <h5 className="card-title">How to Login</h5>
              <p className="card-text">Learn how to log in and access your account. First, you need to register on our website. Once you receive admin approval, you can then log in.</p>
            </div>
          </div>
        </div>
        <div className="col-12 position-relative">
          <div style={lineStyle}></div>
          <div className="card" style={thirdBoxStyle}>
            <div className="card-body">
              <h5 className="card-title">Thank You for Visiting!</h5>
              <p className="card-text">{thirdBoxContent}</p>
            </div>
          </div>
        </div>
      </div>
  
      <div className="home-icon-container text-center mt-4">
        <Link to="/">
          <FaHome className="home-icon" />
        </Link>
      </div>
    </div>
  );
  
}

export default GetStarted;

             

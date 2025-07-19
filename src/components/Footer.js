import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>We are an e-commerce store dedicated to providing high-quality products at competitive prices.</p>
          </div>
          
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: contact@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Instagram</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} E-Commerce Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

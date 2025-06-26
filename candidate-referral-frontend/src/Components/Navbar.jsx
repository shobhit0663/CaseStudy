// 📁 src/Components/Navbar.jsx
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar shadow-sm">
      <div className="container-fluid d-flex align-items-center justify-content-between px-4">
        <div className="navbar-logo">🎯 Referrals</div>
        <div className="navbar-links">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Candidates</a>
          <a href="#" className="nav-link">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
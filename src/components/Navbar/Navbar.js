// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pendingBookings, setPendingBookings] = useState(0);
  const navigate = useNavigate();

  // Simulate authentication state via localStorage
  const userId = localStorage.getItem('userId'); // if exists, user is logged in
  const role = localStorage.getItem('role');       // e.g., 'TENANT' or 'LANDLORD'
  const token = localStorage.getItem('jwtToken');

  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/login');
  };

  // Fetch pending bookings if the role is TENANT (adjust URL/logic as needed)
  useEffect(() => {
    if (role === 'TENANT' && token) {
      axios
        .get('http://localhost:8081/bookings/pending', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setPendingBookings(res.data.length))
        .catch((err) => console.error('Error fetching pending bookings', err));
    }
  }, [role, token]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">EasyHome </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={menuOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/properties">Properties</Link>
            </li>
            {role === 'LANDLORD' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-property">Add Property</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/manage-properties">Manage Properties</Link>
                </li>
              </>
            )}
           
           
            <li className="nav-item position-relative">
              <Link className="nav-link" to="/requests">
                Booking Requests
                {pendingBookings > 0 && (
                  <span className="badge bg-danger ms-1">{pendingBookings}</span>
                )}
              </Link>
            </li> */}
            <li className="nav-item dropdown">
  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Properties
  </Link>
  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
    <li>
      <Link className="dropdown-item" to="/properties">View Properties</Link>
    </li>
    {role === 'LANDLORD' && (
      <>
        <li>
          <Link className="dropdown-item" to="/add-property">Add Property</Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/manage-properties">Manage Properties</Link>
        </li>
      </>
    )}
  </ul>
</li>

{role=='TENANT' && <li className="nav-item dropdown">
  <Link className="nav-link dropdown-toggle" to="#" id="bookingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Booking Requests
    {pendingBookings > 0 && (
      <span className="badge bg-danger ms-1">{pendingBookings}</span>
    )}
  </Link>
  <ul className="dropdown-menu" aria-labelledby="bookingDropdown">
    <li>
      <Link className="dropdown-item" to="/requests">View Requests</Link>
    </li>
    {/* You can add more options here if needed */}
  </ul>
</li>}

            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            <li className="nav-item dropdown">
              {!userId ? (
                <Link className="btn btn-primary" to="/login">Login</Link>
              ) : (
                <>
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Account
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button className="dropdown-item" onClick={logout}>Logout</button>
                    </li>
                  </ul>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

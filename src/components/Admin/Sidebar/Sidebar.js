import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="col-md-3 bg-dark text-white p-3">
      <h4>Admin Dashboard</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/admin/user-management">User Management</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/admin/property-management">Property Management</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/admin/booking-management">Booking Management</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/admin/payment-management">Payment Management</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/admin/feedback-reports">Feedback & Reports</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="page page-center dashboard-page">
  <div className="dashboard-content">
    <h2 className="page-title">Dashboard</h2>

    <p className="page-subtitle">
      Welcome to your organisation's HRMS Dashboard.
    </p>

    <div className="dashboard-buttons">
      <Link to="/employees" className="primary-btn">
        Manage Employees
      </Link>
      <Link to="/teams" className="primary-btn">
        Manage Teams
      </Link>
    </div>
  </div>
</div>

    </>
  );
}

export default Dashboard;

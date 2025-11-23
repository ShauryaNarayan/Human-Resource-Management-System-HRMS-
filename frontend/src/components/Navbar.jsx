import React from "react";
import { Link, useHistory } from "react-router-dom";

function Navbar() {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/employees" className="nav-item">
          Employees
        </Link>
        <Link to="/teams" className="nav-item">
          Teams
        </Link>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;

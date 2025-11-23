import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function RegisterOrg({ history }) {
  const [orgName, setOrgName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", {
        orgName,
        adminName,
        email,
        password,
      });
      alert("Organisation created! You can now log in.");
      history.push("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Register Organisation</h2>

        <form onSubmit={handleRegister}>
          <input
            className="login-input"
            placeholder="Organisation Name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            required
          />
          <input
            className="login-input"
            placeholder="Admin Name"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            required
          />
          <input
            className="login-input"
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-btn" type="submit">
            Register
          </button>
        </form>

        <p className="register-text">
          Already have an account?{" "}
          <Link to="/" className="register-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterOrg;

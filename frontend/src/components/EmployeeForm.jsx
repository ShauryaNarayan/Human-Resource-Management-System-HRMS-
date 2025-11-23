import React, { useState } from "react";

function EmployeeForm({ onSubmit }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ firstName: "", lastName: "", email: "", phone: "" });
  };

  return (
  <div className="form-card">
    <h3>Add Employee</h3>

    <form onSubmit={handleSubmit}>
      <input
        className="login-input"
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
        required
      />
      <input
        className="login-input"
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
        required
      />
      <input
        className="login-input"
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        className="login-input"
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />

      <button className="login-btn" type="submit">
        Add Employee
      </button>
    </form>
  </div>
);

}

export default EmployeeForm;

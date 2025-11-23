import React, { useState } from "react";

function TeamForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
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
    setForm({ name: "", description: "" });
  };

  return (
  <div className="form-card">
    <h3>Add Team</h3>

    <form onSubmit={handleSubmit}>
      <input
        className="login-input"
        name="name"
        placeholder="Team Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <textarea
        className="login-input"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <button className="login-btn" type="submit">
        Add Team
      </button>
    </form>
  </div>
);
}

export default TeamForm;

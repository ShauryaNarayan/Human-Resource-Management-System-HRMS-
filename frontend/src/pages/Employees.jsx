import React, { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import EmployeeForm from "../components/EmployeeForm";
import AssignTeam from "../components/AssignTeam";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [assigning, setAssigning] = useState(null);

  const loadEmployees = async () => {
    const res = await api.get("/employees");
    setEmployees(res.data);
  };

  const addEmployee = async (form) => {
    await api.post("/employees", form);
    loadEmployees();
  };

  const deleteEmp = async (id) => {
    await api.delete(`/employees/${id}`);
    loadEmployees();
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <>
      <Navbar />

      <div className="page page-center">
        <h2 className="page-title">Employees</h2>

        <EmployeeForm onSubmit={addEmployee} />

        <ul className="list">
          {employees.map((e) => (
            <li key={e.id} className="list-item">
              <span>
                {e.firstName} {e.lastName} — {e.email}
              </span>

              <div>
                <button
                  className="secondary-btn list-btn"
                  onClick={() => setAssigning(e)}
                >
                  Assign to Team
                </button>

                <button
                  className="danger-btn list-btn"
                  onClick={() => deleteEmp(e.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {assigning && (
          <AssignTeam employee={assigning} onClose={() => setAssigning(null)} />
        )}
      </div>
    </>
  );
}

export default Employees;

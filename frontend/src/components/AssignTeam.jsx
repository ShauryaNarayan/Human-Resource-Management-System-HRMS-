import React, { useEffect, useState } from "react";
import api from "../services/api";

function AssignTeam({ employee, onClose }) {
  const [teams, setTeams] = useState([]);

  const loadTeams = async () => {
    const res = await api.get("/teams");
    setTeams(res.data);
  };

  const assign = async (teamId) => {
    await api.post(`/teams/${teamId}/assign`, { employeeId: employee.id });
    alert("Employee assigned to team");
    onClose();
  };

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <div className="assign-overlay">
      <div className="assign-box">
        <h3>Assign {employee.firstName} to a Team</h3>

        <div className="assign-list">
          {teams.map((team) => (
            <button
              key={team.id}
              className="assign-btn"
              onClick={() => assign(team.id)}
            >
              {team.name}
            </button>
          ))}
        </div>

        <button className="secondary-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default AssignTeam;

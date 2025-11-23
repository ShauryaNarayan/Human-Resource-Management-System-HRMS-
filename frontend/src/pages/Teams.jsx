import React, { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import TeamForm from "../components/TeamForm";

function Teams() {
  const [teams, setTeams] = useState([]);

  const loadTeams = async () => {
    const res = await api.get("/teams");
    setTeams(res.data);
  };

  const addTeam = async (form) => {
    await api.post("/teams", form);
    loadTeams();
  };

  const deleteTeam = async (id) => {
    await api.delete(`/teams/${id}`);
    loadTeams();
  };

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <>
      <Navbar />

      <div className="page page-center">
        <h2 className="page-title">Teams</h2>

        <TeamForm onSubmit={addTeam} />

        <ul className="list">
          {teams.map((t) => (
            <li key={t.id} className="list-item">
              <span>{t.name}</span>

              <button
                className="danger-btn list-btn"
                onClick={() => deleteTeam(t.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Teams;

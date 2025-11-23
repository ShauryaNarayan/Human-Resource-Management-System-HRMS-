import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import RegisterOrg from "./pages/RegisterOrg";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Teams from "./pages/Teams";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={RegisterOrg} />

        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/employees" component={Employees} />
        <ProtectedRoute exact path="/teams" component={Teams} />
      </Switch>
    </Router>
  );
}

export default App;

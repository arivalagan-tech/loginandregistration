import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import History from "./components/History";
import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function RequireAuth({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated()) return <Navigate to="/" replace />;
  return children;
}

function App() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <NavLink to="/" className="nav-brand">
            <span className="nav-brand-dot"></span>
            Quantum IT Portal
          </NavLink>
          <div className="nav-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              Register
            </NavLink>
            {isAuthenticated() && (
              <>
                <NavLink
                  to="/history"
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                >
                  History
                </NavLink>
                <button onClick={logout} className="nav-btn-logout">
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>

        <main className="app-content">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route
              path="/history"
              element={
                <RequireAuth>
                  <History />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

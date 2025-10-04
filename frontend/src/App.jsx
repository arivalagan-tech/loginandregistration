import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
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
      <div style={{ padding: "20px" }}>
        <nav
          style={{
            marginBottom: "20px",
            background: "white",
            padding: "20px",
          }}
        >
          <Link to="/" style={{ marginRight: "10px" }}>
            Login
          </Link>
          <Link to="/register" style={{ marginRight: "10px" }}>
            Register
          </Link>
          {isAuthenticated() && (
            <>
              <Link to="/history" style={{ marginRight: "10px" }}>
                History
              </Link>
              <button onClick={logout}>Logout</button>
            </>
          )}
        </nav>

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
      </div>
    </Router>
  );
}

export default App;

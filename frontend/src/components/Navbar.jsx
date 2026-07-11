import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <div className="logo">
        🔐 SecureAuth
      </div>

      <div className="nav-links">
        {!token && <Link to="/Signup">Signup</Link>}
        {!token && <Link to="/Login">Login</Link>}

        {token && (
          <>
            <Link to="/Dashboard">Dashboard</Link>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
import React, { useEffect, useState } from "react";
import axios from "axios";
import EditProfile from "../components/EditProfile";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "🌅 Good Morning";
    if (hour < 17) return "☀️ Good Afternoon";

    return "🌙 Good Evening";
  };

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="dashboard-container">

        <div className="dashboard-card">

          <div className="avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <h1>🔒 Secure Dashboard</h1>

          <h2>
            {getGreeting()}, {user.name}! 👋
          </h2>

          <p className="subtitle">
            Manage your account securely.
          </p>

          <div className="user-info">

            <p>
              <strong>👤 Name :</strong> {user.name}
            </p>

            <p>
              <strong>📧 Email :</strong> {user.email}
            </p>

            <p>
              <strong>📅 Member Since :</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

          </div>

          <button
            className="edit-btn"
            onClick={() => setShowEdit(true)}
          >
            ✏️ Edit Profile
          </button>

        </div>

      </div>

      {showEdit && (
        <EditProfile
          user={user}
          setUser={setUser}
          onClose={() => setShowEdit(false)}
        />
      )}
    </>
  );
}

export default Dashboard;
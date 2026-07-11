import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EditProfile({ user, setUser, onClose }) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE}/auth/update`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
      toast.success("Profile Updated Successfully 🎉");

      onClose();

    } catch (error) {

     toast.error(
      error.response?.data?.message || "Something went wrong"
     );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="edit-modal">

      <div className="edit-card">

        <h2>Edit Profile</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <div className="btn-group">

          <button onClick={handleSubmit}>
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <button onClick={onClose}>
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditProfile;
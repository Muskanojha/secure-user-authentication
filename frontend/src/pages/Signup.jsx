import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE}/auth/signup`,
        form
      );

      toast.success("Account Created Successfully 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Signup Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Signup"}
      </button>
    </form>
  );
}

export default Signup;
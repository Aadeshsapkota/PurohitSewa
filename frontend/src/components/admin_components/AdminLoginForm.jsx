import React, { useState } from "react";
import "./AdminLoginForm.css";
import { adminLogin } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await adminLogin(username, password);

    localStorage.setItem("userToken", data.accessToken);
    localStorage.setItem("isAuthenticated", "true");

    toast.success("Super Admin Login Successful");

    navigate("/admin");
  } catch (err) {

    if (err.response?.status === 401) {
      toast.error("Invalid username or password");
    } else if (err.response?.status === 403) {
      toast.error("You can't access the Admin Panel.");
    } else {
      toast.error(err.response?.data?.message || "Login Failed");
    }
  }
};

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-header">
          <span className="om-symbol">{"\u0950"}</span>
          <h1 className="login-title">Admin Login</h1>
          <p className="login-subtitle">
            Pooja Booking - Admin Panel
          </p>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="username">
            Username
          </label>

          <input
            id="username"
            type="text"
            className="form-input"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
}
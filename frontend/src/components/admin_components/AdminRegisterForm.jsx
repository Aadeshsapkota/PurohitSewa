import React, { useState } from "react";
import "./AdminRegisterForm.css";
import axios from "axios";
import {adminRegister} from "../../api/adminApi";
import { useNavigate } from "react-router-dom";
import { TypeIcon } from "lucide-react";

export default function AdminRegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await adminRegister(username,password);
      navigate('/adminlogin');
      console.log("admin registered");
    } catch (error) {
      console.error("Login failed", error);
    }
   
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-header">
          <span className="om-symbol">{"\u0950"}</span>
          <h1 className="login-title">Admin Register</h1>
          <p className="login-subtitle">Pooja Booking - Admin Panel</p>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="login-btn">Register</button>
      </form>
    </div>
  );
}
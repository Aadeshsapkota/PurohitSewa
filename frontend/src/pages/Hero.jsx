import React, { useEffect } from "react";
import "./Hero.css";
import HeroSection from "../components/hero_components/HeroSection";
import PurohitProfile from "../components/hero_components/PurohitProfile";
import Footer from "../components/hero_components/Footer";
import TrustStrips from "../components/hero_components/TrustStrips";
import { useNavigate } from "react-router-dom";

export default function HeroPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token) return;

    try {
      const parts = token.split(".");

      // JWT must have 3 parts
      if (parts.length !== 3) {
        localStorage.removeItem("userToken");
        return;
      }

      const payload = JSON.parse(atob(parts[1]));

      if (payload.role === "SUPERADMIN") {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      localStorage.removeItem("userToken");
    }
  }, [navigate]);

  return (
    <div className="hero-page">
      <div className="top-ribbon">
        कालिका भगवती पुरोहित सेवा &middot; Perth, Australia
      </div>

      <HeroSection />
      <PurohitProfile />
      <TrustStrips />
      <Footer />
    </div>
  );
}
import React, { useEffect } from "react";
import './Hero.css';
import HeroSection from "../components/hero_components/HeroSection";
import PurohitProfile from "../components/hero_components/PurohitProfile";
import Footer from "../components/hero_components/Footer";
import TrustStrips from "../components/hero_components/TrustStrips";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api/adminApi";
export default function HeroPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const verifyToken = () => {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if(payload.role ==="SUPERADMIN"){
        navigate('/admin');
      }
    }
  }
    useEffect(() => {
    verifyToken();
  }, []);
  

  return (
    <div className="hero-page">
      <div className="top-ribbon">कालिका भगवती पुरोहित सेवा &middot; Perth, Australia</div>
      <HeroSection />
      <PurohitProfile />
      <TrustStrips />
      <Footer />
    </div>
  );
}

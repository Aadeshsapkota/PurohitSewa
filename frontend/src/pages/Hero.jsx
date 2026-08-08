import React, { useEffect } from "react";
import "./Hero.css";
import HeroSection from "../components/hero_components/HeroSection";
import PurohitProfile from "../components/hero_components/PurohitProfile";
import Footer from "../components/hero_components/Footer";
import TrustStrips from "../components/hero_components/TrustStrips";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../api/adminApi";
import {jwtDecode} from 'jwt-decode';

export default function HeroPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccessToken = async () => {
      try {
        const data = await verifyToken();
        const token = data.accessToken;
        const decoded = jwtDecode(token);
        const role = decoded.role;
        console.log(decoded.role);
        if (role === "SUPERADMIN") {
          navigate("/admin/dashboard");
        }
      } catch (error) {
        // Token invalid/expired/rejected by server
        console.error(error);
      }
    };

    verifyAccessToken();
  }, []);

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
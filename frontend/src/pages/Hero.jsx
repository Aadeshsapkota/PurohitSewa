import React from "react";
import './Hero.css';
import HeroSection from "../components/hero_components/HeroSection";
import PurohitProfile from "../components/hero_components/PurohitProfile";
import Footer from "../components/hero_components/Footer";
import TrustStrips from "../components/hero_components/TrustStrips";

export default function HeroPage() {
  return (
    <div className="hero-page">
      <div className="top-ribbon">कालिका भगवती पुरोहित सेवा &middot; Perth, Australia</div>
        <HeroSection/>
        <PurohitProfile/>
        <TrustStrips/>
        <Footer/>
    </div>
  );
}

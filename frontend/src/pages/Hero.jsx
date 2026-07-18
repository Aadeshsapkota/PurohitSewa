import React from "react";
import './Hero.css';
import HeroSection from "../components/HeroSection";
import PurohitProfile from "../components/PurohitProfile";
import Footer from "../components/Footer";
import TrustStrips from "../components/TrustStrips";

/**
 * HeroPage
 * A spiritual, professional landing page for the pooja booking service.
 * - Hero section with CTA linking to the booking form (localhost:5173/user)
 * - Super Admin / priest profile section (Bhim Prasad Paudel)
 * - Sacred shlokas & mantras section
 *
 * Theme continues the maroon (#3b0a1a / #5c1224) + marigold (#d4900f) +
 * saffron accents on warm cream (#fff8ef) established in BookPooja / AdminPanel.
 */


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

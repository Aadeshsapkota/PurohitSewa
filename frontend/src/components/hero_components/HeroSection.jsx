import React from 'react'
import { Link } from 'react-router-dom'
import './HeroSection.css'
function HeroSection() {
  return (
    <div>
      {/* ---------- Hero ---------- */}
      <section className="hero-section">
        <div className="hero-om">&#2384;</div>
        <p className="hero-eyebrow">Sacred Rituals &middot; Trusted Guidance</p>
        <h1 className="hero-title">
          Bring the Blessings of <span>Vedic Tradition</span> Into Your Home
        </h1>
        <p className="hero-subtitle">
          From Griha Pravesh to Satyanarayan Pooja, our experienced pandit
          brings authentic Vedic rituals to your doorstep across Perth,
          performed with devotion, precision, and care.
        </p>

        <Link to="/booking" className="cta-btn">
          Book a Pooja Now
        </Link>
        
        <p className="cta-note">Takes less than 2 minutes &middot; No obligation</p>

        <div className="hero-divider">
          <span className="line" />
          &#2384;
          <span className="line" />
        </div>
      </section>
    </div>
  )
}

export default HeroSection
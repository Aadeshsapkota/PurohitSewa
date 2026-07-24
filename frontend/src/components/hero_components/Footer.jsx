import React from 'react'
import './Footer.css'
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div>         {/* ---------- Footer CTA ---------- */}
      <section className="footer-cta">
        <Link to="/admin/login">Admin Login</Link>
        <h2>Ready to Begin Your Sacred Ceremony?</h2>
        <p>Book a pandit in just a few clicks and let tradition come home.</p>
        <a className="cta-btn" href="http://localhost:5173/user">
          Book a Pooja Now
        </a>
        
        <p className="footer-org">Kalika Bhagawati Purohit Sewa &middot; Perth, Australia</p>
      </section>
    </div>
  )
}

export default Footer
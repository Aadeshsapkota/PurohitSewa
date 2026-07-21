import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div>         {/* ---------- Footer CTA ---------- */}
      <section className="footer-cta">
        <h2>Ready to Begin Your Sacred Ceremony?</h2>
        <p>Book a pandit in just a few clicks and let tradition come home.</p>
        <Link className="cta-btn" to= '/booking'>
          Book a Pooja Now
        </Link>
        <p className="footer-org">Kalika Bhagawati Purohit Sewa &middot; Perth, Australia</p>
      </section>
    </div>
  )
}

export default Footer
import React from 'react'
import './Footer.css'
function Footer() {
  return (
    <div>         {/* ---------- Footer CTA ---------- */}
      <section className="footer-cta">
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
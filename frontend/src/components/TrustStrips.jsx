import React from 'react'
import './TrustStrips.css'
function TrustStrips() {
  return (
    <div>
              {/* ---------- Trust strip ---------- */}
      <section className="trust-strip">
        <div className="trust-item">
          <p className="trust-value">150+</p>
          <p className="trust-label">Poojas Performed</p>
        </div>
        <div className="trust-item">
          <p className="trust-value">10+</p>
          <p className="trust-label">Years of Practice</p>
        </div>
        <div className="trust-item">
          <p className="trust-value">14</p>
          <p className="trust-label">Locations Served</p>
        </div>
        <div className="trust-item">
          <p className="trust-value">100%</p>
          <p className="trust-label">Vedic Authenticity</p>
        </div>
      </section>
    </div>
  )
}

export default TrustStrips
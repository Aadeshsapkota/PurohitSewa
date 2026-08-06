import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      {/* CTA */}
      <section className="footer-cta">
        <h2>Ready to Begin Your Sacred Ceremony?</h2>

        <p>
          Book your pooja with experienced Vedic priests and bring divine
          blessings to your home.
        </p>

        <Link to="/booking" className="cta-btn">
          Book a Pooja Now
        </Link>
      </section>

      {/* Main Footer */}

      <div className="footer-container">

        {/* Brand */}

        <div className="footer-column">
          <h3>🕉 Kalika Bhagawati Purohit Sewa</h3>

          <p>
            Authentic Hindu rituals performed by experienced Vedic priests
            across Perth. We perform traditional ceremonies with devotion,
            accuracy, and respect for Sanatan Dharma.
          </p>

          <div className="social-links">
            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Quick Links */}

        <div className="footer-column">
          <h4>Quick Links</h4>

          <Link to="/">Home</Link>
          <Link to="/booking">Book Pooja</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Services */}

        <div className="footer-column">
          <h4>Our Services</h4>

          <p>Griha Pravesh</p>
          <p>Satyanarayan Pooja</p>
          <p>Wedding Ceremony</p>
          <p>Naming Ceremony</p>
          <p>Lakshmi Pooja</p>
          <p>Festival Poojas</p>
        </div>

        {/* Contact */}

        <div className="footer-column">
          <h4>Contact</h4>

          <p>
            <FaPhoneAlt /> +61 XXX XXX XXX
          </p>

          <p>
            <FaEnvelope /> info@kalikapurohit.com
          </p>

          <p>
            <FaMapMarkerAlt /> Perth, Western Australia
          </p>

          <p>Mon - Sun</p>
          <p>6:00 AM - 9:00 PM</p>
        </div>

      </div>

      {/* Footer Bottom */}

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Kalika Bhagawati Purohit Sewa. All Rights
          Reserved.
        </p>

        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy Policy</Link>

          <Link to="/terms">Terms & Conditions</Link>

          <Link to="/adminlogin" className="admin-login">
            Admin Login
          </Link>
        </div>

      </div>

    </footer>
  );
}

export default Footer;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getContact } from '../services/api';

const API_BASE = 'http://127.0.0.1:8000';

const Footer = () => {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    getContact()
      .then(res => { if (res.success) setContact(res.data); })
      .catch(() => {});
  }, []);

  const phones      = contact?.phones || [];
  const email       = contact?.email || null;
  const address     = contact?.address || null;
  const openingTime = contact?.opening_time || null;
  const socialLinks = contact?.social_links || [];
  const mapUrl      = contact?.map_embed_url || null;

  const waLink   = socialLinks.find(s => s.label?.toLowerCase().replace(/\s/g,'').includes('whats'));
  const waNumber = waLink ? waLink.url?.replace(/\D/g,'') : (phones[0] ? phones[0].replace(/\D/g,'') : null);

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand */}
        <div className="footer-section">
          <h3>VIGO CREAKERS</h3>
          <p>Quality fireworks and crackers for your Diwali celebrations. Trusted by thousands of customers across India.</p>
          {socialLinks.length > 0 && (
            <div className="social-links">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.url?.startsWith('http') ? s.url : `https://${s.url}`}
                  title={s.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.icon ? (
                    <img
                      src={s.icon.startsWith('http') ? s.icon : `${API_BASE}${s.icon}`}
                      alt={s.label}
                      style={{ width: 20, height: 20, objectFit: 'cover', borderRadius: 4 }}
                    />
                  ) : s.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul style={{ listStyle: 'none' }}>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/">Quick Enquiry</Link></li>
            <li><Link to="/order-track">Order Tracking</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact — only show rows that have data */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          {address && (
            <p>
              <strong>Address:</strong><br />
              {mapUrl
                ? <a href={mapUrl} target="_blank" rel="noreferrer">{address}</a>
                : address}
            </p>
          )}
          {phones.length > 0 && (
            <p>
              <strong>Phone:</strong><br />
              {phones.map((p, i) => (
                <span key={i}>
                  <a href={`tel:${p.replace(/\D/g,'')}`}>{p}</a>
                  {i < phones.length - 1 && ', '}
                </span>
              ))}
            </p>
          )}
          {email && (
            <p>
              <strong>Email:</strong><br />
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          )}
          {openingTime && (
            <p style={{ marginTop: '10px', fontSize: '12px' }}>
              <strong>Hours:</strong> {openingTime}
            </p>
          )}
          {waNumber && (
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '12px', background: '#25d366', color: '#fff', padding: '7px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}
            >
              💬 WhatsApp Us
            </a>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} VIGO CREAKERS. All rights reserved. | Celebrating Diwali with Quality &amp; Safety 🎆</p>
      </div>
    </footer>
  );
};

export default Footer;

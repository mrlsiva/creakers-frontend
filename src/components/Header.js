import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const anchor = (hash) => isHome ? hash : `/${hash}`;

  return (
    <header className="header">
      <div className="header-banner">
        <div className="banner-scroll">
          🎆 Diwali Booking Started...! | 80% Discount offer 🎆 | Minimum order for Tamil Nadu ₹3,000/- | Other states ₹5,000/-
        </div>
      </div>
      <div className="header-top">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <span className="logo-icon">💥</span>
          <span>VIGO CREAKERS</span>
        </Link>
        <nav>
          <ul className="nav-links">
            <li><a href={anchor('#home')}>Home</a></li>
            <li>
              <Link to="/products" className={pathname === '/products' ? 'nav-active' : ''}>
                Products
              </Link>
            </li>
            <li><a href={anchor('#about')}>About</a></li>
            <li><a href={anchor('#safety')}>Safety Tips</a></li>
            <li><a href={anchor('#price')}>Price List</a></li>
            <li>
              <Link to="/quick-enquiry" className={pathname === '/quick-enquiry' ? 'nav-active' : ''}>
                Quick Enquiry
              </Link>
            </li>
            <li>
              <Link to="/contact" className={pathname === '/contact' ? 'nav-active' : ''}>Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <Link to="/order-track" className={`btn btn-secondary${pathname === '/order-track' ? ' nav-active' : ''}`}>Order Track</Link>
          <a href="https://wa.me/919876543210" className="whatsapp-icon" title="WhatsApp">
            💬
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

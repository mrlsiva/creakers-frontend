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
            <li><Link to="/" className={isHome ? 'nav-active' : ''}>Home</Link></li>
            <li><a href={anchor('#about')}>About</a></li>
            <li>
              <Link to="/products" className={pathname === '/products' ? 'nav-active' : ''}>
                Categories
              </Link>
            </li>
            <li><a href={anchor('#how-to-order')}>How to Order</a></li>
            <li>
              <Link to="/contact" className={pathname === '/contact' ? 'nav-active' : ''}>Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <a href="tel:+919876543210" className="call-now">
            <span aria-hidden="true">📞</span> Call Now
          </a>
          <Link to="/quick-enquiry" className="btn btn-order-now">Order Now</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getContentPage, resolveAssetUrl } from '../services/api';

const DEFAULT_BANNER_TEXT = '🎆 Diwali Booking Started...! | 80% Discount offer 🎆 | Minimum order for Tamil Nadu ₹3,000/- | Other states ₹5,000/-';

const stripHtml = (html) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent?.replace(/\s+/g, ' ').trim() || '';
};

const Header = ({ site }) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const anchor = (hash) => isHome ? hash : `/${hash}`;
  const [bannerText, setBannerText] = useState(DEFAULT_BANNER_TEXT);

  useEffect(() => {
    let cancelled = false;
    getContentPage(undefined, 'banner-scrolling-text')
      .then((res) => {
        const text = stripHtml(res?.data?.body);
        if (!cancelled && res?.success && text) {
          setBannerText(text);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header className="header">
      <div className="header-banner">
        <div className="banner-scroll">
          {bannerText}
        </div>
      </div>
      <div className="header-top">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          {site?.logo ? (
            <img src={resolveAssetUrl(site.logo)} alt={site.name || 'Logo'} className="logo-image" />
          ) : (
            <span className="logo-icon">💥</span>
          )}
          <span>{site?.name ? site.name.toUpperCase() : 'VIGO CREAKERS'}</span>
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

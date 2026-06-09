import React, { useState, useEffect, useRef } from 'react';
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
  const isHome = pathname === '/home';
  const [bannerText, setBannerText] = useState(DEFAULT_BANNER_TEXT);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        setHeaderHeight(height);
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, [bannerText]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

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
    <header className="header" ref={headerRef}>
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
        <button
          type="button"
          className={`nav-toggle${menuOpen ? ' nav-toggle-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
        <nav
          className={menuOpen ? 'nav-open' : ''}
          style={{ '--header-height': `${headerHeight}px` }}
        >
          <ul className="nav-links">
            <li><Link to="/home" className={isHome ? 'nav-active' : ''}>Home</Link></li>
            <li><Link to="/about-us" className={pathname === '/about-us' ? 'nav-active' : ''}>About</Link></li>
            <li>
              <Link to="/products" className={pathname === '/products' ? 'nav-active' : ''}>
                Categories
              </Link>
            </li>
            <li><Link to="/how-to-order" className={pathname === '/how-to-order' ? 'nav-active' : ''}>How to Order</Link></li>
            <li>
              <Link to="/contact" className={pathname === '/contact' ? 'nav-active' : ''}>Contact</Link>
            </li>
          </ul>
          <div className="header-actions header-actions-mobile">
            <a href="tel:+919876543210" className="call-now">
              <span aria-hidden="true">📞</span> Call Now
            </a>
            <Link to="/" className="btn btn-order-now">Order Now</Link>
          </div>
        </nav>
        <div className="header-actions header-actions-desktop">
          <a href="tel:+919876543210" className="call-now">
            <span aria-hidden="true">📞</span> Call Now
          </a>
          <Link to="/" className="btn btn-order-now">Order Now</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

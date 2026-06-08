import React, { useState, useEffect } from 'react';
import { getHomeBanner, resolveAssetUrl } from '../services/api';

const FESTIVAL_DATE = new Date('2026-11-08T00:00:00');

const MOBILE_QUERY = '(max-width: 768px)';

const DEFAULT_BANNER = {
  image: '',
  mobile_image: '',
  title: 'Vigo Crackers',
  second_title: 'Light Up Your Celebrations',
  description: 'Experience the finest selection of premium fireworks and crackers. Safe, certified, and delivered to your doorstep.',
  top_small_description: 'Premium Quality Fireworks Since 1990',
  buttons: [
    { label: 'Shop Now', url: '#products-page', open_in_new_tab: false },
    { label: 'View Catalog', url: '#catalog', open_in_new_tab: false },
  ],
};

const getTimeLeft = () => {
  const diff = Math.max(0, FESTIVAL_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const pad = (n) => String(n).padStart(2, '0');

const Home = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [banner, setBanner] = useState(DEFAULT_BANNER);
  const [bannerLoading, setBannerLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const handleChange = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const tick = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    let cancelled = false;
    getHomeBanner()
      .then((res) => {
        if (!cancelled && res?.success && res.data) {
          setBanner(res.data);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setBannerLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const heroImage = (isMobile && banner.mobile_image) ? banner.mobile_image : banner.image;

  if (bannerLoading) {
    return (
      <div className="page-loader">
        <span className="page-loader-icon">💥</span>
        <span className="page-loader-spinner" />
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section
        className="hero"
        style={heroImage ? { backgroundImage: `url(${resolveAssetUrl(heroImage)})` } : undefined}
      >
        <div className="hero-content">
          <span className="hero-badge">✨ {banner.top_small_description}</span>
          <h1>{banner.title}</h1>
          <h2 className="hero-subtitle">{banner.second_title}</h2>
          <p>{banner.description}</p>
          <div className="hero-cta">
            {banner.buttons?.map((btn, idx) => (
              <a
                key={idx}
                href={btn.url}
                target={btn.open_in_new_tab ? '_blank' : undefined}
                rel={btn.open_in_new_tab ? 'noopener noreferrer' : undefined}
                className={`btn ${idx === 0 ? 'btn-primary' : 'btn-outline-gold'} btn-lg`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Festival Countdown Offer */}
      <section className="festival-offer">
        <div className="festival-offer-card">
          <div className="festival-offer-info">
            <h2>Diwali Festival Special Offer</h2>
            <p>Exclusive deals ending soon. Hurry up!</p>
            <a href="#products-page" className="btn btn-primary">Shop Festival Offers</a>
          </div>
          <div className="countdown">
            <div className="countdown-item">
              <span className="countdown-value">{pad(timeLeft.days)}</span>
              <span className="countdown-label">Days</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-item">
              <span className="countdown-value">{pad(timeLeft.hours)}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-item">
              <span className="countdown-value">{pad(timeLeft.minutes)}</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-item">
              <span className="countdown-value">{pad(timeLeft.seconds)}</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="page-container">
        {/* Offer Banner */}
        <section style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, #FFD700, #FF8C00)',
            color: '#8B0000',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '40px'
          }}>
            <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>🎉 80% Discount Offer! 🎉</h2>
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>Minimum order for Tamil Nadu ₹3,000/- | Other states ₹5,000/-</p>
            <p style={{ fontSize: '14px' }}>Limited time offer - Order before stocks end!</p>
          </div>
        </section>

        {/* How to Order Section */}
        <section id="how-to-order" style={{ marginBottom: '40px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#CC0033', fontSize: '28px' }}>How to Order</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {[
              { num: '1', title: 'Browse Products', desc: 'Choose from our wide range of crackers and fireworks' },
              { num: '2', title: 'Add to Cart', desc: 'Select your favorite products and add to cart' },
              { num: '3', title: 'Fill Details', desc: 'Enter your shipping and contact information' },
              { num: '4', title: 'Confirm Order', desc: 'Review and confirm your order placement' }
            ].map((step, idx) => (
              <div key={idx} style={{
                background: '#f5f5f5',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                border: '2px solid #FFD700',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: '#CC0033',
                  color: 'white',
                  borderRadius: '50%',
                  margin: '0 auto 15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
                  {step.num}
                </div>
                <h3 style={{ marginBottom: '10px', color: '#333' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: '#666' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Tips Preview */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#CC0033', fontSize: '28px' }}>Safety Tips</h2>
          <div style={{
            background: 'linear-gradient(135deg, #FFF8DC, #FFE4B5)',
            padding: '30px',
            borderRadius: '8px',
            borderLeft: '5px solid #FF8C00'
          }}>
            <ul style={{ columns: 2, gap: '20px', fontSize: '14px', lineHeight: '1.8' }}>
              <li>🔥 Always use crackers in open space</li>
              <li>👶 Keep away from children and pets</li>
              <li>💧 Have water and first aid nearby</li>
              <li>👁️ Wear safety goggles while lighting</li>
              <li>🌙 Don't burst after sunset</li>
              <li>📦 Store in cool, dry place</li>
            </ul>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{
          background: 'linear-gradient(135deg, #CC0033, #8B0000)',
          color: 'white',
          padding: '40px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '15px' }}>Ready for Diwali Celebrations?</h2>
          <p style={{ marginBottom: '20px', fontSize: '16px' }}>Browse our complete collection and place your order today!</p>
          <a href="#quick-enquiry" className="btn btn-primary">Get Quick Enquiry Form</a>
        </section>
      </div>
    </div>
  );
};

export default Home;

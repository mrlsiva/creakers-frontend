import React, { useEffect, useState } from 'react';
import { getContentPage, resolveAssetUrl } from '../services/api';
import './AboutUs.css';


const AboutUs = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getContentPage(undefined, 'about-us')
      .then((res) => {
        if (!cancelled && res?.success && res.data) setAbout(res.data);
      })
      .catch(() => { })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="au-page">
        <div className="au-hero">
          <div className="au-hero-inner">
            <h1 className="au-hero-title">About Us</h1>
          </div>
        </div>
        <div className="au-loading">
          {[...Array(3)].map((_, i) => <div key={i} className="au-sk-block" />)}
        </div>
      </div>
    );
  }

  if (!about) return null;

  return (
    <div className="au-page">
      <div className="au-hero">
        <div className="au-hero-inner">
          {about.tag && <span className="au-hero-tag">{about.tag}</span>}
          <h1 className="au-hero-title">{about.title || 'About Us'}</h1>
        </div>
      </div>

      <div className="au-body">
        {about.image && (
          <div className="au-media">
            <img src={resolveAssetUrl(about.image)} alt={about.title || 'About Us'} />
          </div>
        )}

        <div className="au-content" dangerouslySetInnerHTML={{ __html: about.body || '' }} />

        {Array.isArray(about.features) && about.features.length > 0 && (
          <div className="au-features">
            {about.features.map((feature, idx) => (
              <div className="au-feature" key={idx}>
                <span className="au-feature-icon">
                  <i className={`fas fa-${feature.icon}`} />
                </span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUs;

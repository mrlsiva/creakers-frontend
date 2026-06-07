import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Products from './components/Products';
import QuickEnquiry from './components/QuickEnquiry';
import OrderTrack from './components/OrderTrack';
import Contact from './components/Contact';
import UnderMaintenance from './components/UnderMaintenance';
import { getSite, resolveAssetUrl } from './services/api';

function App() {
  const [site, setSite] = useState(null);
  const [siteLoading, setSiteLoading] = useState(true);
  const [siteError, setSiteError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getSite()
      .then((res) => {
        if (cancelled) return;
        if (res?.success && res.data) {
          setSite(res.data);
        } else {
          setSiteError(true);
        }
      })
      .catch(() => {
        if (!cancelled) setSiteError(true);
      })
      .finally(() => {
        if (!cancelled) setSiteLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!site) return;

    if (site.title) {
      document.title = site.title;
    }

    if (site.nav_icon) {
      let favicon = document.querySelector("link[rel~='icon']");
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
      }
      favicon.href = resolveAssetUrl(site.nav_icon);
    }
  }, [site]);

  if (siteLoading) {
    return (
      <div className="page-loader">
        {site?.logo ? (
          <img src={resolveAssetUrl(site.logo)} alt={site.name || 'Logo'} className="page-loader-logo" />
        ) : (
          <span className="page-loader-icon">💥</span>
        )}
        <span className="page-loader-spinner" />
      </div>
    );
  }

  if (siteError) {
    return <UnderMaintenance />;
  }

  return (
    <BrowserRouter>
      <Header site={site} />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/quick-enquiry" element={<QuickEnquiry />} />
          <Route path="/order-track" element={<OrderTrack />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

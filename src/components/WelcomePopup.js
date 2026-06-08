import React, { useEffect, useState } from 'react';
import { getContentPage } from '../services/api';

const STORAGE_KEY = 'vigo_popup_shown';

const WelcomePopup = () => {
  const [content, setContent] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let cancelled = false;
    getContentPage(undefined, 'popup')
      .then((res) => {
        if (cancelled) return;
        if (res?.success && res.data?.body) {
          setContent(res.data);
          setVisible(true);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  if (!visible || !content) return null;

  return (
    <div className="site-popup-overlay" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="site-popup-modal">
        <div className="site-popup-header">
          <h3>{content.title}</h3>
          <button type="button" className="site-popup-close" aria-label="Close" onClick={close}>✕</button>
        </div>
        <div className="site-popup-body" dangerouslySetInnerHTML={{ __html: content.body }} />
      </div>
    </div>
  );
};

export default WelcomePopup;

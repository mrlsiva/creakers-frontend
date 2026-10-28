import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useOrdersStatus } from '../OrdersStatusContext';

const DEFAULT_CLOSED_MESSAGE = 'Online orders are currently closed.';

// Slim strip rendered inside the fixed header on every page while orders are closed.
// Only the message's first line fits here; "Details" opens the full message.
export const OrdersClosedBanner = () => {
  const { ordersEnabled, closedMessage, openNotice } = useOrdersStatus();
  if (ordersEnabled) return null;

  const headline = (closedMessage || '').split('\n').find((line) => line.trim()) || DEFAULT_CLOSED_MESSAGE;

  return (
    <div className="orders-closed-banner" role="status">
      <span className="orders-closed-banner-text">{headline.trim()}</span>
      <button type="button" className="orders-closed-banner-more" onClick={openNotice}>
        Details
      </button>
    </div>
  );
};

// Modal shown once per session when orders are closed, and whenever an order is rejected as closed.
export const OrdersClosedPopup = () => {
  const { ordersEnabled, closedMessage, noticeOpen, closeNotice } = useOrdersStatus();
  const visible = !ordersEnabled && noticeOpen;

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') closeNotice(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [visible, closeNotice]);

  if (!visible) return null;

  return (
    <div className="site-popup-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeNotice(); }}>
      <div className="site-popup-modal orders-closed-modal" role="dialog" aria-modal="true" aria-labelledby="orders-closed-title">
        <div className="site-popup-header">
          <h3 id="orders-closed-title">Online Orders Closed</h3>
          <button type="button" className="site-popup-close" aria-label="Close" onClick={closeNotice}>✕</button>
        </div>
        <div className="orders-closed-body">
          <p className="orders-closed-message">{closedMessage || DEFAULT_CLOSED_MESSAGE}</p>
          <p className="orders-closed-hint">
            You can still browse products, download the price list and track existing orders.
          </p>
          <div className="orders-closed-actions">
            <Link to="/order-track" className="orders-closed-btn-secondary" onClick={closeNotice}>
              Track an Order
            </Link>
            <button type="button" className="orders-closed-btn" onClick={closeNotice}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

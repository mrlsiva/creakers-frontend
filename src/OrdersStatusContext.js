import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { getSiteFresh } from './services/api';

const NOTICE_SEEN_KEY = 'vigo_orders_closed_seen';
const REFRESH_MIN_GAP = 60 * 1000;       // re-check on tab focus at most once a minute
const REFRESH_INTERVAL = 5 * 60 * 1000;  // background re-check while the tab stays open

// Older backends don't send orders_enabled — treat a missing flag as "open".
const statusFromSite = (site) => ({
  ordersEnabled: site?.orders_enabled !== false,
  closedMessage: site?.orders_enabled === false ? site?.orders_closed_message || '' : '',
});

const noticeSeen = () => {
  try { return !!sessionStorage.getItem(NOTICE_SEEN_KEY); } catch { return false; }
};

const OrdersStatusContext = createContext({
  ordersEnabled: true,
  closedMessage: '',
  noticeOpen: false,
  openNotice: () => {},
  closeNotice: () => {},
  markOrdersClosed: () => {},
});

export const OrdersStatusProvider = ({ initialSite, children }) => {
  const [status, setStatus] = useState(() => statusFromSite(initialSite));
  const [noticeOpen, setNoticeOpen] = useState(false);
  const lastFetchRef = useRef(0);

  const refresh = useCallback(() => {
    lastFetchRef.current = Date.now();
    getSiteFresh()
      .then((res) => { if (res?.success && res.data) setStatus(statusFromSite(res.data)); })
      .catch(() => {});
  }, []);

  // The site payload in the app cache can be up to 30 minutes old, and the admin
  // can switch orders on/off at any time — so always re-check from the API.
  useEffect(() => {
    refresh();
    const onVisible = () => {
      if (document.visibilityState === 'visible' && Date.now() - lastFetchRef.current > REFRESH_MIN_GAP) {
        refresh();
      }
    };
    document.addEventListener('visibilitychange', onVisible);
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') refresh();
    }, REFRESH_INTERVAL);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      clearInterval(timer);
    };
  }, [refresh]);

  // Pop the notice once per session when orders are closed; drop it if they reopen.
  useEffect(() => {
    if (status.ordersEnabled) setNoticeOpen(false);
    else if (!noticeSeen()) setNoticeOpen(true);
  }, [status.ordersEnabled]);

  const closeNotice = useCallback(() => {
    try { sessionStorage.setItem(NOTICE_SEEN_KEY, '1'); } catch {}
    setNoticeOpen(false);
  }, []);

  const openNotice = useCallback(() => setNoticeOpen(true), []);

  // Called when the order API rejects with orders_enabled: false (page was open when orders closed).
  const markOrdersClosed = useCallback((message) => {
    setStatus((prev) => ({ ordersEnabled: false, closedMessage: message || prev.closedMessage }));
    setNoticeOpen(true);
  }, []);

  return (
    <OrdersStatusContext.Provider value={{ ...status, noticeOpen, openNotice, closeNotice, markOrdersClosed }}>
      {children}
    </OrdersStatusContext.Provider>
  );
};

export const useOrdersStatus = () => useContext(OrdersStatusContext);

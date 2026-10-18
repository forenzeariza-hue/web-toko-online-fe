const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Mirrors Google's gtag.js bootstrap so events queue before the script loads.
function gtag(...args) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/**
 * Loads gtag.js once. Does nothing when VITE_GA_MEASUREMENT_ID is missing,
 * so local development without analytics stays clean.
 */
export function initAnalytics() {
  if (!MEASUREMENT_ID || window.__gaInitialized) return;
  window.__gaInitialized = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  gtag('js', new Date());
  // Page views are sent manually on route change, so skip the automatic one.
  gtag('config', MEASUREMENT_ID, { send_page_view: false });
}

export function trackPageView(path) {
  if (!MEASUREMENT_ID) return;

  gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(name, params = {}) {
  if (!MEASUREMENT_ID) return;

  gtag('event', name, params);
}

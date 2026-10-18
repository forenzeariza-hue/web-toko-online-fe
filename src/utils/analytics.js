const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/**
 * Mirrors Google's official gtag.js snippet: commands are queued on
 * window.dataLayer by a window.gtag function, and gtag.js processes that
 * queue once it loads.
 */
function bootstrapGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
}

/**
 * Loads gtag.js once. Does nothing when VITE_GA_MEASUREMENT_ID is missing,
 * so local development without analytics stays clean.
 */
export function initAnalytics() {
  if (!MEASUREMENT_ID || window.__gaInitialized) return;
  window.__gaInitialized = true;

  bootstrapGtag();

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  // Page views are sent manually on route change, so skip the automatic one.
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false });
}

export function trackPageView(path) {
  if (!MEASUREMENT_ID || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(name, params = {}) {
  if (!MEASUREMENT_ID || !window.gtag) return;

  window.gtag('event', name, params);
}

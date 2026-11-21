import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import siteConfig from './config/siteConfig';
import SEOHead from './components/SEOHead';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';

// Dedicated Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

/**
 * ScrollManager handles smooth scrolling to anchor hashes (e.g. /#estimator)
 * and resets scroll to top on standard page navigation.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const { theme } = siteConfig;

  /* Ingest theme colors dynamically onto :root */
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--brand-primary', theme.primaryHex);
    root.style.setProperty('--brand-primary-dark', theme.primaryDarkHex);
    root.style.setProperty('--brand-accent', theme.accentHex);
    root.style.setProperty('--brand-accent-hover', theme.accentHoverHex);
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F8F9F7] text-gray-900 flex flex-col font-sans selection:bg-brand-primary selection:text-white">
        {/* Dynamic SEO Meta & Schema.org JSON-LD */}
        <SEOHead />

        {/* Scroll Restoration & Anchor Hash Handler */}
        <ScrollManager />

        {/* Accessibility: Skip-to-main-content link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Top Utility Strip + Floating Pill Navigation Header */}
        <Header />

        {/* Multi-Page Route Outlet */}
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Fallback to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Final Conversion Band & Clean Footer */}
        <Footer />

        {/* Sticky Mobile Bottom Bar (md:hidden) */}
        <MobileBottomBar />
      </div>
    </BrowserRouter>
  );
}

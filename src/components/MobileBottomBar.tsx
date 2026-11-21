import { useNavigate } from 'react-router-dom';
import { Phone, Calculator, Check } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import { scrollToSection } from '../hooks/useScrollTo';
import { useSmartCall } from './SmartCallButton';

export default function MobileBottomBar() {
  const { contact } = siteConfig;
  const navigate = useNavigate();
  const { triggerCall, copied } = useSmartCall();

  const handleEstimatorClick = () => {
    if (window.location.pathname === '/') {
      scrollToSection('estimator');
    } else {
      navigate('/#estimator');
    }
  };

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center gap-2 px-3 py-2">
        {/* Call Now button: Automatically dials on mobile, copies on desktop */}
        <button
          type="button"
          onClick={triggerCall}
          className="flex-1 flex items-center justify-center gap-2 h-12 rounded-full bg-brand-primary text-white font-semibold text-sm transition-colors duration-200 hover:bg-brand-primary-dark active:bg-brand-primary-dark"
          aria-label={
            copied
              ? `Copied ${contact.phoneDisplay} to clipboard`
              : `Call us at ${contact.phoneDisplay}`
          }
        >
          {copied ? (
            <Check className="h-5 w-5 shrink-0 text-white" aria-hidden="true" />
          ) : (
            <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
          )}
          <span>{copied ? 'Copied Number!' : 'Call Now'}</span>
        </button>

        {/* Cost Estimator button */}
        <button
          type="button"
          onClick={handleEstimatorClick}
          className="flex-1 flex items-center justify-center gap-2 h-12 rounded-full bg-brand-accent text-white font-semibold text-sm transition-colors duration-200 hover:bg-brand-accent-hover active:bg-brand-accent-hover"
          aria-label="Open cost estimator"
        >
          <Calculator className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>Cost Estimator</span>
        </button>
      </div>
    </div>
  );
}

import { Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, Clock, Shield, Fence, Calculator, Check } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import { scrollToSection } from '../hooks/useScrollTo';
import SmartCallButton, { useSmartCall } from './SmartCallButton';

export default function Footer() {
  const { brand, contact } = siteConfig;
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const { triggerCall, copied, phoneDisplay } = useSmartCall();

  const handleEstimatorClick = () => {
    if (window.location.pathname === '/') {
      scrollToSection('estimator');
    } else {
      navigate('/#estimator');
    }
  };

  return (
    <>
      {/* ============================================================ */}
      {/*  Final Conversion Band (Deep Forest Green Banner)             */}
      {/* ============================================================ */}
      <section
        aria-label="Call to Action"
        className="relative bg-brand-primary py-16 sm:py-20 text-white overflow-hidden"
      >
        {/* Subtle background decorative shapes */}
        <div
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-black/10 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm mb-4">
            <Shield className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Licensed &amp; Insured Contractor</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Ready For A Straight, Solid Fence That Lasts?
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/90 mb-8 leading-relaxed">
            Get an instant ballpark price with our online calculator, or talk directly with our
            lead installer for a free on-site yard measurement.
          </p>

          {/* Two large 48px action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleEstimatorClick}
              className="flex w-full sm:w-auto min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-accent px-8 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:bg-brand-accent-hover active:scale-[0.99]"
            >
              <Calculator className="h-5 w-5" aria-hidden="true" />
              <span>Calculate Instant Estimate</span>
            </button>

            <SmartCallButton
              variant="outline"
              className="w-full sm:w-auto text-base"
            >
              Call {contact.phoneDisplay}
            </SmartCallButton>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Dark Charcoal Clean Footer                                  */}
      {/* ============================================================ */}
      <footer
        className="bg-[#111312] text-gray-300 pt-16 pb-24 md:pb-12 border-t border-white/10"
        role="contentinfo"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Col 1: Brand Info */}
            <div className="space-y-4">
              <Link to="/" className="inline-flex items-center gap-2">
                {brand.logoUrl ? (
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    width={140}
                    height={36}
                    className="h-8 w-auto"
                  />
                ) : (
                  <>
                    <Fence className="h-6 w-6 text-brand-accent" aria-hidden="true" />
                    <span className="text-xl font-bold tracking-tight text-white">
                      {brand.name}
                    </span>
                  </>
                )}
              </Link>
              <p className="text-xs text-gray-400 leading-relaxed">
                Residential and commercial fence contractor serving {contact.regionName}.
                Specializing in wood privacy, premium vinyl, ornamental iron, and chain link
                installations.
              </p>
              {contact.licenseBadge && (
                <div className="inline-block rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-gray-300 border border-white/10">
                  {contact.licenseBadge}
                </div>
              )}
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <div className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                Explore Pages
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-white transition-colors min-h-[44px] flex items-center"
                  >
                    Fence Styles &amp; Materials
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleEstimatorClick}
                    className="text-gray-400 hover:text-white transition-colors min-h-[44px] flex items-center cursor-pointer"
                  >
                    Instant Cost Calculator
                  </button>
                </li>
                <li>
                  <Link
                    to="/portfolio"
                    className="text-gray-400 hover:text-white transition-colors min-h-[44px] flex items-center"
                  >
                    Installation Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors min-h-[44px] flex items-center"
                  >
                    About Our Company
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about#reviews"
                    className="text-gray-400 hover:text-white transition-colors min-h-[44px] flex items-center"
                  >
                    Verified Customer Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white transition-colors min-h-[44px] flex items-center"
                  >
                    Contact &amp; Free Measure
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Direct Contact */}
            <div>
              <div className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                Contact &amp; Hours
              </div>
              <ul className="space-y-3 text-xs sm:text-sm">
                <li>
                  <button
                    type="button"
                    onClick={triggerCall}
                    className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors min-h-[44px] cursor-pointer text-left"
                    aria-label={
                      copied
                        ? `Copied ${phoneDisplay} to clipboard`
                        : `Call or copy phone ${phoneDisplay}`
                    }
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-400 shrink-0" aria-hidden="true" />
                    ) : (
                      <Phone className="h-4 w-4 text-brand-accent shrink-0" aria-hidden="true" />
                    )}
                    <span className="font-semibold text-white">
                      {copied ? 'Copied Number!' : phoneDisplay}
                    </span>
                  </button>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors min-h-[44px]"
                    aria-label={`Email ${contact.email}`}
                  >
                    <Mail className="h-4 w-4 text-brand-accent shrink-0" aria-hidden="true" />
                    <span>{contact.email}</span>
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-gray-400 min-h-[44px]">
                  <Clock className="h-4 w-4 text-brand-accent shrink-0" aria-hidden="true" />
                  <span>{contact.hours}</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Service Areas */}
            <div>
              <div className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                Service Communities
              </div>
              <div className="flex flex-wrap gap-1.5 text-xs text-gray-400">
                {contact.serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded bg-white/5 px-2 py-1 hover:text-white transition-colors"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-[11px] text-gray-500">
                Serving {contact.regionName} &amp; surrounding areas
              </div>
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div>
              &copy; {currentYear} {brand.name}. All rights reserved. Professional Fence
              Installation in {contact.regionName}.
            </div>
            <div className="flex items-center gap-6">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Licensed &amp; Insured</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

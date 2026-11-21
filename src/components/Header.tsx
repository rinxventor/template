import { useState, useEffect, forwardRef, type AnchorHTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, Fence, Check } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import { scrollToSection } from '../hooks/useScrollTo';
import CardNav, { type CardNavItem, type CardNavLink } from './CardNav';
import { useSmartCall } from './SmartCallButton';

/**
 * Custom Link Component adapter for CardNav to seamlessly support
 * React Router client-side transitions and smooth anchor scrolling.
 */
const NavLinkAdapter = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ href, onClick, children, ...props }, ref) => {
    const navigate = useNavigate();

    return (
      <a
        ref={ref}
        href={href}
        onClick={(e) => {
          onClick?.(e);
          if (e.defaultPrevented) return;
          if (!href) return;

          // External or protocol links
          if (
            href.startsWith('tel:') ||
            href.startsWith('mailto:') ||
            href.startsWith('http://') ||
            href.startsWith('https://')
          ) {
            return;
          }

          e.preventDefault();

          if (href.startsWith('/#') || href.startsWith('#')) {
            const hash = href.includes('#') ? href.split('#')[1] : '';
            if (window.location.pathname === '/') {
              scrollToSection(hash);
            } else {
              navigate(href);
            }
          } else {
            navigate(href);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        {...props}
      >
        {children}
      </a>
    );
  },
);
NavLinkAdapter.displayName = 'NavLinkAdapter';

export default function Header() {
  const { brand, contact, theme } = siteConfig;
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { triggerCall, copied, phoneDisplay } = useSmartCall();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems: CardNavItem[] = [
    {
      label: 'Services',
      description: 'Wood privacy, vinyl, iron & chain link.',
      links: [
        {
          label: 'Fence Styles',
          href: '/services',
        },
        {
          label: 'Cost Estimator',
          href: '/#estimator',
        },
      ],
    },
    {
      label: 'Portfolio',
      description: 'Recent Central Florida installations.',
      links: [
        {
          label: 'Project Gallery',
          href: '/portfolio',
        },
        {
          label: 'Verified Reviews',
          href: '/about#reviews',
        },
      ],
    },
    {
      label: 'About',
      description: '20+ years master fence craftsmanship.',
      links: [
        {
          label: 'Our Story',
          href: '/about',
        },
        {
          label: 'Install Process',
          href: '/about#process',
        },
      ],
    },
    {
      label: 'Contact',
      description: 'Free on-site yard measurements.',
      links: [
        {
          label: 'Contact Us',
          href: '/contact',
        },
        {
          label: 'Service Areas',
          href: '/contact#areas',
        },
      ],
    },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 pointer-events-none transition-all duration-300">
      {/* ============================================================ */}
      {/*  Top Utility Strip                                           */}
      {/* ============================================================ */}
      <div
        className={`pointer-events-auto w-full bg-black/50 backdrop-blur-md text-white border-b border-white/10 transition-all duration-300 ${
          scrolled ? 'opacity-0 -translate-y-full max-h-0 py-0 overflow-hidden border-none' : 'opacity-100 translate-y-0 max-h-12'
        }`}
        aria-hidden={scrolled}
      >
        {/* Mobile: compact centred bar */}
        <div className="flex items-center justify-center gap-2 px-4 py-1.5 text-xs lg:hidden">
          <button
            type="button"
            onClick={triggerCall}
            className="flex items-center gap-1.5 min-h-[36px] font-semibold hover:underline cursor-pointer"
            aria-label={
              copied
                ? `Copied ${phoneDisplay} to clipboard`
                : `Call or copy phone number ${phoneDisplay}`
            }
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-400" aria-hidden="true" />
            ) : (
              <Phone className="h-3.5 w-3.5 text-brand-accent" aria-hidden="true" />
            )}
            <span>{copied ? 'Copied Number!' : phoneDisplay}</span>
          </button>
          <span className="text-white/40">•</span>
          <span className="text-white/80 font-medium">{contact.regionName}</span>
        </div>

        {/* Desktop: full-width bar */}
        <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto px-6 py-1.5 text-xs">
          <span className="text-white/80 font-medium tracking-wide">{brand.tagline}</span>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={triggerCall}
              className="flex items-center gap-1.5 min-h-[36px] font-medium hover:underline cursor-pointer"
              aria-label={
                copied
                  ? `Copied ${phoneDisplay} to clipboard`
                  : `Call or copy phone number ${phoneDisplay}`
              }
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-400" aria-hidden="true" />
              ) : (
                <Phone className="h-3.5 w-3.5 text-brand-accent" aria-hidden="true" />
              )}
              <span className="font-semibold">{copied ? 'Copied to Clipboard!' : phoneDisplay}</span>
            </button>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-1.5 min-h-[36px] font-medium hover:underline text-white/80 hover:text-white"
              aria-label={`Email ${contact.email}`}
            >
              <Mail className="h-3.5 w-3.5 text-brand-accent" aria-hidden="true" />
              <span>{contact.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  CardNav Navigation Bar                                      */}
      {/* ============================================================ */}
      <div
        className={`pointer-events-auto mx-3 md:mx-auto max-w-5xl transition-all duration-300 ${
          scrolled ? 'mt-2' : 'mt-2 md:mt-3'
        }`}
      >
        <CardNav
          linkComponent={NavLinkAdapter}
          logo={
            brand.logoUrl ? (
              <img
                src={brand.logoUrl}
                alt={brand.name}
                width={140}
                height={32}
                className="h-7 w-auto"
              />
            ) : (
              <span className="flex items-center gap-1.5 font-bold tracking-tight text-white text-base">
                <Fence className="h-5 w-5 text-brand-accent shrink-0" aria-hidden="true" />
                <span>{brand.name}</span>
              </span>
            )
          }
          logoAlt={`${brand.name} Home`}
          logoHref="/"
          items={navItems}
          cta={{
            label: 'Instant Estimate',
            href: '/#estimator',
            onClick: () => {
              if (window.location.pathname === '/') {
                scrollToSection('estimator');
              } else {
                navigate('/#estimator');
              }
            },
          }}
          theme="dark"
          surface="glass"
          cardEffect="rise"
          openOn="click"
          maxWidth={920}
          accentColor={theme.accentHex}
          onLinkClick={(link: CardNavLink) => {
            if (link.href?.startsWith('/#') || link.href?.startsWith('#')) {
              const hash = link.href.includes('#') ? link.href.split('#')[1] : '';
              if (window.location.pathname === '/') {
                scrollToSection(hash);
              } else {
                navigate(link.href);
              }
            } else if (link.href && link.href.startsWith('/')) {
              navigate(link.href);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        />
      </div>
    </header>
  );
}

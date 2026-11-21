import { Star, ArrowDown, ShieldCheck } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import { scrollToSection } from '../hooks/useScrollTo';
import SpotlightCard from './SpotlightCard';

function Hero() {
  const { hero, socialProof, contact, brand } = siteConfig;

  return (
    <section
      aria-label="Hero"
      className="relative min-h-[640px] md:min-h-[720px] lg:min-h-[780px] w-full pb-24 md:pb-28"
    >
      {/* Hero Image – LCP critical */}
      <img
        src={hero.heroImage}
        alt={hero.heroImageAlt}
        fetchPriority="high"
        decoding="sync"
        width={1600}
        height={1000}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/80 lg:bg-gradient-to-r lg:from-black/90 lg:via-black/65 lg:to-black/30" />

      {/* Hero Content: Balanced top padding ensuring content begins cleanly underneath the floating nav */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-36 sm:pt-40 md:pt-44 lg:pt-48">
        <div className="max-w-2xl">
          {/* License Badge Pill */}
          {contact.licenseBadge && (
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-accent" aria-hidden="true" />
              <span>{contact.licenseBadge}</span>
            </span>
          )}

          {/* H1 Headline */}
          <h1 className="mb-4 text-[2.1rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl md:mb-6 lg:text-6xl">
            {hero.headline}
          </h1>

          {/* Subheadline */}
          <p className="mb-6 max-w-xl text-base text-white/90 sm:text-lg leading-relaxed">
            {hero.subheadline}
          </p>

          {/* Social Proof Rating Row */}
          <div className="flex flex-wrap gap-3">
            {/* Google Badge */}
            {socialProof.google && (
              <a
                href={socialProof.google.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3.5 py-2 backdrop-blur-sm transition-colors hover:bg-white/25 shadow-sm"
                aria-label={`Google reviews: ${socialProof.google.rating} stars from ${socialProof.google.reviewCount} reviews`}
              >
                {/* Google "G" circle */}
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#4285F4]">
                  G
                </span>
                {/* Stars */}
                <span className="flex items-center gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-[#F59E0B] text-[#F59E0B]"
                    />
                  ))}
                </span>
                <span className="text-xs font-medium text-white">
                  {socialProof.google.rating}{' '}
                  <span className="text-white/70">
                    · {socialProof.google.reviewCount} Reviews
                  </span>
                </span>
              </a>
            )}

            {/* Facebook Badge */}
            {socialProof.facebook && (
              <a
                href={socialProof.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3.5 py-2 backdrop-blur-sm transition-colors hover:bg-white/25 shadow-sm"
                aria-label={`Facebook reviews: ${socialProof.facebook.rating} stars from ${socialProof.facebook.reviewCount} reviews`}
              >
                {/* Facebook "f" circle */}
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1877F2] text-[11px] font-bold text-white">
                  f
                </span>
                {/* Stars */}
                <span className="flex items-center gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-[#F59E0B] text-[#F59E0B]"
                    />
                  ))}
                </span>
                <span className="text-xs font-medium text-white">
                  {socialProof.facebook.rating}{' '}
                  <span className="text-white/70">
                    · {socialProof.facebook.reviewCount} Reviews
                  </span>
                </span>
              </a>
            )}
          </div>

          {/* Mobile Primary Action */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => scrollToSection('estimator')}
              className="mt-6 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-brand-accent font-semibold text-white transition-colors hover:bg-brand-accent-hover active:bg-brand-accent-hover shadow-md"
            >
              Calculate My Fence Cost
              <ArrowDown size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Desktop Real Local Fencing Contractor Spotlight Card */}
        <div className="pointer-events-none absolute bottom-28 right-8 hidden lg:flex">
          <SpotlightCard
            theme="dark"
            spotlightColor="#C8490E"
            intensity={0.4}
            spotlightSize={280}
            softness={0.8}
            className="pointer-events-auto max-w-sm !p-5 border border-white/20 !rounded-2xl backdrop-blur-xl shadow-2xl"
          >
            <div className="flex items-start gap-3.5">
              <img
                src={brand.ownerAvatar}
                alt={brand.ownerName}
                width={52}
                height={52}
                loading="lazy"
                decoding="async"
                className="h-13 w-13 flex-shrink-0 rounded-full object-cover border-2 border-brand-accent shadow-md"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-brand-accent">
                    Real Local Contractor
                  </span>
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/80 font-mono">
                    #FL-849201
                  </span>
                </div>
                <p className="text-sm font-bold text-white">
                  {brand.ownerName}
                </p>
                <p className="text-xs text-white/70">{brand.ownerRole} · 20+ Yrs in Central FL</p>
                <p className="text-xs italic text-white/90 pt-1 leading-snug">
                  &ldquo;{brand.ownerQuote}&rdquo;
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

export default Hero;

import { ArrowRight, Calculator, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import siteConfig from '../config/siteConfig';
import Hero from '../components/Hero';
import QuickQuote from '../components/QuickQuote';
import Estimator from '../components/Estimator';
import SmartCallButton from '../components/SmartCallButton';
import SpotlightCard from '../components/SpotlightCard';

export default function HomePage() {
  const { contact, brand, services, gallery } = siteConfig;

  return (
    <div className="space-y-0">
      {/* 1. Full-Bleed Dark Craftsmanship Hero Section */}
      <Hero />

      {/* 2. Overlapping Floating Quick-Quote Card + Trust Badges */}
      <QuickQuote />

      {/* 3. Real Local Contractor Direct Line Quick-Bar (SpotlightCard) */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SpotlightCard
            theme="dark"
            spotlightColor="#C8490E"
            intensity={0.35}
            spotlightSize={320}
            className="!p-6 sm:!p-8 !rounded-2xl border border-white/15 bg-gradient-to-br from-brand-primary to-brand-primary-dark text-white shadow-xl"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-accent" />
                  <span>Licensed Contractor Direct Line</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Speak Directly with Lead Installer
                </h2>
                <p className="text-sm text-white/80 max-w-lg leading-relaxed">
                  Have questions about Florida wind permits, HOA guidelines, or property lines?
                  On mobile, tap below to dial instantly. On desktop, click to copy our direct phone line.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
                <SmartCallButton
                  variant="accent"
                  className="w-full sm:w-auto text-base"
                >
                  Call {contact.phoneDisplay}
                </SmartCallButton>

                <a
                  href="#estimator"
                  className="w-full sm:w-auto inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-brand-primary"
                >
                  <Calculator className="h-4 w-4" />
                  <span>Calculate Cost</span>
                </a>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* 4. Interactive Live Fence Cost Estimator (Core Conversion Engine) */}
      <Estimator />

      {/* 5. Highlights Navigation Previews (Direct to Dedicated Pages) */}
      <section className="bg-white py-16 sm:py-20 border-t border-gray-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Styles Page Teaser */}
            <div className="rounded-2xl border border-gray-200 bg-[#F8F9F7] p-6 sm:p-8 flex flex-col justify-between hover:border-brand-primary/40 transition-colors">
              <div>
                <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                  Styles &amp; Specifications
                </span>
                <h3 className="text-2xl font-extrabold text-[#111827] mt-1 mb-3">
                  Explore All {services.length} Fence Styles
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Review specifications, durability ratings, warranty coverage, and maintenance
                  requirements for Wood Privacy, Vinyl/PVC, Ornamental Iron, and Chain Link.
                </p>

                {/* Micro preview grid */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {services.map((s) => (
                    <div key={s.id} className="aspect-square rounded-lg overflow-hidden bg-gray-200">
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        width={120}
                        height={120}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-accent transition-colors"
              >
                <span>View Full Fence Styles Page</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Portfolio Page Teaser */}
            <div className="rounded-2xl border border-gray-200 bg-[#F8F9F7] p-6 sm:p-8 flex flex-col justify-between hover:border-brand-primary/40 transition-colors">
              <div>
                <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                  Real Installations
                </span>
                <h3 className="text-2xl font-extrabold text-[#111827] mt-1 mb-3">
                  Local Central Florida Portfolio
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Browse recent verified residential and commercial projects completed in Winter
                  Park, Lake Nona, Dr. Phillips, Windermere, and Celebration.
                </p>

                {/* Micro preview grid */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {gallery.slice(0, 3).map((g) => (
                    <div key={g.id} className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-200">
                      <img
                        src={g.image}
                        alt={g.alt}
                        loading="lazy"
                        width={160}
                        height={120}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-accent transition-colors"
              >
                <span>Browse Full Project Portfolio</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

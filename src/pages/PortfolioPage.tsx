import { Link } from 'react-router-dom';
import { Camera, MapPin, Calculator, CheckCircle2 } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import Gallery from '../components/Gallery';
import SmartCallButton from '../components/SmartCallButton';

export default function PortfolioPage() {
  const { contact, brand } = siteConfig;

  return (
    <div>
      {/* Page Header Banner: Full-bleed top behind floating CardNav */}
      <section className="relative bg-gradient-to-b from-[#111312] via-brand-primary-dark to-brand-primary pt-36 sm:pt-40 md:pt-44 pb-16 sm:pb-20 text-white text-center px-4 overflow-hidden shadow-md">
        <div className="mx-auto max-w-4xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm border border-white/15">
            <Camera className="h-3.5 w-3.5 text-brand-accent" />
            <span>Over {brand.projectsCompleted.toLocaleString()} Fences Built</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Our Installation Portfolio
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Real residential and commercial fence projects installed across {contact.regionName}.
            Filter by material, inspect job photos, and see the clean craftsmanship on every corner.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/#estimator"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-accent px-6 py-3 font-bold text-white shadow-md hover:bg-brand-accent-hover transition-colors"
            >
              <Calculator className="h-4 w-4" />
              <span>Estimate a Similar Fence</span>
            </Link>
            <SmartCallButton variant="outline">
              Call {contact.phoneDisplay}
            </SmartCallButton>
          </div>
        </div>
      </section>

      {/* Main Interactive Gallery with Filter Pills & Lightbox */}
      <Gallery />

      {/* Local Communities Notice */}
      <section className="bg-[#F8F9F7] py-16 border-t border-gray-200/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
            Have a Neighbor with an Oakridge Fence?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From historic craftsman bungalows in Winter Park to master-planned communities in Lake
            Nona, our crews build to strict local HOA standards and city wind-load codes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {contact.serviceAreas.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-1.5 rounded-full bg-white border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-800 shadow-sm"
              >
                <MapPin className="h-3.5 w-3.5 text-brand-primary" />
                <span>{area}</span>
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

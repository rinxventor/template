import { Link } from 'react-router-dom';
import { Award, Users, ShieldCheck, HeartHandshake } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import WhyChooseUs from '../components/WhyChooseUs';
import Process from '../components/Process';
import Reviews from '../components/Reviews';
import SmartCallButton from '../components/SmartCallButton';

export default function AboutPage() {
  const { brand, contact } = siteConfig;

  return (
    <div>
      {/* Page Header Banner: Full-bleed top behind floating CardNav */}
      <section className="relative bg-gradient-to-b from-[#111312] via-brand-primary-dark to-brand-primary pt-36 sm:pt-40 md:pt-44 pb-16 sm:pb-20 text-white text-center px-4 overflow-hidden shadow-md">
        <div className="mx-auto max-w-4xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm border border-white/15">
            <Award className="h-3.5 w-3.5 text-brand-accent" />
            <span>Locally Owned &amp; Operated Since 2004</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            About {brand.name}
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            {brand.yearsInBusiness}+ years building fences that outlast Florida storms. We&apos;re a
            hands-on local team led by master craftsmen, not a faceless broker.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/#estimator"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-accent px-6 py-3 font-bold text-white shadow-md hover:bg-brand-accent-hover transition-colors"
            >
              <span>Instant Cost Estimator</span>
            </Link>
            <SmartCallButton variant="outline">
              Call {contact.phoneDisplay}
            </SmartCallButton>
          </div>
        </div>
      </section>

      {/* Craftsmanship Standards & Local Owner Story */}
      <WhyChooseUs />

      {/* Our 3-Step Process Component */}
      <div id="process">
        <Process />
      </div>

      {/* Verified Reviews Section */}
      <div id="reviews">
        <Reviews />
      </div>

      {/* Community Pledge Callout */}
      <section className="bg-white py-16 border-t border-gray-200/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider">
            <HeartHandshake className="h-4 w-4 text-brand-accent" />
            <span>Local Community Roots</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
            Rooted In Central Florida Neighborhoods
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            We sponsor local Little League teams, support historic district preservation, and work
            closely with county building officials to guarantee every fence passes inspection with
            zero delays.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 font-bold text-white hover:bg-brand-primary-dark transition-colors shadow-sm"
            >
              <span>Schedule a Free On-Site Consultation</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

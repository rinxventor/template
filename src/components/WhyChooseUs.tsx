import { Award, Hammer, ShieldCheck, FileText, CheckCircle } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import SpotlightCard from './SpotlightCard';

export default function WhyChooseUs() {
  const { brand, contact } = siteConfig;

  const standards = [
    {
      icon: Award,
      value: `${brand.yearsInBusiness}+ Years`,
      title: 'Local Experience',
      desc: `Serving homeowners across ${contact.regionName} with over ${brand.projectsCompleted.toLocaleString()} custom fences installed.`,
    },
    {
      icon: Hammer,
      value: 'Concrete-Set',
      title: 'Heavy-Duty Posts',
      desc: 'Every terminal, corner, and line post is set in 60-80 lbs of wet-poured concrete to resist high storm winds.',
    },
    {
      icon: ShieldCheck,
      value: '5-Year',
      title: 'Workmanship Warranty',
      desc: 'Our written guarantee covers gate sagging, post leaning, and hardware. We stand behind our craft.',
    },
    {
      icon: FileText,
      value: 'Guaranteed',
      title: 'Transparent Pricing',
      desc: 'Detailed itemized quotes with zero hidden disposal fees, permit surcharges, or mid-project price bumps.',
    },
  ];

  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-us-heading"
      className="bg-[#F8F9F7] py-16 sm:py-20 lg:py-24 border-t border-b border-gray-200/60"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3.5 py-1.5 text-xs font-semibold text-brand-primary uppercase tracking-wider mb-3">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Built Right The First Time</span>
          </div>
          <h2
            id="why-us-heading"
            className="text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl"
          >
            Craftsmanship Standards You Can Trust
          </h2>
          <p className="mt-3 text-base text-gray-600 sm:text-lg">
            We don&apos;t sub out our jobs to anonymous crews. Real local craftsmen building fences
            that stand straight for decades.
          </p>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {standards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm text-center"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-brand-primary tracking-tight">
                  {item.value}
                </div>
                <div className="text-sm font-bold text-[#111827] mt-1">{item.title}</div>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed hidden sm:block">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Real Local Fencing Contractor Spotlight Card */}
        <div className="max-w-4xl mx-auto">
          <SpotlightCard
            theme="light"
            spotlightColor="#C8490E"
            intensity={0.2}
            spotlightSize={320}
            proximity={120}
            className="!p-6 sm:!p-8 !rounded-2xl border border-gray-200 bg-white shadow-lg"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Owner Avatar */}
              <div className="relative shrink-0">
                <img
                  src={brand.ownerAvatar}
                  alt={brand.ownerName}
                  loading="lazy"
                  decoding="async"
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full border-4 border-brand-primary/20 object-cover shadow-sm"
                />
                <span className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary text-white shadow">
                  <CheckCircle className="h-4 w-4" />
                </span>
              </div>

              {/* Quote & Credentials */}
              <div className="text-center sm:text-left flex-1">
                <div className="inline-flex items-center gap-2 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 border border-amber-200 mb-2">
                  Real Local Fencing Contractor
                </div>
                <blockquote className="text-base sm:text-lg font-medium text-gray-800 italic leading-snug">
                  &ldquo;{brand.ownerQuote}&rdquo;
                </blockquote>

                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-extrabold text-base text-[#111827]">{brand.ownerName}</div>
                    <div className="text-xs text-gray-500">{brand.ownerRole} · Central Florida Native</div>
                  </div>
                  {contact.licenseBadge && (
                    <div className="text-xs font-semibold text-brand-primary sm:text-right">
                      {contact.licenseBadge}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

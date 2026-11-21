import { Check, ArrowRight, Shield } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import { scrollToSection } from '../hooks/useScrollTo';

export default function Services() {
  const { services, contact } = siteConfig;

  const handlePriceStyle = (materialId: string) => {
    // Dispatch custom event to notify Estimator to select this material
    window.dispatchEvent(
      new CustomEvent('select-material', {
        detail: { materialId },
      }),
    );
    scrollToSection('estimator');
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3.5 py-1.5 text-xs font-semibold text-brand-primary uppercase tracking-wider mb-3">
            <Shield className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Built For {contact.regionName} Weather</span>
          </div>
          <h2
            id="services-heading"
            className="text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl"
          >
            Fence Styles &amp; Installations
          </h2>
          <p className="mt-3 text-base text-gray-600 sm:text-lg">
            Every fence is custom-built on-site with concrete-set posts, heavy-duty hardware, and a
            5-year workmanship guarantee.
          </p>
        </div>

        {/* 1-col mobile, 2-col tablet, 4-col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <article
              key={service.id}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md overflow-hidden"
            >
              {/* Aspect 4:3 Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-brand-accent shadow-sm backdrop-blur-xs">
                  From {service.startingRate}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-lg font-bold text-[#111827]">{service.title}</h3>

                {/* Lifespan & Maintenance Tags */}
                <div className="flex flex-wrap gap-1.5 mt-2.5 mb-3">
                  <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700">
                    {service.lifespan}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700">
                    {service.maintenance}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2 mb-6 mt-auto border-t border-gray-100 pt-3">
                  {service.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary mt-0.5">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Price This Style Button */}
                <button
                  type="button"
                  onClick={() => handlePriceStyle(service.materialId)}
                  className="flex w-full min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-brand-primary bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
                  aria-label={`Price ${service.title} in the cost estimator`}
                >
                  <span>Price This Style</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ChevronDown, HelpCircle, MapPin } from 'lucide-react';
import siteConfig from '../config/siteConfig';

export default function FAQAndAreas() {
  const { faqs, contact } = siteConfig;

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-20 bg-[#F8F9F7] py-16 sm:py-20 lg:py-24 border-t border-gray-200/60"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ============================================================ */}
        {/*  Service Areas Grid                                          */}
        {/* ============================================================ */}
        <div className="mx-auto max-w-4xl text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3.5 py-1.5 text-xs font-semibold text-brand-primary uppercase tracking-wider mb-3">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Service Coverage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111827]">
            Proudly Installing Fences Across {contact.regionName}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We provide on-site yard measurements, county permit filing, and full installations in
            these communities:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
            {contact.serviceAreas.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-gray-800 shadow-2xs transition-colors hover:border-brand-primary hover:text-brand-primary"
              >
                <MapPin className="h-3 w-3 text-brand-accent shrink-0" aria-hidden="true" />
                <span>
                  {area}
                  {contact.stateCode ? `, ${contact.stateCode}` : ''}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/*  Accessible Native FAQ Accordion                             */}
        {/* ============================================================ */}
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3.5 py-1.5 text-xs font-semibold text-brand-primary uppercase tracking-wider mb-2">
              <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Got Questions?</span>
            </div>
            <h2
              id="faq-heading"
              className="text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl"
            >
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Clear answers regarding permits, property pins, tear-outs, and scheduling.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-2xl border border-gray-200 bg-white p-2 shadow-xs transition-colors open:border-brand-primary/40 open:shadow-sm"
              >
                <summary className="flex min-h-[48px] cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-3 text-left font-bold text-sm sm:text-base text-[#111827] transition-colors hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
                  <span>{faq.question}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-transform duration-200 group-open:rotate-180 group-open:bg-brand-primary/10 group-open:text-brand-primary">
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </span>
                </summary>
                <div className="px-4 pb-4 pt-2 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 mt-1">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

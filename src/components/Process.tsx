import { CheckCircle2, ArrowRight } from 'lucide-react';
import siteConfig from '../config/siteConfig';

export default function Process() {
  const { processSteps, contact } = siteConfig;

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-[#F8F9F7] py-16 sm:py-20 lg:py-24 border-t border-b border-gray-200/60"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3.5 py-1.5 text-xs font-semibold text-brand-primary uppercase tracking-wider mb-3">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Turnkey Fence Installation</span>
          </div>
          <h2
            id="process-heading"
            className="text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl"
          >
            How We Build Your Fence in 3 Simple Steps
          </h2>
          <p className="mt-3 text-base text-gray-600 sm:text-lg">
            From initial measurement to 811 utility locates and final gate walkthrough, we handle
            everything from start to finish across {contact.regionName}.
          </p>
        </div>

        {/* 3 Steps: Vertical on Mobile, 3-Column Connected Row on Desktop */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {processSteps.map((stepItem, idx) => (
            <div
              key={stepItem.step}
              className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm transition-all hover:shadow-md"
            >
              {/* Step Number Badge */}
              <div className="flex items-center justify-between mb-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-xl font-extrabold text-white shadow-sm">
                  0{stepItem.step}
                </span>
                {idx < processSteps.length - 1 && (
                  <ArrowRight
                    className="hidden md:block h-5 w-5 text-gray-300"
                    aria-hidden="true"
                  />
                )}
              </div>

              <h3 className="text-xl font-extrabold text-[#111827] mb-2">{stepItem.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{stepItem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

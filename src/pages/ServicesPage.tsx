import { Link } from 'react-router-dom';
import { ShieldCheck, Check, ArrowRight, Ruler, Wrench } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import Services from '../components/Services';
import SmartCallButton from '../components/SmartCallButton';

export default function ServicesPage() {
  const { contact, estimator } = siteConfig;

  return (
    <div>
      {/* Page Header Banner: Full-bleed top behind floating CardNav */}
      <section className="relative bg-gradient-to-b from-[#111312] via-brand-primary-dark to-brand-primary pt-36 sm:pt-40 md:pt-44 pb-16 sm:pb-20 text-white text-center px-4 overflow-hidden shadow-md">
        <div className="mx-auto max-w-4xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm border border-white/15">
            <Wrench className="h-3.5 w-3.5 text-brand-accent" />
            <span>Turnkey Fence Construction</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Fence Styles &amp; Installations
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Custom-built residential and commercial fencing across {contact.regionName}. Every
            installation features concrete-set posts, wind-rated hardware, and a 5-year workmanship
            guarantee.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/#estimator"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-accent px-6 py-3 font-bold text-white shadow-md hover:bg-brand-accent-hover transition-colors"
            >
              <Ruler className="h-4 w-4" />
              <span>Ballpark Cost Estimator</span>
            </Link>
            <SmartCallButton variant="outline">
              Call {contact.phoneDisplay}
            </SmartCallButton>
          </div>
        </div>
      </section>

      {/* Main Fence Styles Grid Component */}
      <Services />

      {/* Material Comparison Table Section */}
      <section className="bg-[#F8F9F7] py-16 sm:py-20 border-t border-gray-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
              Compare Materials At A Glance
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Every yard in Florida has unique requirements for sun, moisture, pool codes, and HOA regulations.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Fence Type</th>
                  <th className="px-6 py-4">Typical Lifespan</th>
                  <th className="px-6 py-4">Ballpark Installed Range</th>
                  <th className="px-6 py-4">Maintenance</th>
                  <th className="px-6 py-4">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {estimator.materials.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#111827] flex items-center gap-2">
                      <img
                        src={m.image}
                        alt=""
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <span>{m.name}</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{m.lifespan}</td>
                    <td className="px-6 py-4 font-bold text-brand-primary">
                      {estimator.currencySymbol}{m.lowRatePerUnit} – {estimator.currencySymbol}{m.highRatePerUnit} / {estimator.unit}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{m.maintenance}</td>
                    <td className="px-6 py-4 text-gray-600">{m.shortDesc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Structural Guarantee Notice */}
      <section className="bg-white py-16 border-t border-gray-200/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-2xl border-2 border-brand-primary/20 bg-brand-primary/[0.02] p-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-brand-primary font-bold text-sm uppercase tracking-wider">
              <ShieldCheck className="h-5 w-5" />
              <span>Standard On Every Installation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
              The 5-Year Craftsmanship Guarantee
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We concrete every post at least 30 inches below grade. If any post shifts, leans, or
              loosens within 5 years due to workmanship, we fix it with zero labor charges.
            </p>
            <div className="pt-2">
              <Link
                to="/#estimator"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 font-bold text-white hover:bg-brand-primary-dark transition-colors shadow-sm"
              >
                <span>Calculate Your Fence Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

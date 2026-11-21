import { Star, CheckCircle, MessageSquare } from 'lucide-react';
import siteConfig from '../config/siteConfig';

export default function Reviews() {
  const { reviews, socialProof, contact } = siteConfig;

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3.5 py-1.5 text-xs font-semibold text-brand-primary uppercase tracking-wider mb-3">
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Verified Customer Feedback</span>
          </div>
          <h2
            id="reviews-heading"
            className="text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl"
          >
            What Your Neighbors Say About Our Fences
          </h2>
          <p className="mt-3 text-base text-gray-600 sm:text-lg">
            Real reviews from homeowners in {contact.regionName} who trusted us with their yard,
            pets, and privacy.
          </p>
        </div>

        {/* Top Aggregate Proof Bar */}
        <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-gray-50/70 p-4 sm:p-5 mb-10 sm:mb-12 shadow-xs">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {/* Google Rating */}
            {socialProof.google && (
              <a
                href={socialProof.google.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
                aria-label={`Read ${socialProof.google.reviewCount} Google reviews`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-base font-black text-[#4285F4] shadow-sm border border-gray-100">
                  G
                </span>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-extrabold text-base text-[#111827]">
                      {socialProof.google.rating}
                    </span>
                    <div className="flex items-center text-[#F59E0B]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[#F59E0B]" />
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 group-hover:underline">
                    {socialProof.google.reviewCount} Google Reviews
                  </div>
                </div>
              </a>
            )}

            {/* Facebook Rating (Hides seamlessly if null) */}
            {socialProof.facebook && (
              <a
                href={socialProof.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group border-l border-gray-200 pl-6 sm:pl-10"
                aria-label={`Read ${socialProof.facebook.reviewCount} Facebook reviews`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-base font-black text-white shadow-sm">
                  f
                </span>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-extrabold text-base text-[#111827]">
                      {socialProof.facebook.rating}
                    </span>
                    <div className="flex items-center text-[#F59E0B]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[#F59E0B]" />
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 group-hover:underline">
                    {socialProof.facebook.reviewCount} Facebook Reviews
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>

        {/* Review Cards Grid: 1-col mobile / 2-col tablet / 3-col or 4-col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <article
              key={rev.id}
              className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div>
                {/* Rating Stars & Source */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-[#F59E0B]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#F59E0B]" />
                    ))}
                  </div>
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-600">
                    {rev.source} Review
                  </span>
                </div>

                {/* Review Quote */}
                <blockquote className="text-sm text-gray-700 leading-relaxed italic mb-4">
                  &ldquo;{rev.text}&rdquo;
                </blockquote>
              </div>

              {/* Author & Service Info */}
              <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-sm text-[#111827]">
                    <span>{rev.author}</span>
                    <CheckCircle className="h-3.5 w-3.5 text-brand-primary" aria-hidden="true" />
                  </div>
                  <div className="text-xs text-gray-500">
                    {rev.suburb}
                    {contact.stateCode ? `, ${contact.stateCode}` : ''}
                  </div>
                </div>
                <div className="text-xs font-semibold text-brand-primary bg-brand-primary/5 px-2 py-1 rounded">
                  {rev.serviceType}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

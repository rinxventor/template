import { useState, useEffect, useRef, useCallback } from 'react';
import { X, ArrowRight, Eye, MapPin, Ruler } from 'lucide-react';
import siteConfig, { type GalleryItem } from '../config/siteConfig';
import { scrollToSection } from '../hooks/useScrollTo';

export default function Gallery() {
  const { gallery, contact } = siteConfig;

  /* ------------------------------------------------------------------ */
  /*  State                                                             */
  /* ------------------------------------------------------------------ */
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  /* Build unique filter categories */
  const filterCategories = ['All', 'Wood', 'Vinyl', 'Iron', 'Chain Link'];

  const filteredItems =
    activeFilter === 'All'
      ? gallery
      : gallery.filter((item) =>
          item.material.toLowerCase().includes(activeFilter.toLowerCase()),
        );

  /* ------------------------------------------------------------------ */
  /*  Lightbox Focus & Keyboard Management                             */
  /* ------------------------------------------------------------------ */
  const openLightbox = (item: GalleryItem, btnEl: HTMLButtonElement) => {
    triggerRef.current = btnEl;
    setSelectedItem(item);
  };

  const closeLightbox = useCallback(() => {
    setSelectedItem(null);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    if (!selectedItem) return;

    // Focus the close button when modal opens
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, closeLightbox]);

  const handleEstimateSimilar = (materialName: string) => {
    // Map material text to id
    const lower = materialName.toLowerCase();
    let matId = 'wood';
    if (lower.includes('vinyl')) matId = 'vinyl';
    else if (lower.includes('iron') || lower.includes('alum')) matId = 'iron';
    else if (lower.includes('chain')) matId = 'chainlink';

    window.dispatchEvent(
      new CustomEvent('select-material', {
        detail: { materialId: matId },
      }),
    );
    closeLightbox();
    scrollToSection('estimator');
  };

  return (
    <section
      id="projects"
      aria-labelledby="gallery-heading"
      className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3.5 py-1.5 text-xs font-semibold text-brand-primary uppercase tracking-wider mb-3">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Local Neighborhood Projects</span>
          </div>
          <h2
            id="gallery-heading"
            className="text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl"
          >
            Recent Local Installations
          </h2>
          <p className="mt-3 text-base text-gray-600 sm:text-lg">
            Straight lines, tight tolerances, and clean job sites across {contact.regionName}. Tap
            any project to view specifications.
          </p>
        </div>

        {/* Filter Pills (Horizontally scrollable on mobile) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 scrollbar-none">
          {filterCategories.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`min-h-[44px] whitespace-nowrap rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-pressed={isActive}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Responsive Photo Grid (1-col mobile, 2-col tablet, 3-col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={(e) => openLightbox(item, e.currentTarget)}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary text-left"
              aria-label={`View project details for ${item.title} in ${item.suburb}`}
            >
              {/* Aspect 4:3 Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Suburb + Material Badge (Bottom-Left) */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  <MapPin className="h-3 w-3 text-brand-accent" aria-hidden="true" />
                  <span>
                    {item.suburb} · {item.material}
                  </span>
                </div>

                {/* Hover Quick-View Indicator */}
                <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-800 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                  <Eye className="h-4 w-4" />
                </div>
              </div>

              {/* Caption Bar */}
              <div className="flex items-center justify-between p-4 bg-white">
                <div>
                  <div className="font-bold text-sm text-[#111827] group-hover:text-brand-primary">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {item.suburb}
                    {contact.stateCode ? `, ${contact.stateCode}` : ''} · {item.lengthLabel}
                  </div>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors group-hover:bg-brand-primary group-hover:text-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Accessible Lightbox Modal */}
        {selectedItem && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            {/* Modal Box */}
            <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
              {/* Close Button (48px tap target) */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeLightbox}
                className="absolute top-3 right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white shadow-md transition-colors hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close project view"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Large Image */}
              <div className="relative aspect-[4/3] w-full bg-gray-900">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.alt}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Details & CTA */}
              <div className="p-5 sm:p-6 bg-white space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>
                      {selectedItem.suburb}
                      {contact.stateCode ? `, ${contact.stateCode}` : ''} · {selectedItem.material}{' '}
                      Fence
                    </span>
                  </div>
                  <h3 id="lightbox-title" className="text-xl font-extrabold text-[#111827] mt-1">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">{selectedItem.alt}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <Ruler className="h-4 w-4 text-brand-primary" />
                    <span>Total Length Installed: {selectedItem.lengthLabel}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleEstimateSimilar(selectedItem.material)}
                    className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-accent px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow transition-colors hover:bg-brand-accent-hover"
                  >
                    <span>Estimate a Similar Fence</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

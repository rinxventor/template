import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import GlideSelect from './GlideSelect';
import SlideCommit from './SlideCommit';

interface FormData {
  name: string;
  phone: string;
  fenceType: string;
  notes: string;
}

const initialFormData: FormData = {
  name: '',
  phone: '',
  fenceType: '',
  notes: '',
};

function QuickQuote() {
  const { hero, contact, socialProof, theme } = siteConfig;
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData>(initialFormData);
  const [errorMsg, setErrorMsg] = useState('');

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSlideSubmit = async () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your name and phone number.');
      throw new Error('Name and phone required');
    }
    setErrorMsg('');
    setSubmittedData(formData);

    if (contact.formEndpoint) {
      try {
        await fetch(contact.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } catch {
        // Silently handle
      }
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setSubmitted(false);
    setErrorMsg('');
  };

  /* ------------------------------------------------------------------ */
  /*  Confirmation state                                                 */
  /* ------------------------------------------------------------------ */
  if (submitted) {
    return (
      <div className="-mt-16 relative z-20 mx-3 sm:mx-auto max-w-5xl" id="quote-form">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-xl">
          <div className="flex flex-col items-center gap-3 text-center">
            <CheckCircle size={40} className="text-green-600" aria-hidden="true" />
            <p className="text-lg font-semibold text-green-800">
              Thanks {submittedData.name}!
            </p>
            <p className="max-w-md text-sm text-green-700">
              We&apos;ll call you at{' '}
              <span className="font-medium">{submittedData.phone}</span> about
              your{' '}
              <span className="font-medium">
                {submittedData.fenceType || 'fencing'}
              </span>{' '}
              project.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-3 min-h-[48px] rounded-lg border border-green-300 px-5 py-2 text-sm font-semibold text-green-700 transition-colors hover:bg-green-100"
            >
              Submit Another
            </button>
          </div>
        </div>

        {/* Trust Badge Strip */}
        <TrustBadges />
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /*  Form state                                                         */
  /* ------------------------------------------------------------------ */
  return (
    <div className="-mt-16 relative z-20 mx-3 sm:mx-auto max-w-5xl" id="quote-form">
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:p-5">
        {errorMsg && (
          <div className="mb-3 text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200 text-center">
            {errorMsg}
          </div>
        )}

        {/* ============ Desktop Layout ============ */}
        <div className="hidden lg:block">
          <div className="flex items-end gap-3">
            {/* Full Name */}
            <div className="flex-1">
              <label htmlFor="dsk-name" className="sr-only">
                Full Name
              </label>
              <input
                id="dsk-name"
                type="text"
                placeholder="Full Name *"
                required
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="h-12 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
              />
            </div>

            {/* Phone Number */}
            <div className="flex-1">
              <label htmlFor="dsk-phone" className="sr-only">
                Phone Number
              </label>
              <input
                id="dsk-phone"
                type="tel"
                placeholder="Phone Number *"
                required
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className="h-12 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
              />
            </div>

            {/* Fence Type */}
            <div className="flex-1">
              <label htmlFor="dsk-fence-type" className="sr-only">
                Fence Type
              </label>
              <GlideSelect
                options={hero.serviceOptions.map((opt) => ({
                  value: opt,
                  label: opt,
                }))}
                value={formData.fenceType}
                onChange={(val) => updateField('fenceType', val)}
                placeholder="Fence Type"
                ariaLabel="Fence Type"
                size="lg"
                radius={10}
                accentColor={theme.primaryHex}
                surfaceColor="#ffffff"
                highlightColor="rgba(45, 74, 58, 0.08)"
                textColor="#111827"
                borderColor="#E5E7EB"
                className="w-full"
              />
            </div>

            {/* Notes */}
            <div className="flex-1">
              <label htmlFor="dsk-notes" className="sr-only">
                Approx. Length / Notes
              </label>
              <input
                id="dsk-notes"
                type="text"
                placeholder="Approx. Length / Notes"
                value={formData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                className="h-12 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
              />
            </div>

            {/* Final Action: SlideCommit */}
            <div className="shrink-0">
              <SlideCommit
                label="Slide for Quote"
                doneLabel="Quote Sent!"
                errorLabel="Fill name & phone"
                width={220}
                height={48}
                radius={24}
                trackColor="#2D4A3A"
                handleColor="#ffffff"
                successColor="#C8490E"
                dangerColor="#DC2626"
                onConfirm={handleSlideSubmit}
              />
            </div>
          </div>
        </div>

        {/* ============ Mobile Layout ============ */}
        <div className="lg:hidden space-y-3">
          {/* Full Name */}
          <div>
            <label htmlFor="mob-name" className="block text-xs font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              id="mob-name"
              type="text"
              placeholder="Your Full Name"
              required
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="h-12 w-full rounded-xl border border-gray-200 px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="mob-phone" className="block text-xs font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              id="mob-phone"
              type="tel"
              placeholder={contact.phoneDisplay}
              required
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className="h-12 w-full rounded-xl border border-gray-200 px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
            />
          </div>

          {/* Fence Type */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Fence Type
            </label>
            <GlideSelect
              options={hero.serviceOptions.map((opt) => ({
                value: opt,
                label: opt,
              }))}
              value={formData.fenceType}
              onChange={(val) => updateField('fenceType', val)}
              placeholder="Select Fence Type…"
              ariaLabel="Fence Type"
              size="lg"
              radius={10}
              accentColor={theme.primaryHex}
              surfaceColor="#ffffff"
              highlightColor="rgba(45, 74, 58, 0.08)"
              textColor="#111827"
              borderColor="#E5E7EB"
              className="w-full"
            />
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="mob-notes" className="block text-xs font-medium text-gray-700 mb-1">
              Approx. Length / Notes
            </label>
            <input
              id="mob-notes"
              type="text"
              placeholder="e.g., 150 ft privacy with 1 gate"
              value={formData.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              className="h-12 w-full rounded-xl border border-gray-200 px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
            />
          </div>

          {/* Final Action: SlideCommit */}
          <div className="pt-2 flex flex-col items-center justify-center gap-1.5">
            <SlideCommit
              label="Slide for Quick Quote"
              doneLabel="Quote Sent!"
              errorLabel="Fill name & phone"
              width={290}
              height={52}
              radius={26}
              trackColor="#2D4A3A"
              handleColor="#ffffff"
              successColor="#C8490E"
              dangerColor="#DC2626"
              onConfirm={handleSlideSubmit}
            />
            <span className="text-[10px] text-gray-400">
              Slide right to request immediate callback
            </span>
          </div>
        </div>
      </div>

      {/* Trust Badge Strip */}
      <TrustBadges />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Trust Badges Sub-component                                         */
/* ------------------------------------------------------------------ */
function TrustBadges() {
  const { socialProof } = siteConfig;

  if (!socialProof.trustBadges.length) return null;

  return (
    <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 md:flex md:flex-wrap md:justify-center">
      {socialProof.trustBadges.map((badge) => (
        <span
          key={badge}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="8" fill="#E5E7EB" />
            <path
              d="M5 8l2 2 4-4"
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {badge}
        </span>
      ))}
    </div>
  );
}

export default QuickQuote;

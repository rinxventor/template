import { useState, type FormEvent } from 'react';
import { Phone, Mail, Clock, MapPin, Send, CheckCircle2, ShieldCheck, Calendar, Sparkles } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import GlideSelect from '../components/GlideSelect';
import SmartCallButton from '../components/SmartCallButton';
import FAQAndAreas from '../components/FAQAndAreas';
import SlideCommit from '../components/SlideCommit';

export default function ContactPage() {
  const { contact, brand, hero, theme } = siteConfig;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    fenceType: hero.serviceOptions[0],
    callbackTime: 'Morning (8am – 12pm)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSlideSubmit = async () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      setValidationError('Please enter your name and phone number before sliding.');
      throw new Error('Name and phone are required');
    }
    setValidationError('');

    if (contact.formEndpoint) {
      try {
        await fetch(contact.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } catch {
        // Fall back gracefully
      }
    }
    setSubmitted(true);
  };

  return (
    <div>
      {/* Page Header Banner: Full-bleed top behind floating CardNav */}
      <section className="relative bg-gradient-to-b from-[#111312] via-brand-primary-dark to-brand-primary pt-36 sm:pt-40 md:pt-44 pb-16 sm:pb-20 text-white text-center px-4 overflow-hidden shadow-md">
        <div className="mx-auto max-w-4xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm border border-white/15">
            <Phone className="h-3.5 w-3.5 text-brand-accent" />
            <span>Fast Callbacks &amp; Free On-Site Measures</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Contact {brand.name}
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Need an on-site yard measurement, HOA permit assistance, or fence repairs? Reach out
            directly to our Central Florida team.
          </p>

          <div className="pt-2">
            <SmartCallButton variant="accent">
              Call {contact.phoneDisplay}
            </SmartCallButton>
          </div>
        </div>
      </section>

      {/* Contact Cards & Form 2-Column Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Contact Information & Channels (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                  Get In Touch
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1">
                  We&apos;re Here To Help
                </h2>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  Call or slide to submit the booking form to schedule your free yard walk-through. We will inspect
                  property corners, check for underground utilities, and prepare a firm written quote.
                </p>
              </div>

              {/* Contact Details List */}
              <div className="rounded-2xl border border-gray-200 bg-[#F8F9F7] p-6 space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-gray-500">Phone Number</div>
                    <div className="mt-0.5">
                      <SmartCallButton
                        variant="subtle"
                        showIcon={false}
                        className="p-0 min-h-0 font-extrabold text-base text-[#111827] hover:underline"
                      >
                        {contact.phoneDisplay}
                      </SmartCallButton>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">Direct line to lead builder</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-t border-gray-200/60 pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-gray-500">Email Inquiries</div>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-bold text-sm text-brand-primary hover:underline"
                    >
                      {contact.email}
                    </a>
                    <div className="text-xs text-gray-500 mt-0.5">Quotes returned within 24 hours</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-t border-gray-200/60 pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-gray-500">Hours of Operation</div>
                    <div className="font-semibold text-sm text-gray-800">{contact.hours}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Emergency storm repairs available</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-t border-gray-200/60 pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-gray-500">Service Area</div>
                    <div className="font-semibold text-sm text-gray-800">{contact.regionName}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Orange, Seminole &amp; Osceola Counties
                    </div>
                  </div>
                </div>
              </div>

              {/* License & Insurance Trust Callout */}
              {contact.licenseBadge && (
                <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-4 flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-brand-primary shrink-0" />
                  <div className="text-xs text-gray-700">
                    <span className="font-bold text-gray-900 block">{contact.licenseBadge}</span>
                    Fully licensed and carrying $2M general liability insurance.
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Booking & Consultation Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xl">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent/10 px-3 py-1 text-xs font-bold text-brand-accent mb-2">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Free On-Site Yard Walkthrough</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
                    Schedule Your Free Measurement
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Tell us what you need and our lead installer will schedule an on-site yard walk-through.
                  </p>
                </div>

                {!submitted ? (
                  <div className="space-y-4">
                    {validationError && (
                      <div className="rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700 border border-red-200">
                        {validationError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-semibold text-gray-700 mb-1"
                        >
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, name: e.target.value }))
                          }
                          className="h-12 w-full rounded-xl border border-gray-300 px-3.5 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs font-semibold text-gray-700 mb-1"
                        >
                          Phone Number *
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          placeholder={contact.phoneDisplay}
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, phone: e.target.value }))
                          }
                          className="h-12 w-full rounded-xl border border-gray-300 px-3.5 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, email: e.target.value }))
                        }
                        className="h-12 w-full rounded-xl border border-gray-300 px-3.5 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Fence Style
                        </label>
                        <GlideSelect
                          options={hero.serviceOptions.map((opt) => ({
                            value: opt,
                            label: opt,
                          }))}
                          value={formData.fenceType}
                          onChange={(val) => setFormData((p) => ({ ...p, fenceType: val }))}
                          ariaLabel="Fence Style"
                          size="lg"
                          radius={10}
                          accentColor={theme.primaryHex}
                          surfaceColor="#ffffff"
                          highlightColor="rgba(45, 74, 58, 0.08)"
                          textColor="#111827"
                          borderColor="#D1D5DB"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Preferred Callback Window
                        </label>
                        <GlideSelect
                          options={[
                            { value: 'Morning (8am – 12pm)', label: 'Morning (8am – 12pm)' },
                            { value: 'Afternoon (12pm – 4pm)', label: 'Afternoon (12pm – 4pm)' },
                            { value: 'Late Afternoon (4pm – 6pm)', label: 'Late Afternoon (4pm – 6pm)' },
                            { value: 'Saturday Morning', label: 'Saturday Morning' },
                          ]}
                          value={formData.callbackTime}
                          onChange={(val) =>
                            setFormData((p) => ({ ...p, callbackTime: val }))
                          }
                          ariaLabel="Preferred Callback Time"
                          size="lg"
                          radius={10}
                          accentColor={theme.primaryHex}
                          surfaceColor="#ffffff"
                          highlightColor="rgba(45, 74, 58, 0.08)"
                          textColor="#111827"
                          borderColor="#D1D5DB"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-notes"
                        className="block text-xs font-semibold text-gray-700 mb-1"
                      >
                        Project Details / Approx. Length
                      </label>
                      <textarea
                        id="contact-notes"
                        rows={3}
                        placeholder="e.g. Need ~180 ft wood privacy fence with 1 walk gate in Winter Park..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, message: e.target.value }))
                        }
                        className="w-full rounded-xl border border-gray-300 p-3.5 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                      />
                    </div>

                    {/* Absolute Last Step for Action: SlideCommit */}
                    <div className="pt-3 flex flex-col items-center justify-center gap-2">
                      <SlideCommit
                        label="Slide to book on-site measure"
                        doneLabel="Measure Booked!"
                        errorLabel="Please fill name & phone"
                        width={320}
                        height={54}
                        trackColor="#2D4A3A"
                        handleColor="#ffffff"
                        successColor="#C8490E"
                        dangerColor="#DC2626"
                        onConfirm={handleSlideSubmit}
                      />
                      <span className="text-[11px] text-gray-500">
                        Slide right to confirm your free measurement appointment
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center space-y-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-green-900">
                      Thank You, {formData.name}!
                    </h3>
                    <p className="text-sm text-green-800 max-w-md mx-auto leading-relaxed">
                      We received your inquiry regarding your{' '}
                      <span className="font-bold">{formData.fenceType}</span> project. We will call you
                      during <span className="font-bold">{formData.callbackTime}</span> at{' '}
                      <span className="font-bold">{formData.phone}</span> to confirm your free on-site yard walk-through.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: '',
                            phone: '',
                            email: '',
                            fenceType: hero.serviceOptions[0],
                            callbackTime: 'Morning (8am – 12pm)',
                            message: '',
                          });
                        }}
                        className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-100 shadow-sm"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <div id="faq">
        <FAQAndAreas />
      </div>
    </div>
  );
}

import { useState, useMemo, useEffect } from 'react';
import {
  Check,
  Plus,
  Minus,
  Ruler,
  Layers,
  Mountain,
  DoorOpen,
  Trash2,
  Calendar,
  CheckCircle2,
  RotateCcw,
  ShieldCheck,
  Phone,
} from 'lucide-react';
import siteConfig from '../config/siteConfig';
import Stepper, { Step } from './Stepper';
import SlideCommit from './SlideCommit';
import GlideSelect from './GlideSelect';
import { useSmartCall } from './SmartCallButton';

interface BookingData {
  name: string;
  phone: string;
  zipOrSuburb: string;
  callbackTime: string;
}

const initialBookingData: BookingData = {
  name: '',
  phone: '',
  zipOrSuburb: '',
  callbackTime: 'Morning (8am – 12pm)',
};

export default function Estimator() {
  const { estimator, contact, theme } = siteConfig;
  const { triggerCall, phoneDisplay } = useSmartCall();

  /* ------------------------------------------------------------------ */
  /*  Estimator State                                                   */
  /* ------------------------------------------------------------------ */
  const [materialId, setMaterialId] = useState<string>(estimator.materials[0].id);
  const [length, setLength] = useState<number>(estimator.defaultLength);
  const [heightIdx, setHeightIdx] = useState<number>(1); // Default to 6 ft (index 1)
  const [terrainIdx, setTerrainIdx] = useState<number>(0); // Default to Flat (index 0)
  const [walkGates, setWalkGates] = useState<number>(1);
  const [doubleGates, setDoubleGates] = useState<number>(0);
  const [tearOut, setTearOut] = useState<boolean>(false);

  /* Booking Form State */
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');

  /* Listen for material selection from Services or Gallery */
  useEffect(() => {
    const handleSelectMaterial = (e: Event) => {
      const customEvent = e as CustomEvent<{ materialId: string }>;
      if (customEvent.detail?.materialId) {
        setMaterialId(customEvent.detail.materialId);
      }
    };
    window.addEventListener('select-material', handleSelectMaterial);
    return () => window.removeEventListener('select-material', handleSelectMaterial);
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Selected Objects & Math                                           */
  /* ------------------------------------------------------------------ */
  const selectedMaterial = useMemo(
    () => estimator.materials.find((m) => m.id === materialId) ?? estimator.materials[0],
    [estimator.materials, materialId],
  );

  const selectedHeight = estimator.heights[heightIdx] ?? estimator.heights[0];
  const selectedTerrain = estimator.terrains[terrainIdx] ?? estimator.terrains[0];

  const calculation = useMemo(() => {
    const baseLowPerUnit =
      selectedMaterial.lowRatePerUnit * selectedHeight.multiplier * selectedTerrain.multiplier;
    const baseHighPerUnit =
      selectedMaterial.highRatePerUnit * selectedHeight.multiplier * selectedTerrain.multiplier;

    const fenceBaseLow = baseLowPerUnit * length;
    const fenceBaseHigh = baseHighPerUnit * length;

    const gatesTotal =
      walkGates * estimator.singleGateCost + doubleGates * estimator.doubleGateCost;

    const tearOutLow = tearOut ? estimator.tearOutLowPerUnit * length : 0;
    const tearOutHigh = tearOut ? estimator.tearOutHighPerUnit * length : 0;

    const rawLow = fenceBaseLow + gatesTotal + tearOutLow;
    const rawHigh = fenceBaseHigh + gatesTotal + tearOutHigh;

    // Round to nearest 50 for clean contractor estimates
    const roundedLow = Math.max(100, Math.round(rawLow / 50) * 50);
    const roundedHigh = Math.max(roundedLow + 150, Math.round(rawHigh / 50) * 50);

    return {
      low: roundedLow,
      high: roundedHigh,
      gatesTotal,
      tearOutLow,
      tearOutHigh,
    };
  }, [
    selectedMaterial,
    selectedHeight,
    selectedTerrain,
    length,
    walkGates,
    doubleGates,
    tearOut,
    estimator,
  ]);

  /* ------------------------------------------------------------------ */
  /*  Handlers                                                          */
  /* ------------------------------------------------------------------ */
  const handleLengthChange = (value: number) => {
    const clamped = Math.min(Math.max(value, estimator.minLength), estimator.maxLength);
    setLength(clamped);
  };

  const handleBookingConfirm = async () => {
    if (!bookingData.name.trim() || !bookingData.phone.trim()) {
      setValidationError('Please enter your name and phone number before sliding.');
      throw new Error('Name and phone are required');
    }
    setValidationError('');

    const payload = {
      ...bookingData,
      estimate: {
        material: selectedMaterial.name,
        length: `${length} ${estimator.unit}`,
        height: selectedHeight.label,
        terrain: selectedTerrain.label,
        walkGates,
        doubleGates,
        tearOutOldFence: tearOut,
        ballparkRange: `${estimator.currencySymbol}${calculation.low.toLocaleString()} - ${estimator.currencySymbol}${calculation.high.toLocaleString()}`,
      },
    };

    if (contact.formEndpoint) {
      try {
        await fetch(contact.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        // Fall back gracefully
      }
    }

    setBookingConfirmed(true);
  };

  const handleRecalculate = () => {
    setBookingConfirmed(false);
    setBookingData(initialBookingData);
    setValidationError('');
  };

  /* ------------------------------------------------------------------ */
  /*  Render Itemized Pills                                             */
  /* ------------------------------------------------------------------ */
  const renderBreakdownPills = () => (
    <div className="flex flex-wrap gap-1.5 py-2">
      <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-800">
        {selectedMaterial.name} · {selectedHeight.label}
      </span>
      <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-800">
        {length} {estimator.unit}
      </span>
      <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-800">
        Terrain: {selectedTerrain.label}
      </span>
      {walkGates > 0 && (
        <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-800">
          {walkGates} Walk Gate{walkGates > 1 ? 's' : ''}
        </span>
      )}
      {doubleGates > 0 && (
        <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-800">
          {doubleGates} Driveway Gate{doubleGates > 1 ? 's' : ''}
        </span>
      )}
      {tearOut && (
        <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 border border-amber-200">
          Tear-Out Included
        </span>
      )}
    </div>
  );

  return (
    <section
      id="estimator"
      aria-labelledby="estimator-heading"
      className="scroll-mt-24 bg-[#F8F9F7] py-16 sm:py-20 lg:py-24 border-t border-gray-200/70"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3.5 py-1.5 text-xs font-semibold text-brand-primary uppercase tracking-wider mb-3">
            <Ruler className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Interactive Ballpark Estimator</span>
          </div>
          <h2
            id="estimator-heading"
            className="text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl"
          >
            Instant Fence Cost Estimator
          </h2>
          <p className="mt-3 text-base text-gray-600 sm:text-lg">
            Choose your materials, length, and options to generate a transparent planning estimate
            in real time. No email or signup required.
          </p>
        </div>

        {/* Guided Multi-Step Estimator Engine using Stepper */}
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-gray-200/90 bg-white p-4 sm:p-8 shadow-xl">
            <Stepper
              theme="light"
              accentColor="#C8490E"
              radius={20}
              width="100%"
              backButtonText="Previous Step"
              nextButtonText="Next Step"
              completeButtonText="Final Step: Booking"
            >
              {/* ======================================================== */}
              {/*  STEP 1: Fence Material & Style                          */}
              {/* ======================================================== */}
              <Step
                title="1. Material"
                description="Choose fence style"
                icon={<Layers className="h-3.5 w-3.5" />}
              >
                <div className="space-y-5 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#111827]">
                        Select Your Fence Style
                      </h3>
                      <p className="text-xs text-gray-500">
                        Select a material to see live ballpark pricing for Central Florida.
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-bold text-brand-primary">
                      {estimator.materials.length} Premium Styles
                    </span>
                  </div>

                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
                    role="radiogroup"
                    aria-label="Select fence material"
                  >
                    {estimator.materials.map((mat) => {
                      const isSelected = mat.id === materialId;
                      return (
                        <button
                          key={mat.id}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => setMaterialId(mat.id)}
                          className={`group relative flex flex-col rounded-2xl p-3.5 text-left transition-all min-h-[150px] cursor-pointer ${
                            isSelected
                              ? 'border-2 border-brand-primary bg-brand-primary/[0.04] shadow-md ring-1 ring-brand-primary'
                              : 'border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/70'
                          }`}
                        >
                          {isSelected && (
                            <span className="absolute top-3 right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary text-white shadow-md">
                              <Check className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
                            </span>
                          )}

                          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100 mb-2.5">
                            <img
                              src={mat.image}
                              alt={mat.name}
                              loading="lazy"
                              decoding="async"
                              width={320}
                              height={180}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-2 left-2 text-[11px] font-bold text-white uppercase tracking-wider">
                              {mat.name}
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs text-gray-600 mt-auto">
                            <span>Longevity: {mat.lifespan}</span>
                            <span className="font-bold text-brand-primary">
                              {estimator.currencySymbol}{mat.lowRatePerUnit}–{estimator.currencySymbol}{mat.highRatePerUnit}/{estimator.unit}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Step>

              {/* ======================================================== */}
              {/*  STEP 2: Footage & Height                                */}
              {/* ======================================================== */}
              <Step
                title="2. Dimensions"
                description="Footage & Height"
                icon={<Ruler className="h-3.5 w-3.5" />}
              >
                <div className="space-y-6 pt-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#111827]">
                      Yard Length &amp; Fence Height
                    </h3>
                    <p className="text-xs text-gray-500">
                      Standard Central Florida suburban backyards are typically 120 – 180 linear feet.
                    </p>
                  </div>

                  {/* Linear Footage Slider */}
                  <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <label htmlFor="step-length" className="text-sm font-bold text-gray-800">
                        Total Linear Footage
                      </label>
                      <div className="flex items-baseline gap-1 text-2xl font-extrabold text-brand-primary">
                        <span>{length}</span>
                        <span className="text-xs font-semibold text-gray-500 uppercase">
                          {estimator.unit}
                        </span>
                      </div>
                    </div>

                    <input
                      id="step-length"
                      type="range"
                      min={estimator.minLength}
                      max={estimator.maxLength}
                      step={5}
                      value={length}
                      onChange={(e) => handleLengthChange(Number(e.target.value))}
                      className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                    />

                    {/* Footage Quick Presets */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {[100, 150, 200, 300, 400].map((ft) => (
                        <button
                          key={ft}
                          type="button"
                          onClick={() => handleLengthChange(ft)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                            length === ft
                              ? 'bg-brand-primary text-white shadow-sm'
                              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          {ft} {estimator.unit}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fence Height Selector */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-800">
                      Fence Height
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {estimator.heights.map((h, idx) => {
                        const isSelected = heightIdx === idx;
                        return (
                          <button
                            key={h.label}
                            type="button"
                            onClick={() => setHeightIdx(idx)}
                            className={`rounded-xl p-3 text-center border transition-all ${
                              isSelected
                                ? 'border-2 border-brand-primary bg-brand-primary/5 font-bold text-brand-primary shadow-sm'
                                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <div className="text-base font-extrabold">{h.label}</div>
                            <div className="text-[11px] text-gray-500">{h.value} ft standard</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Step>

              {/* ======================================================== */}
              {/*  STEP 3: Gates & Site Add-ons                            */}
              {/* ======================================================== */}
              <Step
                title="3. Gates & Site"
                description="Gates & ground slope"
                icon={<DoorOpen className="h-3.5 w-3.5" />}
              >
                <div className="space-y-6 pt-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#111827]">
                      Gates &amp; Ground Conditions
                    </h3>
                    <p className="text-xs text-gray-500">
                      Include walk gates for lawnmowers and double gates for driveways or boats.
                    </p>
                  </div>

                  {/* Gates Counters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Walk Gates */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-gray-800">Walk Gates (4 ft)</div>
                        <div className="text-xs text-gray-500">+${estimator.singleGateCost} ea</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setWalkGates((v) => Math.max(0, v - 1))}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40"
                          disabled={walkGates === 0}
                          aria-label="Decrease walk gates"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-extrabold text-base text-gray-900">
                          {walkGates}
                        </span>
                        <button
                          type="button"
                          onClick={() => setWalkGates((v) => Math.min(6, v + 1))}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                          aria-label="Increase walk gates"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Double Driveway Gates */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-gray-800">Double Gates (8–10 ft)</div>
                        <div className="text-xs text-gray-500">+${estimator.doubleGateCost} ea</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setDoubleGates((v) => Math.max(0, v - 1))}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40"
                          disabled={doubleGates === 0}
                          aria-label="Decrease double gates"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-extrabold text-base text-gray-900">
                          {doubleGates}
                        </span>
                        <button
                          type="button"
                          onClick={() => setDoubleGates((v) => Math.min(4, v + 1))}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                          aria-label="Increase double gates"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Terrain & Tear-out Toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Terrain */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-2">
                      <label className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                        <Mountain className="h-4 w-4 text-brand-primary" />
                        <span>Ground Slope</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {estimator.terrains.map((t, idx) => (
                          <button
                            key={t.label}
                            type="button"
                            onClick={() => setTerrainIdx(idx)}
                            className={`rounded-lg py-2 px-2 text-center text-xs transition-colors ${
                              terrainIdx === idx
                                ? 'bg-brand-primary font-bold text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tear-Out Toggle */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-4 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                          <Trash2 className="h-4 w-4 text-amber-700" />
                          <span>Tear Out Old Fence</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Disposal &amp; hauling included
                        </div>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={tearOut}
                        onClick={() => setTearOut(!tearOut)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          tearOut ? 'bg-brand-primary' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            tearOut ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </Step>

              {/* ======================================================== */}
              {/*  STEP 4: Ballpark Estimate & Booking with SlideCommit    */}
              {/* ======================================================== */}
              <Step
                title="4. Estimate & Booking"
                description="Lock in your estimate"
                icon={<Calendar className="h-3.5 w-3.5" />}
              >
                <div className="space-y-6 pt-2">
                  {/* Estimate Result Box */}
                  <div className="rounded-2xl bg-gradient-to-br from-brand-primary-dark via-brand-primary to-brand-primary-dark p-6 text-white shadow-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                        Estimated Ballpark Price
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white/90">
                        <ShieldCheck className="h-3 w-3 text-brand-accent" />
                        5-Yr Warranty
                      </span>
                    </div>

                    <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                      {estimator.currencySymbol}{calculation.low.toLocaleString()} – {estimator.currencySymbol}{calculation.high.toLocaleString()}
                    </div>

                    <p className="text-xs text-white/80 leading-relaxed">
                      Includes custom fabrication, heavy-duty posts set in concrete 30&quot; deep, hardware, and complete installation across {contact.regionName}.
                    </p>

                    {renderBreakdownPills()}
                  </div>

                  {/* Booking On-Site Check Form */}
                  {!bookingConfirmed ? (
                    <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-5 space-y-4">
                      <div>
                        <h4 className="text-base font-bold text-gray-900">
                          Lock In This Ballpark &amp; Book Free On-Site Check
                        </h4>
                        <p className="text-xs text-gray-600">
                          Our lead installer will measure exact lot corners and verify utility lines. No obligation.
                        </p>
                      </div>

                      {validationError && (
                        <div className="rounded-lg bg-red-50 p-3 text-xs font-semibold text-red-700 border border-red-200">
                          {validationError}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label htmlFor="est-name" className="block text-xs font-semibold text-gray-700 mb-1">
                            Your Name *
                          </label>
                          <input
                            id="est-name"
                            type="text"
                            required
                            placeholder="Full Name"
                            value={bookingData.name}
                            onChange={(e) => setBookingData((p) => ({ ...p, name: e.target.value }))}
                            className="h-11 w-full rounded-xl border border-gray-300 px-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                          />
                        </div>

                        <div>
                          <label htmlFor="est-phone" className="block text-xs font-semibold text-gray-700 mb-1">
                            Phone Number *
                          </label>
                          <input
                            id="est-phone"
                            type="tel"
                            required
                            placeholder={contact.phoneDisplay}
                            value={bookingData.phone}
                            onChange={(e) => setBookingData((p) => ({ ...p, phone: e.target.value }))}
                            className="h-11 w-full rounded-xl border border-gray-300 px-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Preferred On-Site Measurement Window
                        </label>
                        <GlideSelect
                          options={[
                            { value: 'Morning (8am – 12pm)', label: 'Morning (8am – 12pm)', tag: 'Fastest' },
                            { value: 'Afternoon (12pm – 4pm)', label: 'Afternoon (12pm – 4pm)' },
                            { value: 'Late Afternoon (4pm – 6pm)', label: 'Late Afternoon (4pm – 6pm)' },
                            { value: 'Saturday Morning', label: 'Saturday Morning', tag: 'Weekend' },
                          ]}
                          value={bookingData.callbackTime}
                          onChange={(val) => setBookingData((p) => ({ ...p, callbackTime: val }))}
                          ariaLabel="Callback Window"
                          size="md"
                          radius={10}
                          accentColor={theme.primaryHex}
                          surfaceColor="#ffffff"
                          highlightColor="rgba(45, 74, 58, 0.08)"
                          textColor="#111827"
                          borderColor="#D1D5DB"
                          className="w-full"
                        />
                      </div>

                      {/* Absolute Last Step for Action: SlideCommit */}
                      <div className="pt-2 flex flex-col items-center justify-center gap-2">
                        <SlideCommit
                          label="Slide to book on-site check"
                          doneLabel="On-Site Check Booked!"
                          errorLabel="Please fill name & phone"
                          width={320}
                          height={54}
                          trackColor="#2D4A3A"
                          handleColor="#ffffff"
                          successColor="#C8490E"
                          dangerColor="#DC2626"
                          onConfirm={handleBookingConfirm}
                        />
                        <span className="text-[11px] text-gray-500">
                          Slide right to confirm your free measurement appointment
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Confirmation State */
                    <div className="rounded-2xl border-2 border-green-500/30 bg-green-50/50 p-6 text-center space-y-4">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <h4 className="text-xl font-extrabold text-green-900">
                        Appointment Confirmed, {bookingData.name}!
                      </h4>
                      <p className="text-sm text-green-800 max-w-md mx-auto leading-relaxed">
                        We have reserved your free on-site yard walk-through for{' '}
                        <span className="font-bold">{bookingData.callbackTime}</span>. Our lead installer will reach out at{' '}
                        <span className="font-bold">{bookingData.phone}</span> to confirm arrival time.
                      </p>

                      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={handleRecalculate}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-100 shadow-sm"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>Estimate Another Fence</span>
                        </button>

                        <button
                          type="button"
                          onClick={triggerCall}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-primary-dark shadow-sm"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          <span>Call Lead Installer Now</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Step>
            </Stepper>
          </div>
        </div>
      </div>
    </section>
  );
}

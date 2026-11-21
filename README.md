# Oakridge Fence Co. — Static Website Template

A production-ready, ultra-polished, mobile-first static website template engineered for **Residential & Commercial Fencing Contractors**, ready for zero-config deployment on **Cloudflare Pages**.

Achieves **100 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO** in Google Lighthouse.

---

## 🚀 Single-File Client Customization Architecture

This entire template is configured through a single typed configuration file:  
[`src/config/siteConfig.ts`](src/config/siteConfig.ts)

**Strict Rule:** 100% of business copy, phone numbers, email addresses, license badges, service areas, pricing rates, reviews, gallery items, FAQs, and brand colors live in `siteConfig.ts`. Zero client-specific content is hardcoded into any component.

### How to Onboard a New Fencing Contractor in 5 Minutes:

1. **Edit Brand & Contact Details:**
   Open `src/config/siteConfig.ts` and update:
   - `brand.name`, `brand.tagline`, `brand.ownerName`, `brand.ownerQuote`, `brand.yearsInBusiness`
   - `contact.phoneDisplay`, `contact.phoneHref`, `contact.email`, `contact.hours`, `contact.regionName`, `contact.serviceAreas`
   - `contact.licenseBadge` (or set to `""` to cleanly hide without layout shift)
   - `contact.formEndpoint` (Formspree or webhook URL, or leave `""` for built-in client receipt)

2. **Customize Brand Colors:**
   Update the `theme` block in `src/config/siteConfig.ts`:
   ```ts
   theme: {
     primaryHex: '#2D4A3A',      // Deep Forest Green
     primaryDarkHex: '#1F3529',  // Dark Forest
     accentHex: '#C8490E',       // Accessible Safety Orange (WCAG AA > 4.5:1)
     accentHoverHex: '#A83B0A',  // Orange Hover
   }
   ```
   These are dynamically injected into CSS custom properties (`--brand-primary`, `--brand-accent`).

3. **Replace Images in `public/images/`:**
   Drop your client's optimized `.webp` (or `.svg` / `.jpg`) photos into `public/images/` using matching filenames or update paths in `siteConfig.ts`:
   - `hero-fence.svg` (Hero background photo, 1600x1000)
   - `wood-privacy.svg`, `vinyl-pvc.svg`, `ornamental-iron.svg`, `chain-link.svg` (Service cards, 800x600)
   - `gallery-1.svg` to `gallery-6.svg` (Project gallery, 800x600)
   - `owner-avatar.svg` (Owner headshot, 1:1 square)
   - `og-image.svg` (Open Graph card, 1200x630)

4. **Tune the Ballpark Cost Estimator:**
   Update unit rates, gate hardware costs, and tear-out disposal pricing in `estimator`:
   - `currencySymbol` (`"$"`, `"£"`, `"A$"`, `"C$"`)
   - `unit` (`"ft"` or `"m"`)
   - `materials` (wood, vinyl, iron, chainlink per-foot rates)
   - `singleGateCost`, `doubleGateCost`, `tearOutLowPerUnit`, `tearOutHighPerUnit`

---

## 🛠️ Tech Stack & Lighthouse 100 Engineering

- **Framework:** React 18+ & Vite & TypeScript
- **Styling:** Tailwind CSS (strict mobile-first 375px–430px design system)
- **Icons:** `lucide-react` (strictly tree-shaken, zero font icon bundles)
- **Typography:** Self-hosted `@fontsource-variable/plus-jakarta-sans` (Zero FOIT, Zero external Google Fonts DNS delay)
- **LCP & CLS = 0:**
  - Hero image uses explicit `<img>` with `fetchPriority="high" decoding="sync"` inside a fixed/min-height container.
  - Below-the-fold images use `loading="lazy" decoding="async"` with explicit width/height and Tailwind `aspect-[...]` wrappers.
- **Accessibility (100):**
  - Strict single `<h1>` hierarchy (`<h1>` &rarr; `<h2>` &rarr; `<h3>`).
  - High contrast everywhere (`#C8490E` safety orange for 4.6:1 contrast with white).
  - Native `<details>`/`<summary>` accordion for FAQs (zero JS overhead).
  - All interactive controls meet minimum 44px–48px tap target height.
  - Escape key closing and focus management on modals and mobile drawer.
  - Pinch-to-zoom enabled.
- **SEO (100):**
  - Complete `HomeAndConstructionBusiness` Schema.org JSON-LD injected dynamically.
  - Semantic HTML, meta description, Open Graph tags, and `public/robots.txt`.

---

## 📦 Build & Deploy on Cloudflare Pages

### Local Development:
```bash
npm install
npm run dev
```

### Production Build:
```bash
npm run build
```
Build output is saved to the `dist/` directory.

### Cloudflare Pages Deployment (Zero-Config):
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Build Output Directory:** `dist`
- **Node.js Version:** 18+ (automatic)

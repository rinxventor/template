/* AI DATA SWAP TARGET: To customise this site for a new fencing contractor, ONLY edit this file and replace images inside public/images/. All UI components, SEO schema, estimator math, and optional badges adapt automatically. */

export interface Brand {
  name: string;
  tagline: string;
  ownerName: string;
  ownerRole: string;
  ownerQuote: string;
  ownerAvatar: string;
  logoUrl: string | null;
  yearsInBusiness: number;
  projectsCompleted: number;
}

export interface Theme {
  primaryHex: string;
  primaryDarkHex: string;
  accentHex: string;
  accentHoverHex: string;
}

export interface Contact {
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  hours: string;
  regionName: string;
  city: string;
  stateCode: string;
  serviceAreas: string[];
  licenseBadge: string;
  formEndpoint: string;
}

export interface SocialProofPlatform {
  rating: number;
  reviewCount: number;
  url: string;
}

export interface SocialProof {
  google: SocialProofPlatform | null;
  facebook: SocialProofPlatform | null;
  trustBadges: string[];
}

export interface Hero {
  headline: string;
  subheadline: string;
  heroImage: string;
  heroImageAlt: string;
  quickQuoteTitle: string;
  serviceOptions: string[];
}

export interface MaterialOption {
  id: string;
  name: string;
  shortDesc: string;
  lowRatePerUnit: number;
  highRatePerUnit: number;
  lifespan: string;
  maintenance: string;
  image: string;
  highlights: string[];
}

export interface HeightOption {
  label: string;
  value: number;
  multiplier: number;
}

export interface TerrainOption {
  label: string;
  multiplier: number;
}

export interface Estimator {
  currencySymbol: string;
  unit: 'ft' | 'm';
  minLength: number;
  maxLength: number;
  step: number;
  defaultLength: number;
  presets: { label: string; value: number }[];
  materials: MaterialOption[];
  heights: HeightOption[];
  terrains: TerrainOption[];
  singleGateCost: number;
  doubleGateCost: number;
  tearOutLowPerUnit: number;
  tearOutHighPerUnit: number;
  disclaimerText: string;
}

export interface ServiceCard {
  id: string;
  materialId: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  lifespan: string;
  maintenance: string;
  startingRate: string;
  highlights: string[];
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  title: string;
  material: string;
  suburb: string;
  lengthLabel: string;
}

export interface Review {
  id: string;
  author: string;
  suburb: string;
  rating: number;
  serviceType: string;
  text: string;
  source: 'Google' | 'Facebook';
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SEO {
  title: string;
  description: string;
  ogImage: string;
  priceRange: string;
}

export interface SiteConfig {
  brand: Brand;
  theme: Theme;
  contact: Contact;
  socialProof: SocialProof;
  hero: Hero;
  estimator: Estimator;
  services: ServiceCard[];
  processSteps: ProcessStep[];
  gallery: GalleryItem[];
  reviews: Review[];
  faqs: FAQ[];
  seo: SEO;
}

const siteConfig: SiteConfig = {
  brand: {
    name: 'Oakridge Fence Co.',
    tagline: "Looking for fencing experts? We're just a call away!",
    ownerName: 'Mike Caldwell',
    ownerRole: 'Owner & Lead Installer — 20+ Years',
    ownerQuote: 'Every fence we build is one I\'d put in my own backyard. Straight posts, tight boards, concrete-set — no shortcuts.',
    ownerAvatar: '/images/owner-avatar.svg',
    logoUrl: null,
    yearsInBusiness: 22,
    projectsCompleted: 1850,
  },

  theme: {
    primaryHex: '#2D4A3A',
    primaryDarkHex: '#1F3529',
    accentHex: '#C8490E',
    accentHoverHex: '#A83B0A',
  },

  contact: {
    phoneDisplay: '(407) 555-0193',
    phoneHref: 'tel:+14075550193',
    email: 'info@oakridgefence.com',
    hours: 'Mon–Sat 7 AM – 6 PM',
    regionName: 'Central Florida',
    city: 'Orlando',
    stateCode: 'FL',
    serviceAreas: [
      'Winter Park',
      'Lake Nona',
      'Dr. Phillips',
      'Windermere',
      'Kissimmee',
      'Celebration',
      'Altamonte Springs',
      'Oviedo',
    ],
    licenseBadge: 'LICENSED & INSURED • #FL-849201',
    formEndpoint: '',
  },

  socialProof: {
    google: {
      rating: 4.9,
      reviewCount: 148,
      url: 'https://g.page/oakridgefence/review',
    },
    facebook: {
      rating: 5.0,
      reviewCount: 64,
      url: 'https://facebook.com/oakridgefence',
    },
    trustBadges: [
      'Google Guaranteed',
      'Licensed & Bonded',
      '5-Year Workmanship Warranty',
      'Free On-Site Estimates',
      'Locally Owned',
    ],
  },

  hero: {
    headline: 'Fence Service In Central Florida',
    subheadline: 'Straight posts, concrete-set footings, and clean craftsmanship — from wood privacy to ornamental iron. Free on-site measures for every project.',
    heroImage: '/images/hero-fence.svg',
    heroImageAlt: 'Professional wood privacy fence installation by Oakridge Fence Co. in Central Florida',
    quickQuoteTitle: 'Request a Free Callback — Or Use Our Instant Estimator Below',
    serviceOptions: [
      'Wood Privacy Fence',
      'Vinyl / PVC Fence',
      'Ornamental Iron / Aluminium',
      'Chain Link Fence',
      'Fence Repair / Replacement',
      'Gate Installation',
    ],
  },

  estimator: {
    currencySymbol: '$',
    unit: 'ft',
    minLength: 40,
    maxLength: 500,
    step: 10,
    defaultLength: 180,
    presets: [
      { label: 'Small Yard ~100 ft', value: 100 },
      { label: 'Standard ~180 ft', value: 180 },
      { label: 'Large Lot ~300 ft', value: 300 },
    ],
    materials: [
      {
        id: 'wood',
        name: 'Wood Privacy',
        shortDesc: 'Classic cedar or pressure-treated pine — the most popular residential choice.',
        lowRatePerUnit: 28,
        highRatePerUnit: 42,
        lifespan: '15–20 years',
        maintenance: 'Stain every 2–3 yrs',
        image: '/images/wood-privacy.svg',
        highlights: [
          'Natural look with full privacy',
          'Most affordable privacy option',
          'Stainable to match any home',
        ],
      },
      {
        id: 'vinyl',
        name: 'Vinyl / PVC',
        shortDesc: 'Zero-maintenance privacy panels that never need painting or staining.',
        lowRatePerUnit: 35,
        highRatePerUnit: 55,
        lifespan: '25–30 years',
        maintenance: 'Hose off yearly',
        image: '/images/vinyl-pvc.svg',
        highlights: [
          'Never rots, warps, or needs paint',
          'Wind-rated reinforced rails',
          'Lifetime color-fade warranty',
        ],
      },
      {
        id: 'iron',
        name: 'Ornamental Iron / Alum.',
        shortDesc: 'Elegant powder-coated pickets for curb appeal and pool code compliance.',
        lowRatePerUnit: 38,
        highRatePerUnit: 60,
        lifespan: '30–50 years',
        maintenance: 'Virtually none',
        image: '/images/ornamental-iron.svg',
        highlights: [
          'Pool-code and HOA compliant',
          'Rust-proof aluminium option',
          'Adds serious curb appeal',
        ],
      },
      {
        id: 'chainlink',
        name: 'Chain Link',
        shortDesc: 'Durable galvanized or vinyl-coated — great for pets, yards, and commercial lots.',
        lowRatePerUnit: 15,
        highRatePerUnit: 25,
        lifespan: '20–25 years',
        maintenance: 'Virtually none',
        image: '/images/chain-link.svg',
        highlights: [
          'Most cost-effective option',
          'Great for pet containment',
          'Available in black or green vinyl coat',
        ],
      },
    ],
    heights: [
      { label: '4 ft', value: 4, multiplier: 0.88 },
      { label: '6 ft', value: 6, multiplier: 1.0 },
      { label: '8 ft', value: 8, multiplier: 1.22 },
    ],
    terrains: [
      { label: 'Flat', multiplier: 1.0 },
      { label: 'Slight Slope', multiplier: 1.08 },
      { label: 'Steep / Rocky', multiplier: 1.18 },
    ],
    singleGateCost: 350,
    doubleGateCost: 850,
    tearOutLowPerUnit: 3,
    tearOutHighPerUnit: 6,
    disclaimerText: 'Ballpark planning estimate only. Exact written pricing is confirmed during your free on-site yard measurement.',
  },

  services: [
    {
      id: 'svc-wood',
      materialId: 'wood',
      title: 'Wood Privacy Fencing',
      description: 'Classic cedar or pressure-treated pine privacy fences built with concrete-set posts and premium hardware.',
      image: '/images/wood-privacy.svg',
      imageAlt: 'Wood privacy fence installation in Central Florida',
      lifespan: '15–20 years',
      maintenance: 'Stain every 2–3 years',
      startingRate: '$28/ft',
      highlights: [
        'Natural look with full privacy',
        'Most affordable privacy option',
        'Stainable to match any home',
      ],
    },
    {
      id: 'svc-vinyl',
      materialId: 'vinyl',
      title: 'Vinyl / PVC Fencing',
      description: 'Zero-maintenance vinyl privacy and semi-privacy panels with reinforced aluminum inserts.',
      image: '/images/vinyl-pvc.svg',
      imageAlt: 'White vinyl PVC fence in Central Florida backyard',
      lifespan: '25–30 years',
      maintenance: 'Hose off yearly',
      startingRate: '$35/ft',
      highlights: [
        'Never rots, warps, or needs paint',
        'Wind-rated reinforced rails',
        'Lifetime color-fade warranty',
      ],
    },
    {
      id: 'svc-iron',
      materialId: 'iron',
      title: 'Ornamental Iron / Aluminium',
      description: 'Elegant powder-coated picket fencing for pool enclosures, front yards, and HOA properties.',
      image: '/images/ornamental-iron.svg',
      imageAlt: 'Black ornamental iron aluminium fence around pool area',
      lifespan: '30–50 years',
      maintenance: 'Virtually none',
      startingRate: '$38/ft',
      highlights: [
        'Pool-code and HOA compliant',
        'Rust-proof aluminium option',
        'Adds serious curb appeal',
      ],
    },
    {
      id: 'svc-chainlink',
      materialId: 'chainlink',
      title: 'Chain Link Fencing',
      description: 'Durable galvanized or vinyl-coated chain link for residential yards and commercial properties.',
      image: '/images/chain-link.svg',
      imageAlt: 'Chain link fence installation for residential yard',
      lifespan: '20–25 years',
      maintenance: 'Virtually none',
      startingRate: '$15/ft',
      highlights: [
        'Most cost-effective option',
        'Great for pet containment',
        'Available in black or green coat',
      ],
    },
  ],

  processSteps: [
    {
      step: 1,
      title: 'Instant Estimate & Free Measure',
      description: 'Use our online calculator for a ballpark range, then we visit your property to measure and discuss materials, layout, and any HOA or permit needs.',
    },
    {
      step: 2,
      title: 'Fixed Written Quote & Utility Check',
      description: 'You get a detailed written quote with no hidden fees. We handle the 811 utility locate and pull any required local permits before work starts.',
    },
    {
      step: 3,
      title: 'Clean 1–2 Day Install & Final Walkthrough',
      description: 'Our crew installs your fence with concrete-set posts, cleans up every scrap, and walks you through the finished job before we leave.',
    },
  ],

  gallery: [
    {
      id: 'gal-1',
      image: '/images/gallery-1.svg',
      alt: '6-foot cedar privacy fence with lattice top in Winter Park FL',
      title: 'Cedar Privacy with Lattice Top',
      material: 'Wood',
      suburb: 'Winter Park',
      lengthLabel: '210 ft',
    },
    {
      id: 'gal-2',
      image: '/images/gallery-2.svg',
      alt: 'White vinyl privacy fence installation in Lake Nona FL',
      title: 'White Vinyl Privacy Panels',
      material: 'Vinyl',
      suburb: 'Lake Nona',
      lengthLabel: '165 ft',
    },
    {
      id: 'gal-3',
      image: '/images/gallery-3.svg',
      alt: 'Black ornamental aluminium pool fence in Dr. Phillips FL',
      title: 'Black Aluminium Pool Fence',
      material: 'Iron',
      suburb: 'Dr. Phillips',
      lengthLabel: '120 ft',
    },
    {
      id: 'gal-4',
      image: '/images/gallery-4.svg',
      alt: 'Commercial chain link fence with privacy slats in Kissimmee FL',
      title: 'Chain Link with Privacy Slats',
      material: 'Chain Link',
      suburb: 'Kissimmee',
      lengthLabel: '340 ft',
    },
    {
      id: 'gal-5',
      image: '/images/gallery-5.svg',
      alt: 'Board-on-board cedar privacy fence in Windermere FL',
      title: 'Board-on-Board Cedar',
      material: 'Wood',
      suburb: 'Windermere',
      lengthLabel: '280 ft',
    },
    {
      id: 'gal-6',
      image: '/images/gallery-6.svg',
      alt: 'Tan vinyl privacy fence in Celebration FL neighborhood',
      title: 'Tan Vinyl Privacy',
      material: 'Vinyl',
      suburb: 'Celebration',
      lengthLabel: '190 ft',
    },
  ],

  reviews: [
    {
      id: 'rev-1',
      author: 'Sarah M.',
      suburb: 'Winter Park',
      rating: 5,
      serviceType: 'Wood Privacy Fence',
      text: 'Mike and his crew replaced our 20-year-old fence in a day and a half. Every post is concrete-set, the boards are tight, and they cleaned up better than they found it. Already recommended them to two neighbors.',
      source: 'Google',
    },
    {
      id: 'rev-2',
      author: 'James & Linda T.',
      suburb: 'Lake Nona',
      rating: 5,
      serviceType: 'Vinyl Privacy Fence',
      text: "We got three quotes and Oakridge was the most transparent. No hidden fees, showed up when they said they would, and our vinyl fence looks incredible. The kids and the dog are happy — that's all that matters.",
      source: 'Google',
    },
    {
      id: 'rev-3',
      author: 'Robert K.',
      suburb: 'Dr. Phillips',
      rating: 5,
      serviceType: 'Ornamental Aluminium Fence',
      text: 'Needed a pool-code-compliant fence fast before our inspection. Oakridge pulled the permit, did the utility locate, and had it installed in 3 days. Inspector passed it first try. Professional from start to finish.',
      source: 'Google',
    },
    {
      id: 'rev-4',
      author: 'Diana P.',
      suburb: 'Celebration',
      rating: 5,
      serviceType: 'Fence Repair',
      text: 'Hurricane took out two sections of our cedar fence. Oakridge matched the existing stain perfectly and replaced the damaged posts with concrete-set ones. You can\'t tell which sections are new. Fair price, honest crew.',
      source: 'Facebook',
    },
  ],

  faqs: [
    {
      question: 'Do I need a permit to build a fence in Central Florida?',
      answer: 'Most Orange, Seminole, and Osceola County jurisdictions require a fence permit for new installations. We handle the full permit process for you — including HOA architectural review submittals if needed — so you don\'t have to visit any county office.',
    },
    {
      question: 'How do I know where my property line is?',
      answer: 'We recommend having a licensed surveyor mark your property corners before we install. If you have an existing survey, we\'ll use those pins. Installing a fence on a neighbor\'s property can create expensive legal issues, so we always confirm boundaries before we dig.',
    },
    {
      question: 'How long does a typical fence installation take?',
      answer: 'Most residential fence projects (100–300 ft) are completed in 1–2 days once materials arrive. Larger properties, ornamental iron with custom gates, or challenging terrain may take 2–3 days. We\'ll give you a specific timeline in your written quote.',
    },
    {
      question: 'Can you remove and haul away my old fence?',
      answer: 'Yes. We offer complete tear-out and disposal of your existing fence. The cost depends on the material and length — our estimator above includes a tear-out option so you can see the ballpark cost instantly.',
    },
    {
      question: 'What warranty do you offer on fence installations?',
      answer: 'Every Oakridge installation comes with a 5-year workmanship warranty covering posts, rails, and hardware. Material warranties vary by manufacturer — vinyl and aluminium products typically carry 20–30 year or lifetime manufacturer warranties that we pass through to you.',
    },
  ],

  seo: {
    title: 'Oakridge Fence Co. — Central Florida Fencing Contractor',
    description: 'Professional fence installation in Central Florida. Wood privacy, vinyl, ornamental iron, and chain link fencing. Free on-site estimates. Licensed & insured. Call (407) 555-0193.',
    ogImage: '/images/og-image.svg',
    priceRange: '$15–$60 per linear foot',
  },
};

export default siteConfig;

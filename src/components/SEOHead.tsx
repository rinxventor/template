import { useEffect } from 'react';
import siteConfig from '../config/siteConfig';

export default function SEOHead() {
  const { seo, brand, contact, socialProof } = siteConfig;

  useEffect(() => {
    // 1. Sync document title
    document.title = seo.title;

    // 2. Sync Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seo.description);

    // 3. Sync Open Graph Meta
    const ogTags: Record<string, string> = {
      'og:title': seo.title,
      'og:description': seo.description,
      'og:image': seo.ogImage,
      'og:type': 'website',
      'twitter:card': 'summary_large_image',
      'twitter:title': seo.title,
      'twitter:description': seo.description,
      'twitter:image': seo.ogImage,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // 4. Inject JSON-LD Schema for HomeAndConstructionBusiness
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      name: brand.name,
      description: seo.description,
      telephone: contact.phoneDisplay,
      email: contact.email,
      priceRange: seo.priceRange,
      address: {
        '@type': 'PostalAddress',
        addressLocality: contact.city,
        addressRegion: contact.stateCode,
        addressCountry: 'US',
      },
      areaServed: contact.serviceAreas.map((area) => ({
        '@type': 'City',
        name: area,
      })),
      openingHours: contact.hours,
      ...(socialProof.google && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: socialProof.google.rating,
          reviewCount: socialProof.google.reviewCount,
          bestRating: '5',
          worstRating: '1',
        },
      }),
    };

    let scriptTag = document.getElementById('json-ld-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);
  }, [seo, brand, contact, socialProof]);

  return null;
}

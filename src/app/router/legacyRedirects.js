/**
 * Redirects kept alive for the URLs the previous WordPress site had indexed.
 * Nothing here is linked from the current navigation; the only job of these
 * entries is to stop inbound links and search results from 404ing.
 */

export const legacyCoreGroupSlugs = [
  'community-nutrtion',
  'core-groups-diabetes-india',
  'critical-care',
  'digitization-in-nutrition',
  'dysphagia-core-group',
  'eras-core-group',
  'fertility-maternal-nutrition',
  'gastrointestinal-nutrition',
  'geriatric-nutrition',
  'hypertension-core-group',
  'integrated-nutrition-and-dietetics',
  'metabolic-syndrome-and-nutrition',
  'neuro-nutrition',
  'nutrition-in-transplant',
  'onco-core',
  'pediatric-core-group',
  'renal-core-group-iapen',
];

export const legacyChapterSlugs = [
  'ahmedabad-chapter',
  'bangaluru-chapter',
  'bhopal-chapter',
  'bhubaneswar-chapter',
  'chandigarh-chapter',
  'chennai-chapter',
  'cochin-chapter',
  'coimbatore-chapter',
  'delhi-chapter',
  'etawah-chapter',
  'faridabad-chapter',
  'guwahati-chapter',
  'hyderabad-chapter',
  'indore-chapter',
  'kannur-chapter',
  'lucknow-chapter',
  'ludhiana-chapter',
  'mangaluru-chapter',
  'meerut-chapter',
  'mumbai-chapter',
  'nagpur-chapter',
  'nashik-chapter',
  'navi-mumbai-chapter',
  'patna-chapter',
  'prayagraj-chapter',
  'puducherry-chapter',
  'pune-chapter',
  'raipur-chapter',
  'ranchi-chapter',
  'sambhajinagar-chapter',
  'surat-chapter',
  'vadodara-chapter',
  'varanasi-chapter',
  'vijayawada-chapter',
  'vizag-chapter',
];

// WordPress theme demo content that was indexed but is unrelated to IAPEN India.
// These URLs are intentionally retired instead of being copied into the new clinical site.
export const retiredThemeSlugs = [
  'elements',
  'faqs',
  'appointment-form',
  'my-dental-office-need-a-blog-area-galley-printingdern-care-to-ailing-dear',
  'my-dental-office-need-a-blog-area-galley-printingdern-care-to-ailing-dear-2',
  'your-medical-records-are-safe-now-a-days',
  'medical-records-are-safe-your-now-a-days',
  'dental-office-printingdern-care-to-ailing-dear',
  'dental-office-printingdern-care-to-ailing-dear-3',
  'medical-records-are-safe-your-now-a-days2',
  'your-medical-records-are-safe-now-a-days-copy',
  'printingdern-dental-office-need-a-blog-area-galley-printingdern-care-to-ailing-dear',
  'dental-office-need-a-blog-area-galley-printingdern-care-to-ailing-dear',
  'my-dental-office-need-a-blog-area-galley-printingdern-care-to-ailing-dear3',
  'my-dental-office-need-a-blog-area-galley-printingdern-care-to-ailing-dear-copy-2',
  'gallery/modern-clinic-2',
  'gallery/modern-clinic-3',
  'gallery/modern-clinic-4',
  'gallery/modern-clinic-5',
  'gallery/modern-clinic-6',
  'gallery/modern-clinic-8',
  'services/all-certified-doctors',
  'services/using-modern-technology-2',
  'services/guarantee-success-of-treatments-2',
];

// One-off renames: the old path on the left, its destination on the right.
export const legacyPathRedirects = [
  { from: '/about-us', to: '/about' },
  { from: '/contact-us', to: '/contact' },
  { from: '/refund_returns', to: '/refund-policy' },
  { from: '/gi-core-group', to: '/core-groups/gastrointestinal-nutrition' },
  { from: '/dashboard', to: '/membership' },
];

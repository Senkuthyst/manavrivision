// Payment & Subscription Data
// Sandbox/MVP structure for premium features

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Relative to USD
}

export interface SubscriptionTier {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  priceMonthly: boolean;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

export interface InstitutionPlan {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  seats: number | 'unlimited';
  features: string[];
}

export interface ContributionOption {
  id: string;
  name: string;
  description: string;
  amountUSD: number;
  impact: string;
  icon: string;
}

export const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  { code: 'NPR', symbol: 'रू', name: 'Nepalese Rupee', rate: 133.5 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.2 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.53 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.36 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 149.5 },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', rate: 7.24 }
];

export const subscriptionTiers: SubscriptionTier[] = [
  {
    id: 'free',
    name: 'Explorer',
    description: 'Start your journey with essential features',
    priceUSD: 0,
    priceMonthly: true,
    features: [
      'Basic destination information',
      '3 learning modules per month',
      'Community access',
      'Basic safety alerts',
      'Limited quiz attempts'
    ],
    highlighted: false
  },
  {
    id: 'premium',
    name: 'Premium Traveler',
    description: 'Unlock the full TravelLens experience',
    priceUSD: 9.99,
    priceMonthly: true,
    features: [
      'All 50+ learning modules',
      'Unlimited VR experiences',
      'AI Local Guide - unlimited chats',
      'Full Safety Intelligence suite',
      'Offline Safety Packs',
      'Knowledge Passport & badges',
      'Priority community features',
      'Smart trip planning tools'
    ],
    highlighted: true,
    badge: 'Most Popular'
  },
  {
    id: 'annual',
    name: 'Annual Explorer',
    description: 'Best value for dedicated travelers',
    priceUSD: 79.99,
    priceMonthly: false,
    features: [
      'Everything in Premium',
      '2 months free (save 33%)',
      'Early access to new features',
      'Exclusive cultural content',
      'Direct expert consultations',
      'Personalized learning paths'
    ],
    highlighted: false,
    badge: 'Best Value'
  }
];

export const institutionPlans: InstitutionPlan[] = [
  {
    id: 'classroom',
    name: 'Classroom',
    description: 'Perfect for individual teachers',
    priceUSD: 29.99,
    seats: 30,
    features: [
      'Up to 30 student seats',
      'Teacher dashboard',
      'Progress tracking',
      'Curriculum integration guides',
      'Basic analytics'
    ]
  },
  {
    id: 'school',
    name: 'School',
    description: 'For departments and small schools',
    priceUSD: 199.99,
    seats: 200,
    features: [
      'Up to 200 student seats',
      'Multiple teacher accounts',
      'Advanced analytics',
      'Custom learning paths',
      'Assignment creation tools',
      'LMS integration support'
    ]
  },
  {
    id: 'institution',
    name: 'Institution',
    description: 'For universities and large organizations',
    priceUSD: 0, // Custom pricing
    seats: 'unlimited',
    features: [
      'Unlimited seats',
      'Dedicated account manager',
      'Custom content creation',
      'API access',
      'White-label options',
      'Research collaboration',
      'Priority support'
    ]
  }
];

export const contributionOptions: ContributionOption[] = [
  {
    id: 'heritage',
    name: 'Heritage Guardian',
    description: 'Support UNESCO site preservation in Nepal',
    amountUSD: 5,
    impact: 'Helps maintain one heritage site for a day',
    icon: 'Landmark'
  },
  {
    id: 'artisan',
    name: 'Artisan Supporter',
    description: 'Enable local craft preservation workshops',
    amountUSD: 10,
    impact: 'Provides materials for one artisan training session',
    icon: 'Palette'
  },
  {
    id: 'community',
    name: 'Community Champion',
    description: 'Fund sustainable tourism education programs',
    amountUSD: 25,
    impact: 'Sponsors one local guide training day',
    icon: 'Users'
  },
  {
    id: 'ecosystem',
    name: 'Ecosystem Protector',
    description: 'Support wildlife and nature conservation',
    amountUSD: 50,
    impact: 'Funds anti-poaching patrols for one week',
    icon: 'TreePine'
  }
];

// Premium feature access control
export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  requiredTier: 'free' | 'premium' | 'annual';
}

export const premiumFeatures: PremiumFeature[] = [
  { id: 'vr-unlimited', name: 'Unlimited VR Experiences', description: 'Access all 360° panoramic destinations', requiredTier: 'premium' },
  { id: 'ai-guide', name: 'AI Local Guide', description: 'Unlimited intelligent conversations', requiredTier: 'premium' },
  { id: 'safety-full', name: 'Full Safety Intelligence', description: 'Real-time alerts and evacuation planning', requiredTier: 'premium' },
  { id: 'offline-packs', name: 'Offline Safety Packs', description: 'Download emergency info for offline access', requiredTier: 'premium' },
  { id: 'modules-all', name: 'All Learning Modules', description: 'Complete educational content library', requiredTier: 'premium' },
  { id: 'passport', name: 'Knowledge Passport', description: 'Track achievements and unlock badges', requiredTier: 'premium' }
];

// Utility functions
export const convertCurrency = (amountUSD: number, toCurrency: string): number => {
  const currency = currencies.find(c => c.code === toCurrency);
  if (!currency) return amountUSD;
  return Math.round(amountUSD * currency.rate * 100) / 100;
};

export const formatPrice = (amount: number, currencyCode: string): string => {
  const currency = currencies.find(c => c.code === currencyCode);
  if (!currency) return `$${amount}`;
  
  if (currencyCode === 'JPY' || currencyCode === 'NPR' || currencyCode === 'INR') {
    return `${currency.symbol}${Math.round(amount).toLocaleString()}`;
  }
  return `${currency.symbol}${amount.toFixed(2)}`;
};

export const hasFeatureAccess = (featureId: string, userTier: string): boolean => {
  const feature = premiumFeatures.find(f => f.id === featureId);
  if (!feature) return true; // Unknown features are accessible
  
  if (feature.requiredTier === 'free') return true;
  if (feature.requiredTier === 'premium' && (userTier === 'premium' || userTier === 'annual')) return true;
  if (feature.requiredTier === 'annual' && userTier === 'annual') return true;
  
  return false;
};

// Safety & Crisis Intelligence Data
// API-ready structure for future real-time integration

export type SafetyLevel = 'peaceful' | 'caution' | 'high-risk';
export type AlertType = 'political' | 'weather' | 'health' | 'transport' | 'general';

export interface SafetyZone {
  id: string;
  name: string;
  region: string;
  level: SafetyLevel;
  coordinates: { lat: number; lng: number };
  description: string;
  lastUpdated: string;
  factors: string[];
}

export interface SafetyAlert {
  id: string;
  type: AlertType;
  title: string;
  description: string;
  affectedAreas: string[];
  severity: 'low' | 'medium' | 'high';
  startDate: string;
  endDate?: string;
  isActive: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  description: string;
  available24h: boolean;
  icon: string;
}

export interface Embassy {
  id: string;
  country: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  emergencyLine?: string;
  coordinates: { lat: number; lng: number };
}

export interface EvacuationRoute {
  id: string;
  name: string;
  from: string;
  to: string;
  type: 'road' | 'air' | 'bus';
  status: 'open' | 'limited' | 'closed';
  estimatedTime: string;
  notes: string;
}

export interface RiskAssessment {
  destinationId: string;
  overallRisk: SafetyLevel;
  lastUpdated: string;
  confidence: number;
  factors: {
    political: { level: number; description: string };
    health: { level: number; description: string };
    natural: { level: number; description: string };
    crime: { level: number; description: string };
    infrastructure: { level: number; description: string };
  };
  recommendation: string;
}

// Demo data for Nepal destinations
export const safetyZones: SafetyZone[] = [
  {
    id: 'ktm',
    name: 'Kathmandu Valley',
    region: 'Bagmati',
    level: 'peaceful',
    coordinates: { lat: 27.7172, lng: 85.3240 },
    description: 'The capital region is generally safe with normal precautions advised. Tourist areas are well-patrolled.',
    lastUpdated: new Date().toISOString(),
    factors: ['Stable political environment', 'Active tourist police', 'Good healthcare access']
  },
  {
    id: 'pkr',
    name: 'Pokhara',
    region: 'Gandaki',
    level: 'peaceful',
    coordinates: { lat: 28.2096, lng: 83.9856 },
    description: 'Popular tourist destination with excellent safety record. Well-established tourism infrastructure.',
    lastUpdated: new Date().toISOString(),
    factors: ['Tourist-friendly area', 'Low crime rate', 'Good emergency services']
  },
  {
    id: 'lmb',
    name: 'Lumbini',
    region: 'Lumbini',
    level: 'peaceful',
    coordinates: { lat: 27.4833, lng: 83.2767 },
    description: 'Sacred pilgrimage site with peaceful atmosphere. UNESCO World Heritage site with good security.',
    lastUpdated: new Date().toISOString(),
    factors: ['Religious significance', 'UNESCO protected', 'Peaceful environment']
  },
  {
    id: 'cht',
    name: 'Chitwan',
    region: 'Bagmati',
    level: 'peaceful',
    coordinates: { lat: 27.5291, lng: 84.3542 },
    description: 'National park area with organized tourism. Wildlife safety guidelines should be followed.',
    lastUpdated: new Date().toISOString(),
    factors: ['Well-managed tourism', 'Park rangers present', 'Guided tours recommended']
  },
  {
    id: 'ann',
    name: 'Annapurna Region',
    region: 'Gandaki',
    level: 'caution',
    coordinates: { lat: 28.5969, lng: 83.8203 },
    description: 'Trekking area requiring preparation. Weather conditions and altitude sickness are primary concerns.',
    lastUpdated: new Date().toISOString(),
    factors: ['High altitude risks', 'Weather variability', 'Remote medical facilities']
  },
  {
    id: 'evb',
    name: 'Everest Base Camp',
    region: 'Koshi',
    level: 'caution',
    coordinates: { lat: 28.0025, lng: 86.8528 },
    description: 'High-altitude trekking zone. Proper acclimatization and experienced guides essential.',
    lastUpdated: new Date().toISOString(),
    factors: ['Extreme altitude', 'Challenging terrain', 'Limited rescue options']
  }
];

export const safetyAlerts: SafetyAlert[] = [
  {
    id: 'alert-1',
    type: 'weather',
    title: 'Monsoon Season Advisory',
    description: 'Heavy rainfall expected in hill regions. Landslide risks in mountain areas. Plan travel accordingly.',
    affectedAreas: ['Annapurna Region', 'Everest Region', 'Langtang'],
    severity: 'medium',
    startDate: '2024-06-15',
    endDate: '2024-09-15',
    isActive: true
  },
  {
    id: 'alert-2',
    type: 'general',
    title: 'Festival Season - Dashain',
    description: 'Major festival period. Public offices and some services may have limited hours. Enhanced cultural experiences available.',
    affectedAreas: ['All regions'],
    severity: 'low',
    startDate: '2024-10-01',
    endDate: '2024-10-20',
    isActive: false
  }
];

export const emergencyContacts: EmergencyContact[] = [
  {
    id: 'police',
    name: 'Nepal Police',
    number: '100',
    description: 'General emergency police line for all incidents',
    available24h: true,
    icon: 'Shield'
  },
  {
    id: 'tourist-police',
    name: 'Tourist Police',
    number: '1144',
    description: 'Specialized assistance for tourists, multilingual support',
    available24h: true,
    icon: 'UserCheck'
  },
  {
    id: 'ambulance',
    name: 'Ambulance Service',
    number: '102',
    description: 'Emergency medical services and hospital transport',
    available24h: true,
    icon: 'Ambulance'
  },
  {
    id: 'fire',
    name: 'Fire Department',
    number: '101',
    description: 'Fire emergency and rescue services',
    available24h: true,
    icon: 'Flame'
  },
  {
    id: 'rescue',
    name: 'Mountain Rescue',
    number: '+977-1-4422406',
    description: 'High altitude rescue and helicopter evacuation',
    available24h: true,
    icon: 'Mountain'
  },
  {
    id: 'hospital',
    name: 'Grande Hospital',
    number: '+977-1-5159266',
    description: '24-hour emergency medical care in Kathmandu',
    available24h: true,
    icon: 'Hospital'
  }
];

export const embassies: Embassy[] = [
  {
    id: 'us',
    country: 'United States',
    name: 'U.S. Embassy Kathmandu',
    address: 'Maharajgunj, Kathmandu',
    phone: '+977-1-4234000',
    email: 'usloginembassy@state.gov',
    website: 'https://np.usembassy.gov',
    emergencyLine: '+977-1-4234000',
    coordinates: { lat: 27.7333, lng: 85.3333 }
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    name: 'British Embassy Kathmandu',
    address: 'Lainchaur, Kathmandu',
    phone: '+977-1-4237100',
    email: 'consular.kathmandu@fco.gov.uk',
    website: 'https://www.gov.uk/world/nepal',
    emergencyLine: '+977-1-4237100',
    coordinates: { lat: 27.7200, lng: 85.3100 }
  },
  {
    id: 'au',
    country: 'Australia',
    name: 'Australian Embassy Kathmandu',
    address: 'Bansbari, Kathmandu',
    phone: '+977-1-4371678',
    email: 'austemb.kathmandu@dfat.gov.au',
    website: 'https://nepal.embassy.gov.au',
    coordinates: { lat: 27.7400, lng: 85.3400 }
  },
  {
    id: 'in',
    country: 'India',
    name: 'Embassy of India',
    address: 'Lainchaur, Kathmandu',
    phone: '+977-1-4410900',
    email: 'cons.kathmandu@mea.gov.in',
    website: 'https://www.indembkathmandu.gov.in',
    emergencyLine: '+977-1-4411699',
    coordinates: { lat: 27.7180, lng: 85.3120 }
  },
  {
    id: 'cn',
    country: 'China',
    name: 'Chinese Embassy',
    address: 'Baluwatar, Kathmandu',
    phone: '+977-1-4411740',
    email: 'chinaemb_np@mfa.gov.cn',
    website: 'http://np.china-embassy.org',
    coordinates: { lat: 27.7280, lng: 85.3280 }
  }
];

export const evacuationRoutes: EvacuationRoute[] = [
  {
    id: 'route-1',
    name: 'Kathmandu - Delhi Flight',
    from: 'Tribhuvan International Airport',
    to: 'Indira Gandhi International Airport',
    type: 'air',
    status: 'open',
    estimatedTime: '1h 30m',
    notes: 'Multiple daily flights available. Book in advance during peak season.'
  },
  {
    id: 'route-2',
    name: 'Kathmandu - Border Road',
    from: 'Kathmandu',
    to: 'Raxaul/Birgunj Border',
    type: 'road',
    status: 'open',
    estimatedTime: '5-6 hours',
    notes: 'Main overland route to India. Border open 24 hours.'
  },
  {
    id: 'route-3',
    name: 'Pokhara Tourist Bus',
    from: 'Pokhara',
    to: 'Kathmandu',
    type: 'bus',
    status: 'open',
    estimatedTime: '6-7 hours',
    notes: 'Regular tourist buses available. Road conditions vary by season.'
  },
  {
    id: 'route-4',
    name: 'Mountain Helicopter Evacuation',
    from: 'Everest/Annapurna Region',
    to: 'Kathmandu',
    type: 'air',
    status: 'open',
    estimatedTime: '1-2 hours',
    notes: 'Weather dependent. Travel insurance with helicopter coverage required.'
  }
];

export const riskAssessments: RiskAssessment[] = [
  {
    destinationId: 'kathmandu',
    overallRisk: 'peaceful',
    lastUpdated: new Date().toISOString(),
    confidence: 92,
    factors: {
      political: { level: 20, description: 'Stable government, occasional peaceful demonstrations' },
      health: { level: 25, description: 'Good hospital access, standard precautions advised' },
      natural: { level: 30, description: 'Monsoon flooding risk, seismic activity possible' },
      crime: { level: 15, description: 'Low crime rate, petty theft in tourist areas' },
      infrastructure: { level: 20, description: 'Reliable transport, occasional power outages' }
    },
    recommendation: 'Safe for travel with normal precautions. Enjoy the rich cultural heritage and vibrant city life.'
  },
  {
    destinationId: 'pokhara',
    overallRisk: 'peaceful',
    lastUpdated: new Date().toISOString(),
    confidence: 95,
    factors: {
      political: { level: 10, description: 'Very stable, tourism-focused economy' },
      health: { level: 20, description: 'Good medical facilities, clean environment' },
      natural: { level: 25, description: 'Lake region, monsoon precautions needed' },
      crime: { level: 10, description: 'Very low crime, safe for solo travelers' },
      infrastructure: { level: 15, description: 'Excellent tourist infrastructure' }
    },
    recommendation: 'Excellent destination for all travelers. Perfect base for adventure activities and relaxation.'
  },
  {
    destinationId: 'annapurna',
    overallRisk: 'caution',
    lastUpdated: new Date().toISOString(),
    confidence: 88,
    factors: {
      political: { level: 10, description: 'Peaceful remote area' },
      health: { level: 55, description: 'Altitude sickness risk, limited medical access' },
      natural: { level: 60, description: 'Weather extremes, avalanche risk in winter' },
      crime: { level: 5, description: 'Virtually no crime' },
      infrastructure: { level: 45, description: 'Basic tea houses, no roads in high areas' }
    },
    recommendation: 'Suitable for prepared trekkers. Ensure proper acclimatization and hire experienced guides.'
  }
];

// Utility functions for API integration
export const getSafetyLevelColor = (level: SafetyLevel): string => {
  switch (level) {
    case 'peaceful': return 'success';
    case 'caution': return 'secondary';
    case 'high-risk': return 'destructive';
    default: return 'muted';
  }
};

export const getSafetyLevelLabel = (level: SafetyLevel): string => {
  switch (level) {
    case 'peaceful': return 'Generally Safe';
    case 'caution': return 'Exercise Caution';
    case 'high-risk': return 'High Alert';
    default: return 'Unknown';
  }
};

export const getAlertIcon = (type: AlertType): string => {
  switch (type) {
    case 'political': return 'Vote';
    case 'weather': return 'CloudRain';
    case 'health': return 'Heart';
    case 'transport': return 'Car';
    case 'general': return 'Bell';
    default: return 'AlertTriangle';
  }
};

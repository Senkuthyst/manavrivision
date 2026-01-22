// Responsible Travel & Sustainability Data

export interface SafetyScore {
  userId: string;
  culturalAwareness: number; // 0-100
  quizCompletion: number; // 0-100
  safetyReadiness: number; // 0-100
  environmentalRespect: number; // 0-100
  overallScore: number; // 0-100
  level: 'beginner' | 'aware' | 'responsible' | 'ambassador';
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
  requirement: string;
}

export interface SustainabilityIndicator {
  id: string;
  name: string;
  category: 'community' | 'environment' | 'culture' | 'economy';
  score: number; // 0-100
  description: string;
  tips: string[];
}

export interface OfflinePack {
  id: string;
  destination: string;
  lastUpdated: string;
  size: string;
  contents: string[];
  downloadUrl?: string;
}

export interface CulturalGuideline {
  id: string;
  category: 'do' | 'dont';
  title: string;
  description: string;
  importance: 'high' | 'medium' | 'low';
}

// Demo user safety score
export const demoSafetyScore: SafetyScore = {
  userId: 'demo-user',
  culturalAwareness: 75,
  quizCompletion: 60,
  safetyReadiness: 85,
  environmentalRespect: 70,
  overallScore: 72,
  level: 'aware',
  badges: [
    { id: 'first-quiz', name: 'Quiz Starter', description: 'Completed your first cultural quiz', icon: 'Award', earnedAt: '2024-01-15', requirement: 'Complete 1 quiz' },
    { id: 'safety-aware', name: 'Safety Conscious', description: 'Reviewed emergency contacts for a destination', icon: 'Shield', earnedAt: '2024-01-20', requirement: 'View emergency contacts' },
    { id: 'explorer', name: 'Cultural Explorer', description: 'Learned about 5 different destinations', icon: 'Compass', earnedAt: '2024-02-01', requirement: 'Explore 5 destinations' }
  ]
};

export const allBadges: Badge[] = [
  { id: 'first-quiz', name: 'Quiz Starter', description: 'Completed your first cultural quiz', icon: 'Award', requirement: 'Complete 1 quiz' },
  { id: 'quiz-master', name: 'Quiz Master', description: 'Score 100% on any quiz', icon: 'Trophy', requirement: 'Perfect quiz score' },
  { id: 'safety-aware', name: 'Safety Conscious', description: 'Reviewed emergency contacts for a destination', icon: 'Shield', requirement: 'View emergency contacts' },
  { id: 'prepared-traveler', name: 'Prepared Traveler', description: 'Downloaded an offline safety pack', icon: 'Download', requirement: 'Download offline pack' },
  { id: 'explorer', name: 'Cultural Explorer', description: 'Learned about 5 different destinations', icon: 'Compass', requirement: 'Explore 5 destinations' },
  { id: 'vr-pioneer', name: 'VR Pioneer', description: 'Experienced 3 VR destinations', icon: 'Glasses', requirement: '3 VR experiences' },
  { id: 'eco-warrior', name: 'Eco Warrior', description: 'Completed sustainability module', icon: 'Leaf', requirement: 'Complete eco module' },
  { id: 'community-member', name: 'Community Member', description: 'Joined the TravelLens community', icon: 'Users', requirement: 'Join community' },
  { id: 'heritage-guardian', name: 'Heritage Guardian', description: 'Contributed to cultural preservation', icon: 'Landmark', requirement: 'Make contribution' },
  { id: 'ambassador', name: 'Travel Ambassador', description: 'Achieved maximum responsibility score', icon: 'Star', requirement: '100% responsibility score' }
];

export const sustainabilityIndicators: SustainabilityIndicator[] = [
  {
    id: 'local-employment',
    name: 'Local Employment',
    category: 'economy',
    score: 85,
    description: 'Percentage of staff from local communities',
    tips: ['Ask about local guides', 'Support family-run businesses', 'Tip service workers fairly']
  },
  {
    id: 'cultural-respect',
    name: 'Cultural Sensitivity',
    category: 'culture',
    score: 90,
    description: 'Respect for local traditions and customs',
    tips: ['Dress modestly at religious sites', 'Ask permission before photography', 'Learn basic local phrases']
  },
  {
    id: 'environmental-impact',
    name: 'Environmental Care',
    category: 'environment',
    score: 75,
    description: 'Eco-friendly practices and conservation efforts',
    tips: ['Carry reusable water bottles', 'Avoid single-use plastics', 'Stay on marked trails']
  },
  {
    id: 'community-benefit',
    name: 'Community Benefit',
    category: 'community',
    score: 80,
    description: 'Direct positive impact on local communities',
    tips: ['Buy from local artisans', 'Choose locally-owned accommodations', 'Participate in community events']
  }
];

export const offlinePacks: OfflinePack[] = [
  {
    id: 'ktm-pack',
    destination: 'Kathmandu Valley',
    lastUpdated: '2024-01-20',
    size: '2.4 MB',
    contents: [
      'Emergency contacts (Police, Ambulance, Embassy)',
      'Hospital locations with maps',
      'Cultural do\'s and don\'ts',
      'Basic Nepali phrases',
      'Evacuation routes',
      'Offline maps of key areas'
    ]
  },
  {
    id: 'pkr-pack',
    destination: 'Pokhara',
    lastUpdated: '2024-01-18',
    size: '1.8 MB',
    contents: [
      'Emergency contacts',
      'Lake safety guidelines',
      'Paragliding safety info',
      'Cultural guidelines',
      'Hospital contacts',
      'Transport information'
    ]
  },
  {
    id: 'ann-pack',
    destination: 'Annapurna Region',
    lastUpdated: '2024-01-15',
    size: '3.2 MB',
    contents: [
      'Altitude sickness prevention',
      'Mountain rescue contacts',
      'Helicopter evacuation info',
      'Weather emergency protocols',
      'Tea house locations',
      'Trail safety guidelines'
    ]
  },
  {
    id: 'evb-pack',
    destination: 'Everest Region',
    lastUpdated: '2024-01-15',
    size: '3.5 MB',
    contents: [
      'High altitude medical guide',
      'Rescue helicopter services',
      'Acclimatization schedules',
      'Emergency shelter locations',
      'Satellite phone contacts',
      'Weather monitoring info'
    ]
  }
];

export const culturalGuidelines: CulturalGuideline[] = [
  // Do's
  { id: 'do-1', category: 'do', title: 'Remove shoes', description: 'Take off shoes before entering temples, homes, and some shops', importance: 'high' },
  { id: 'do-2', category: 'do', title: 'Use right hand', description: 'Use your right hand for giving and receiving items, eating', importance: 'high' },
  { id: 'do-3', category: 'do', title: 'Dress modestly', description: 'Cover shoulders and knees at religious sites', importance: 'high' },
  { id: 'do-4', category: 'do', title: 'Say "Namaste"', description: 'Greet people with palms together and a slight bow', importance: 'medium' },
  { id: 'do-5', category: 'do', title: 'Ask for photo permission', description: 'Always ask before photographing people or religious ceremonies', importance: 'high' },
  { id: 'do-6', category: 'do', title: 'Walk clockwise', description: 'Walk clockwise around stupas and religious monuments', importance: 'medium' },
  
  // Don'ts
  { id: 'dont-1', category: 'dont', title: 'Touch heads', description: 'Never touch someone\'s head, considered sacred in Nepal', importance: 'high' },
  { id: 'dont-2', category: 'dont', title: 'Point feet', description: 'Avoid pointing your feet at people or religious objects', importance: 'high' },
  { id: 'dont-3', category: 'dont', title: 'Public affection', description: 'Avoid public displays of affection', importance: 'medium' },
  { id: 'dont-4', category: 'dont', title: 'Leather in temples', description: 'Don\'t wear leather items in Hindu temples', importance: 'medium' },
  { id: 'dont-5', category: 'dont', title: 'Step over offerings', description: 'Never step over food offerings or religious items', importance: 'high' },
  { id: 'dont-6', category: 'dont', title: 'Beef consumption', description: 'Avoid eating beef in Hindu areas; cows are sacred', importance: 'high' }
];

// Utility functions
export const calculateOverallScore = (score: Omit<SafetyScore, 'overallScore' | 'level' | 'badges' | 'userId'>): number => {
  const weights = {
    culturalAwareness: 0.3,
    quizCompletion: 0.2,
    safetyReadiness: 0.25,
    environmentalRespect: 0.25
  };
  
  return Math.round(
    score.culturalAwareness * weights.culturalAwareness +
    score.quizCompletion * weights.quizCompletion +
    score.safetyReadiness * weights.safetyReadiness +
    score.environmentalRespect * weights.environmentalRespect
  );
};

export const getScoreLevel = (score: number): SafetyScore['level'] => {
  if (score >= 90) return 'ambassador';
  if (score >= 70) return 'responsible';
  if (score >= 40) return 'aware';
  return 'beginner';
};

export const getScoreLevelColor = (level: SafetyScore['level']): string => {
  switch (level) {
    case 'ambassador': return 'text-secondary';
    case 'responsible': return 'text-success';
    case 'aware': return 'text-primary';
    case 'beginner': return 'text-muted-foreground';
  }
};

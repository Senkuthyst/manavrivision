// Community Data Types and Mock Data - API-ready structure

export interface CommunityPost {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    isCulturallyVerified: boolean;
    completedQuizzes: string[];
    totalPosts: number;
  };
  destination: string;
  destinationId: string;
  tags: ('culture' | 'food' | 'rituals' | 'landscapes' | 'safety-tips' | 'festivals' | 'wildlife')[];
  media: {
    type: 'image' | 'video' | 'text';
    url: string;
    thumbnail?: string;
  };
  caption: string;
  reflection?: string; // "What I learned" reflection
  likes: number;
  comments: Comment[];
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: Date;
  hasLearnedBeforePosting: boolean;
  isReported: boolean;
  isHidden: boolean;
}

export interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    isCulturallyVerified: boolean;
  };
  content: string;
  likes: number;
  createdAt: Date;
  isLiked: boolean;
}

export interface CommunityFilter {
  destination: string | 'all';
  tags: string[];
  sortBy: 'recent' | 'popular' | 'discussed';
}

export const destinationFilters = [
  { id: 'all', name: 'Global Feed', icon: '🌍' },
  { id: 'kathmandu', name: 'Kathmandu', icon: '🏛️' },
  { id: 'pokhara', name: 'Pokhara', icon: '🏔️' },
  { id: 'lumbini', name: 'Lumbini', icon: '☸️' },
  { id: 'chitwan', name: 'Chitwan', icon: '🐘' },
  { id: 'bhaktapur', name: 'Bhaktapur', icon: '🏺' },
  { id: 'patan', name: 'Patan', icon: '🎨' },
  { id: 'bandipur', name: 'Bandipur', icon: '🌄' },
  { id: 'annapurna', name: 'Annapurna', icon: '⛰️' },
];

export const tagFilters = [
  { id: 'culture', name: 'Culture', color: 'bg-purple-500/20 text-purple-700 dark:text-purple-300' },
  { id: 'food', name: 'Food', color: 'bg-orange-500/20 text-orange-700 dark:text-orange-300' },
  { id: 'rituals', name: 'Rituals', color: 'bg-rose-500/20 text-rose-700 dark:text-rose-300' },
  { id: 'landscapes', name: 'Landscapes', color: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' },
  { id: 'safety-tips', name: 'Safety Tips', color: 'bg-blue-500/20 text-blue-700 dark:text-blue-300' },
  { id: 'festivals', name: 'Festivals', color: 'bg-amber-500/20 text-amber-700 dark:text-amber-300' },
  { id: 'wildlife', name: 'Wildlife', color: 'bg-green-500/20 text-green-700 dark:text-green-300' },
];

// Mock community posts with rich data
export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    author: {
      id: 'user-1',
      name: 'Sarah Mitchell',
      avatar: 'SM',
      isCulturallyVerified: true,
      completedQuizzes: ['kathmandu', 'annapurna', 'pokhara'],
      totalPosts: 23,
    },
    destination: 'Poon Hill',
    destinationId: 'annapurna',
    tags: ['landscapes', 'culture'],
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
    },
    caption: 'Sunrise at Poon Hill - woke up at 4am and it was absolutely worth it! The view of Annapurna South and Machapuchare is unforgettable. The locals call it "Fishtail Mountain" because of its distinctive shape. 🏔️',
    reflection: 'I learned that Machapuchare is considered sacred and climbing to its summit is prohibited. Respecting local beliefs is essential!',
    likes: 234,
    comments: [
      {
        id: 'c1',
        author: { id: 'u2', name: 'Raj Sharma', avatar: 'RS', isCulturallyVerified: true },
        content: 'The colors at that hour are magical! Did you stay at Ghorepani?',
        likes: 12,
        createdAt: new Date('2024-01-15T08:30:00'),
        isLiked: false,
      },
      {
        id: 'c2',
        author: { id: 'u3', name: 'Emma Chen', avatar: 'EC', isCulturallyVerified: false },
        content: 'Adding this to my bucket list! 😍',
        likes: 5,
        createdAt: new Date('2024-01-15T09:15:00'),
        isLiked: true,
      },
    ],
    shares: 45,
    isLiked: false,
    isSaved: false,
    createdAt: new Date('2024-01-15T06:00:00'),
    hasLearnedBeforePosting: true,
    isReported: false,
    isHidden: false,
  },
  {
    id: 'post-2',
    author: {
      id: 'user-2',
      name: 'Raj Sharma',
      avatar: 'RS',
      isCulturallyVerified: true,
      completedQuizzes: ['bhaktapur', 'kathmandu', 'patan'],
      totalPosts: 47,
    },
    destination: 'Bhaktapur Durbar Square',
    destinationId: 'bhaktapur',
    tags: ['culture', 'rituals'],
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&q=80',
    },
    caption: 'Found this hidden pottery workshop in Bhaktapur. The artisan has been making traditional clay pots for 40 years! The Juju Dhau (King Curd) containers are still made the same way as centuries ago. 🏺',
    reflection: 'Traditional pottery in Bhaktapur uses local clay and ancient techniques passed down through generations. Supporting these artisans preserves Newari heritage.',
    likes: 189,
    comments: [
      {
        id: 'c3',
        author: { id: 'u4', name: 'Maya Gurung', avatar: 'MG', isCulturallyVerified: true },
        content: 'The craftsmanship is incredible! Did you try the Juju Dhau?',
        likes: 18,
        createdAt: new Date('2024-01-14T14:20:00'),
        isLiked: true,
      },
    ],
    shares: 32,
    isLiked: true,
    isSaved: true,
    createdAt: new Date('2024-01-14T12:00:00'),
    hasLearnedBeforePosting: true,
    isReported: false,
    isHidden: false,
  },
  {
    id: 'post-3',
    author: {
      id: 'user-3',
      name: 'Emma Chen',
      avatar: 'EC',
      isCulturallyVerified: false,
      completedQuizzes: ['kathmandu'],
      totalPosts: 8,
    },
    destination: 'Thamel, Kathmandu',
    destinationId: 'kathmandu',
    tags: ['food', 'culture'],
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1582654291742-cf06c8b3e08a?w=800&q=80',
    },
    caption: 'Best momos in Kathmandu! This little place in Thamel serves the most authentic buffalo momos. Ask for extra chutney! The spicy tomato-based achar is life-changing 🥟',
    likes: 312,
    comments: [
      {
        id: 'c4',
        author: { id: 'u5', name: 'John Walker', avatar: 'JW', isCulturallyVerified: true },
        content: 'Try the jhol momo version next time - the soup base is incredible!',
        likes: 24,
        createdAt: new Date('2024-01-13T19:45:00'),
        isLiked: false,
      },
      {
        id: 'c5',
        author: { id: 'u1', name: 'Sarah Mitchell', avatar: 'SM', isCulturallyVerified: true },
        content: 'Which restaurant is this? I need to try it!',
        likes: 8,
        createdAt: new Date('2024-01-13T20:10:00'),
        isLiked: false,
      },
      {
        id: 'c6',
        author: { id: 'u3', name: 'Emma Chen', avatar: 'EC', isCulturallyVerified: false },
        content: "@Sarah It's called 'Momo Star' - small shop near Thamel Chowk!",
        likes: 15,
        createdAt: new Date('2024-01-13T20:25:00'),
        isLiked: true,
      },
    ],
    shares: 67,
    isLiked: false,
    isSaved: false,
    createdAt: new Date('2024-01-13T18:30:00'),
    hasLearnedBeforePosting: false,
    isReported: false,
    isHidden: false,
  },
  {
    id: 'post-4',
    author: {
      id: 'user-4',
      name: 'Maya Gurung',
      avatar: 'MG',
      isCulturallyVerified: true,
      completedQuizzes: ['lumbini', 'kathmandu', 'pokhara', 'chitwan'],
      totalPosts: 35,
    },
    destination: 'Lumbini',
    destinationId: 'lumbini',
    tags: ['rituals', 'culture'],
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
    },
    caption: 'A moment of peace at the birthplace of Buddha. The eternal flame has been burning since 1986, symbolizing the light of Buddhism spreading across the world. Visitors from every Buddhist nation have built monasteries here. ☸️',
    reflection: 'Lumbini is one of the four main Buddhist pilgrimage sites. Dress modestly, maintain silence near temples, and remove shoes before entering sacred spaces.',
    likes: 456,
    comments: [
      {
        id: 'c7',
        author: { id: 'u6', name: 'Priya Thapa', avatar: 'PT', isCulturallyVerified: true },
        content: 'The serenity here is unmatched. Best visited during early morning for meditation.',
        likes: 34,
        createdAt: new Date('2024-01-12T07:30:00'),
        isLiked: true,
      },
    ],
    shares: 89,
    isLiked: true,
    isSaved: true,
    createdAt: new Date('2024-01-12T06:00:00'),
    hasLearnedBeforePosting: true,
    isReported: false,
    isHidden: false,
  },
  {
    id: 'post-5',
    author: {
      id: 'user-5',
      name: 'John Walker',
      avatar: 'JW',
      isCulturallyVerified: true,
      completedQuizzes: ['chitwan', 'pokhara'],
      totalPosts: 38,
    },
    destination: 'Chitwan National Park',
    destinationId: 'chitwan',
    tags: ['wildlife', 'landscapes'],
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
    },
    caption: 'Spotted this one-horned rhino during our morning safari! Chitwan is home to over 600 rhinos - a conservation success story. The park guards work tirelessly to protect these magnificent creatures from poachers. 🦏',
    reflection: 'Conservation efforts in Chitwan have brought rhinos back from near extinction. Always maintain safe distances and never disturb wildlife.',
    likes: 523,
    comments: [
      {
        id: 'c8',
        author: { id: 'u2', name: 'Raj Sharma', avatar: 'RS', isCulturallyVerified: true },
        content: 'Amazing shot! The Tharu community has been instrumental in conservation here.',
        likes: 28,
        createdAt: new Date('2024-01-11T11:00:00'),
        isLiked: false,
      },
    ],
    shares: 76,
    isLiked: false,
    isSaved: false,
    createdAt: new Date('2024-01-11T08:00:00'),
    hasLearnedBeforePosting: true,
    isReported: false,
    isHidden: false,
  },
  {
    id: 'post-6',
    author: {
      id: 'user-6',
      name: 'Priya Thapa',
      avatar: 'PT',
      isCulturallyVerified: true,
      completedQuizzes: ['kathmandu', 'patan', 'bhaktapur', 'pokhara', 'lumbini'],
      totalPosts: 52,
    },
    destination: 'Phewa Lake, Pokhara',
    destinationId: 'pokhara',
    tags: ['landscapes', 'culture'],
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1565620325948-f15c215ab55c?w=800&q=80',
    },
    caption: 'Sunset colors painting Phewa Lake while Machhapuchhre stands guard. The Tal Barahi Temple on the island is sacred to locals - took a boat ride to offer prayers. This view never gets old! 🌅',
    reflection: 'Barahi Temple is dedicated to the goddess Ajima. When visiting, dress respectfully and participate in aarti (evening prayer) if invited.',
    likes: 678,
    comments: [
      {
        id: 'c9',
        author: { id: 'u1', name: 'Sarah Mitchell', avatar: 'SM', isCulturallyVerified: true },
        content: 'The reflection of the mountains in the lake is breathtaking!',
        likes: 41,
        createdAt: new Date('2024-01-10T18:30:00'),
        isLiked: true,
      },
      {
        id: 'c10',
        author: { id: 'u4', name: 'Maya Gurung', avatar: 'MG', isCulturallyVerified: true },
        content: 'Pro tip: Go early morning for the clearest reflections!',
        likes: 29,
        createdAt: new Date('2024-01-10T19:00:00'),
        isLiked: false,
      },
    ],
    shares: 112,
    isLiked: true,
    isSaved: false,
    createdAt: new Date('2024-01-10T17:00:00'),
    hasLearnedBeforePosting: true,
    isReported: false,
    isHidden: false,
  },
];

export const hiddenGems = [
  { id: 'gem-1', name: 'Rara Lake', location: 'Mugu District', rating: 4.9, votes: 128, icon: '💎' },
  { id: 'gem-2', name: 'Tilicho Lake', location: 'Manang District', rating: 4.8, votes: 95, icon: '🏔️' },
  { id: 'gem-3', name: 'Gokyo Lakes', location: 'Solukhumbu', rating: 4.9, votes: 156, icon: '❄️' },
  { id: 'gem-4', name: 'Siddha Cave', location: 'Bandipur', rating: 4.7, votes: 67, icon: '🦇' },
  { id: 'gem-5', name: 'Khaptad National Park', location: 'Far-Western Nepal', rating: 4.6, votes: 43, icon: '🌿' },
];

export const topContributors = [
  { id: 'tc-1', name: 'Priya Thapa', posts: 52, avatar: 'PT', badge: 'Cultural Ambassador', isCulturallyVerified: true },
  { id: 'tc-2', name: 'Raj Sharma', posts: 47, avatar: 'RS', badge: 'Heritage Guardian', isCulturallyVerified: true },
  { id: 'tc-3', name: 'John Walker', posts: 38, avatar: 'JW', badge: 'Wildlife Advocate', isCulturallyVerified: true },
  { id: 'tc-4', name: 'Maya Gurung', posts: 35, avatar: 'MG', badge: 'Local Expert', isCulturallyVerified: true },
  { id: 'tc-5', name: 'Sarah Mitchell', posts: 23, avatar: 'SM', badge: 'Rising Explorer', isCulturallyVerified: true },
];

// Cultural respect prompts shown before posting
export const culturalRespectPrompts = [
  "Before sharing, please ensure your content respects local traditions and customs.",
  "Remember: Your post will be seen by travelers worldwide. Does it represent Nepal positively?",
  "Have you learned about the cultural significance of this place before posting?",
  "Great travelers leave only footprints and take only memories. Is your content responsible?",
  "Sharing is caring — but please ensure you had permission to photograph people and sacred sites.",
];

// Moderation keywords for basic content filtering
export const moderationKeywords = [
  'offensive', 'disrespectful', 'inappropriate', 
];

export const getRandomRespectPrompt = (): string => {
  return culturalRespectPrompts[Math.floor(Math.random() * culturalRespectPrompts.length)];
};

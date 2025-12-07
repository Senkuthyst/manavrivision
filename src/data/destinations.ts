import kathmanduImg from "@/assets/kathmandu.jpg";
import pokharaImg from "@/assets/pokhara.jpg";
import lumbiniImg from "@/assets/lumbini.jpg";
import chitwanImg from "@/assets/chitwan.jpg";
import swayambhuImg from "@/assets/swayambhu.jpg";
import bhaktapurImg from "@/assets/bhaktapur.jpg";
import patanImg from "@/assets/patan.jpg";
import bandipurImg from "@/assets/bandipur.jpg";
import annapurnaImg from "@/assets/annapurna.jpg";

export interface Destination {
  id: string;
  name: string;
  region: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  culturalInsights: string[];
  travelTips: string[];
  bestTimeToVisit: string;
  altitude: string;
  category: "heritage" | "nature" | "adventure" | "spiritual";
  languages: { phrase: string; meaning: string; pronunciation: string }[];
  quickFacts: { label: string; value: string }[];
}

export const destinations: Destination[] = [
  {
    id: "kathmandu",
    name: "Kathmandu",
    region: "Kathmandu Valley",
    image: kathmanduImg,
    shortDescription: "The vibrant capital city where ancient temples meet modern life",
    fullDescription: "Kathmandu, the capital of Nepal, is a mesmerizing blend of ancient history and modern chaos. The city is home to seven UNESCO World Heritage Sites, including the famous Kathmandu Durbar Square, Pashupatinath Temple, and Boudhanath Stupa. Walking through its narrow streets feels like stepping back in time, with intricately carved wooden windows, ancient temples, and the constant aroma of incense filling the air.",
    highlights: [
      "Kathmandu Durbar Square - Ancient royal palace complex",
      "Pashupatinath Temple - Sacred Hindu pilgrimage site",
      "Boudhanath Stupa - One of the largest spherical stupas in Nepal",
      "Thamel District - Vibrant tourist and cultural hub",
      "Garden of Dreams - A neo-classical historical garden"
    ],
    culturalInsights: [
      "The Newari people are the indigenous inhabitants with rich traditions",
      "Indra Jatra festival features the living goddess Kumari",
      "Traditional Newari cuisine includes dishes like momos and bara",
      "The city has over 2,700 temples and shrines"
    ],
    travelTips: [
      "Wear comfortable walking shoes for exploring narrow streets",
      "Respect temple etiquette - remove shoes and dress modestly",
      "Bargaining is expected in local markets",
      "Best explored on foot due to traffic congestion"
    ],
    bestTimeToVisit: "October to December",
    altitude: "1,400m",
    category: "heritage",
    languages: [
      { phrase: "Namaste", meaning: "Hello/Greetings", pronunciation: "nah-mah-stay" },
      { phrase: "Dhanyabad", meaning: "Thank you", pronunciation: "dhan-ya-baad" },
      { phrase: "Kasto cha?", meaning: "How are you?", pronunciation: "kahs-toh chah" }
    ],
    quickFacts: [
      { label: "Population", value: "1.5 Million" },
      { label: "Language", value: "Nepali" },
      { label: "UNESCO Sites", value: "7" },
      { label: "Founded", value: "723 AD" }
    ]
  },
  {
    id: "pokhara",
    name: "Pokhara",
    region: "Gandaki Province",
    image: pokharaImg,
    shortDescription: "The serene lakeside city with stunning Himalayan views",
    fullDescription: "Pokhara is Nepal's adventure capital and a gateway to the Annapurna Circuit. Nestled beside the tranquil Phewa Lake, the city offers breathtaking views of the Annapurna and Machapuchare (Fishtail) mountains. From paragliding over the lake to peaceful boat rides at sunset, Pokhara combines natural beauty with adventure sports in perfect harmony.",
    highlights: [
      "Phewa Lake - Serene lake with mountain reflections",
      "Sarangkot - Best sunrise viewpoint over Himalayas",
      "Davis Falls - Unique waterfall that disappears underground",
      "World Peace Pagoda - Buddhist stupa with panoramic views",
      "Begnas and Rupa Lakes - Quieter alternatives to Phewa"
    ],
    culturalInsights: [
      "Home to the Gurung and Magar ethnic communities",
      "Gateway to the Annapurna trekking region",
      "Rich tradition of Tibetan Buddhism with refugee settlements",
      "Local handicrafts include handmade paper and Tibetan jewelry"
    ],
    travelTips: [
      "Book paragliding in advance during peak season",
      "Rent a bicycle to explore Lakeside area",
      "Early morning boat rides offer best mountain views",
      "Visit the International Mountain Museum"
    ],
    bestTimeToVisit: "September to November",
    altitude: "827m",
    category: "nature",
    languages: [
      { phrase: "Tato pani", meaning: "Hot water", pronunciation: "tah-toh pah-nee" },
      { phrase: "Mitho cha", meaning: "It's delicious", pronunciation: "mee-tho chah" },
      { phrase: "Kati ho?", meaning: "How much?", pronunciation: "kah-tee hoh" }
    ],
    quickFacts: [
      { label: "Elevation", value: "827m" },
      { label: "Lakes", value: "9" },
      { label: "Climate", value: "Subtropical" },
      { label: "Best For", value: "Adventure" }
    ]
  },
  {
    id: "lumbini",
    name: "Lumbini",
    region: "Province 5",
    image: lumbiniImg,
    shortDescription: "The sacred birthplace of Lord Buddha",
    fullDescription: "Lumbini is one of the most important pilgrimage sites for Buddhists worldwide, recognized as the birthplace of Siddhartha Gautama, who later became the Buddha. The sacred garden contains the Maya Devi Temple, the Ashoka Pillar, and numerous monasteries built by Buddhist communities from around the world, each reflecting their unique architectural traditions.",
    highlights: [
      "Maya Devi Temple - Exact birthplace of Buddha",
      "Ashoka Pillar - Ancient marker from 249 BCE",
      "Sacred Garden - UNESCO World Heritage Site",
      "Monastic Zone - International Buddhist monasteries",
      "Eternal Peace Flame - Symbol of world peace"
    ],
    culturalInsights: [
      "Buddha was born here in 623 BCE as Prince Siddhartha",
      "Emperor Ashoka visited and erected a commemorative pillar",
      "The site was rediscovered in 1896 by archaeologist Alexander Cunningham",
      "Over 25 countries have built monasteries in their national style"
    ],
    travelTips: [
      "Hire a bicycle or rickshaw to explore the vast complex",
      "Dress modestly and remove shoes at sacred sites",
      "Best visited during Buddha Jayanti (May)",
      "Allow full day to explore all monasteries"
    ],
    bestTimeToVisit: "October to March",
    altitude: "150m",
    category: "spiritual",
    languages: [
      { phrase: "Om mani padme hum", meaning: "Buddhist mantra", pronunciation: "ohm mah-nee pahd-meh hoom" },
      { phrase: "Shanti", meaning: "Peace", pronunciation: "shahn-tee" },
      { phrase: "Swagat", meaning: "Welcome", pronunciation: "swah-gaht" }
    ],
    quickFacts: [
      { label: "UNESCO Status", value: "Since 1997" },
      { label: "Area", value: "5 sq km" },
      { label: "Monasteries", value: "25+" },
      { label: "Significance", value: "Buddha's Birthplace" }
    ]
  },
  {
    id: "chitwan",
    name: "Chitwan",
    region: "Province 3",
    image: chitwanImg,
    shortDescription: "Nepal's premier wildlife sanctuary and jungle experience",
    fullDescription: "Chitwan National Park is Nepal's first national park and a UNESCO World Heritage Site. This subtropical paradise is home to the endangered one-horned rhinoceros, Bengal tigers, gharial crocodiles, and over 500 species of birds. Visitors can experience jungle safaris, canoe rides through crocodile habitats, and traditional Tharu cultural performances.",
    highlights: [
      "One-horned Rhinoceros - Over 600 in the park",
      "Bengal Tigers - Elusive big cats in their natural habitat",
      "Elephant Safari - Traditional way to explore jungle",
      "Tharu Culture - Indigenous community performances",
      "Rapti River - Canoe trips spotting crocodiles"
    ],
    culturalInsights: [
      "Tharu people are the indigenous inhabitants with animist traditions",
      "Traditional Tharu stick dance tells stories of hunting",
      "Local cuisine features freshwater fish and river snails",
      "Tharu houses are built with clay and elephant grass"
    ],
    travelTips: [
      "Book safaris through licensed operators",
      "Wear neutral colors for wildlife viewing",
      "Early morning and late afternoon are best for animal sightings",
      "Carry insect repellent for jungle walks"
    ],
    bestTimeToVisit: "October to March",
    altitude: "150m",
    category: "nature",
    languages: [
      { phrase: "Jungle", meaning: "Forest", pronunciation: "jung-gul" },
      { phrase: "Gaida", meaning: "Rhinoceros", pronunciation: "gai-dah" },
      { phrase: "Hatti", meaning: "Elephant", pronunciation: "hah-tee" }
    ],
    quickFacts: [
      { label: "Area", value: "952.63 sq km" },
      { label: "Rhino Population", value: "600+" },
      { label: "Bird Species", value: "500+" },
      { label: "UNESCO Status", value: "Since 1984" }
    ]
  },
  {
    id: "swayambhu",
    name: "Swayambhunath",
    region: "Kathmandu",
    image: swayambhuImg,
    shortDescription: "The iconic Monkey Temple overlooking Kathmandu Valley",
    fullDescription: "Swayambhunath, affectionately known as the 'Monkey Temple,' is one of the oldest religious sites in Nepal. Perched atop a hill overlooking Kathmandu Valley, the ancient stupa is adorned with Buddha's watchful eyes looking out in all four directions. The site is sacred to both Buddhists and Hindus and offers panoramic views of the entire valley.",
    highlights: [
      "Main Stupa - Ancient Buddhist monument with all-seeing eyes",
      "365 Steps - Steep climb to the summit",
      "Prayer Wheels - Spin them clockwise for blessings",
      "Harati Temple - Hindu goddess of smallpox",
      "Panoramic Views - 360-degree valley views"
    ],
    culturalInsights: [
      "Legend says the stupa is over 2,000 years old",
      "The eyes on the stupa represent Buddha's all-seeing wisdom",
      "Monkeys are considered sacred protectors of the site",
      "Both Buddhist and Hindu deities are worshipped here"
    ],
    travelTips: [
      "Visit early morning for best views and fewer crowds",
      "Watch out for monkeys taking food and belongings",
      "Climb the steps for the authentic experience",
      "Sunset visits offer beautiful lighting for photography"
    ],
    bestTimeToVisit: "Year-round",
    altitude: "1,400m",
    category: "spiritual",
    languages: [
      { phrase: "Stupa", meaning: "Buddhist dome shrine", pronunciation: "stoo-pah" },
      { phrase: "Dharma", meaning: "Buddhist teachings", pronunciation: "dhar-mah" },
      { phrase: "Puja", meaning: "Worship ritual", pronunciation: "poo-jah" }
    ],
    quickFacts: [
      { label: "Age", value: "2,000+ years" },
      { label: "Steps", value: "365" },
      { label: "Height", value: "77m above valley" },
      { label: "Also Called", value: "Monkey Temple" }
    ]
  },
  {
    id: "bhaktapur",
    name: "Bhaktapur",
    region: "Kathmandu Valley",
    image: bhaktapurImg,
    shortDescription: "The living museum of medieval Newari art and architecture",
    fullDescription: "Bhaktapur, meaning 'City of Devotees,' is the best-preserved medieval city in Nepal. This ancient Newari town transports visitors back to the 15th century with its stunning red-brick temples, intricate wood carvings, and cobblestone streets. Famous for its pottery square, traditional mask dances, and the iconic Nyatapola Temple, Bhaktapur is a photographer's paradise.",
    highlights: [
      "Bhaktapur Durbar Square - UNESCO World Heritage palace complex",
      "Nyatapola Temple - Five-story pagoda, tallest in Nepal",
      "Pottery Square - Traditional potters at work",
      "55 Window Palace - Architectural masterpiece",
      "Dattatreya Square - Ancient religious square"
    ],
    culturalInsights: [
      "City was once the capital of Nepal during Malla period",
      "Famous for Juju Dhau - king of yogurt",
      "Traditional Bhaktapur mask dances during festivals",
      "Newari architecture features unique carved windows"
    ],
    travelTips: [
      "Entry ticket valid for one week",
      "Try the famous Juju Dhau (king curd)",
      "Best explored on foot",
      "Watch potters at Pottery Square"
    ],
    bestTimeToVisit: "October to April",
    altitude: "1,400m",
    category: "heritage",
    languages: [
      { phrase: "Juju Dhau", meaning: "King of Yogurt", pronunciation: "joo-joo dow" },
      { phrase: "Newari", meaning: "Indigenous Newar language", pronunciation: "neh-wah-ree" },
      { phrase: "Paubha", meaning: "Traditional scroll painting", pronunciation: "pow-bah" }
    ],
    quickFacts: [
      { label: "Founded", value: "12th Century" },
      { label: "Area", value: "7 sq km" },
      { label: "Famous For", value: "Pottery & Crafts" },
      { label: "UNESCO Status", value: "Since 1979" }
    ]
  },
  {
    id: "patan",
    name: "Patan",
    region: "Kathmandu Valley",
    image: patanImg,
    shortDescription: "The city of fine arts and ancient Buddhist heritage",
    fullDescription: "Patan, also known as Lalitpur ('City of Beauty'), is renowned for its rich cultural heritage and artistic traditions. The city's Durbar Square is a masterpiece of Newari architecture, featuring the famous Krishna Mandir and the ancient royal palace. Patan is the center of traditional metalwork, woodcarving, and thangka painting in Nepal.",
    highlights: [
      "Patan Durbar Square - UNESCO listed palace complex",
      "Krishna Mandir - Stone temple with Mahabharata carvings",
      "Golden Temple - Buddhist monastery with golden facade",
      "Patan Museum - Best museum in Nepal",
      "Mahaboudha Temple - Temple of 1,000 Buddhas"
    ],
    culturalInsights: [
      "Known as the city of artists and craftsmen",
      "Traditional metalwork includes lost-wax casting",
      "Home to many Buddhist bahals (courtyards)",
      "Rato Machhendranath festival draws thousands"
    ],
    travelTips: [
      "Visit Patan Museum for excellent Newari art collection",
      "Watch artisans at work in traditional workshops",
      "Combine with Kathmandu as they are nearby",
      "Explore the hidden Buddhist courtyards"
    ],
    bestTimeToVisit: "October to April",
    altitude: "1,400m",
    category: "heritage",
    languages: [
      { phrase: "Lalitpur", meaning: "City of Beauty", pronunciation: "lah-lit-poor" },
      { phrase: "Bahal", meaning: "Buddhist courtyard monastery", pronunciation: "bah-hahl" },
      { phrase: "Thanka", meaning: "Buddhist scroll painting", pronunciation: "tahn-kah" }
    ],
    quickFacts: [
      { label: "Also Known As", value: "Lalitpur" },
      { label: "Founded", value: "299 AD" },
      { label: "Famous For", value: "Metalwork" },
      { label: "UNESCO Status", value: "Since 1979" }
    ]
  },
  {
    id: "bandipur",
    name: "Bandipur",
    region: "Tanahun District",
    image: bandipurImg,
    shortDescription: "A hidden gem hilltop village frozen in time",
    fullDescription: "Bandipur is a beautifully preserved Newari trading town perched on a ridge between Kathmandu and Pokhara. This hidden gem offers stunning Himalayan panoramas, traditional architecture, and a peaceful escape from the busy tourist trail. The car-free bazaar, ancient temples, and charming guesthouses make it a perfect stopover.",
    highlights: [
      "Tundikhel - Open ground with 180° Himalayan views",
      "Siddha Gufa - One of Nepal's largest caves",
      "Newari Bazaar - Historic car-free market street",
      "Thani Mai Temple - Sacred hilltop shrine",
      "Sunset Views - Spectacular mountain panoramas"
    ],
    culturalInsights: [
      "Former trading hub on the India-Tibet route",
      "Well-preserved 18th-century Newari architecture",
      "Local Newari community maintains traditional lifestyle",
      "Night sky here is perfect for stargazing"
    ],
    travelTips: [
      "Stay overnight to experience the peaceful atmosphere",
      "Perfect stopover between Kathmandu and Pokhara",
      "Bring warm clothes for cool evenings",
      "Explore the cave with a local guide"
    ],
    bestTimeToVisit: "October to May",
    altitude: "1,030m",
    category: "heritage",
    languages: [
      { phrase: "Ramro cha", meaning: "It's beautiful", pronunciation: "rahm-roh chah" },
      { phrase: "Gufa", meaning: "Cave", pronunciation: "goo-fah" },
      { phrase: "Pahad", meaning: "Mountain/Hill", pronunciation: "pah-hahd" }
    ],
    quickFacts: [
      { label: "Distance from KTM", value: "143 km" },
      { label: "Best Feature", value: "Himalayan Views" },
      { label: "Specialty", value: "Organic Coffee" },
      { label: "Type", value: "Heritage Village" }
    ]
  },
  {
    id: "annapurna",
    name: "Annapurna Region",
    region: "Western Nepal",
    image: annapurnaImg,
    shortDescription: "The legendary trekking paradise of the Himalayas",
    fullDescription: "The Annapurna region is home to some of the world's most spectacular trekking routes. From the popular Annapurna Base Camp trek to the challenging Annapurna Circuit, this region offers diverse landscapes from subtropical forests to high-altitude glaciers. The area encompasses several peaks above 7,000m and provides incredible views of the Annapurna massif and Machapuchare.",
    highlights: [
      "Annapurna Base Camp - Iconic trek to 4,130m",
      "Annapurna Circuit - Classic 2-3 week trek",
      "Poon Hill - Famous sunrise viewpoint",
      "Thorong La Pass - Highest point at 5,416m",
      "Machapuchare - Sacred 'Fishtail' peak"
    ],
    culturalInsights: [
      "Home to Gurung and Thakali ethnic communities",
      "Traditional teahouses offer authentic hospitality",
      "Mustang region has unique Tibetan Buddhist culture",
      "Thakali cuisine is renowned throughout Nepal"
    ],
    travelTips: [
      "Obtain ACAP permit and TIMS card before trekking",
      "Acclimatize properly to avoid altitude sickness",
      "Best trekking seasons are spring and autumn",
      "Hire licensed guides for safety"
    ],
    bestTimeToVisit: "March-May, September-November",
    altitude: "800m - 8,091m",
    category: "adventure",
    languages: [
      { phrase: "Bistari", meaning: "Slowly", pronunciation: "bis-tah-ree" },
      { phrase: "Thakpa", meaning: "Tibetan noodle soup", pronunciation: "tahk-pah" },
      { phrase: "Namaste didi/dai", meaning: "Hello sister/brother", pronunciation: "nah-mah-stay dee-dee/dai" }
    ],
    quickFacts: [
      { label: "Highest Peak", value: "8,091m" },
      { label: "ABC Trek", value: "10-14 days" },
      { label: "Circuit Trek", value: "15-21 days" },
      { label: "Permit", value: "ACAP + TIMS" }
    ]
  }
];

export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find(d => d.id === id);
};

export const getDestinationsByCategory = (category: Destination["category"]): Destination[] => {
  return destinations.filter(d => d.category === category);
};

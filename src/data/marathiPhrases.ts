export interface MarathiPhrase {
  english: string;
  marathi: string;
  phonetic: string;
  context: string;
}

export const MARATHI_PHRASES: MarathiPhrase[] = [
  {
    english: 'Hello / Greetings',
    marathi: 'नमस्कार',
    phonetic: 'Namaskar',
    context: 'Respectful universal greeting in Pune'
  },
  {
    english: 'How much does this cost?',
    marathi: 'याचे किती पैसे झाले?',
    phonetic: 'Yaache kiti paise zhaale?',
    context: 'Use when buying souvenirs or food'
  },
  {
    english: 'Will you go by meter?',
    marathi: 'मीटरने येणार का?',
    phonetic: 'Meter-ne yenaaar kaa?',
    context: 'Polite question for Pune auto-rickshaw drivers'
  },
  {
    english: 'Where is Shaniwar Wada?',
    marathi: 'शनिवार वाडा कुठे आहे?',
    phonetic: 'Shaniwar Wada kuthe aahe?',
    context: 'Asking for directions on the road'
  },
  {
    english: 'Make it a little less spicy, please.',
    marathi: 'कृपया थोडे कमी तिखट करा.',
    phonetic: 'Krupaya thode kami tikhat karaa.',
    context: 'Lifesaver when ordering Puneri misal or street chaat'
  },
  {
    english: 'This food is delicious!',
    marathi: 'जेवण खूप छान आहे!',
    phonetic: 'Jevan khoop chhaan aahe!',
    context: 'Complimenting a local cook or cafe owner'
  },
  {
    english: 'Thank you very much!',
    marathi: 'खूप खूप धन्यवाद!',
    phonetic: 'Khoop khoop dhanyawaad!',
    context: 'Expressing gratitude to locals'
  },
  {
    english: 'Is the shop open now?',
    marathi: 'दुकान आता चालू आहे का?',
    phonetic: 'Dukaan aataa chaaloo aahe kaa?',
    context: 'Crucial during the 1:00 PM – 4:00 PM Puneri afternoon break'
  }
];

export const PUNE_ESSENTIAL_TIPS = [
  {
    title: 'The Legendary 1:00 PM – 4:00 PM "Puneri Siesta"',
    icon: 'Moon',
    tip: 'Traditional shops in the old Peths (Tulshibaug, Laxmi Road, Appa Balwant Chowk) strictly close from 1:00 PM to 4:00 PM for afternoon lunch and rest. Plan your museum visits or indoor heritage tours (Kelkar Museum, Aga Khan Palace) during this window!'
  },
  {
    title: 'Pune Metro (Purple & Aqua Lines)',
    icon: 'Train',
    tip: 'The modern Pune Metro is air-conditioned, fast, and connects Vanaz to Ramwadi and PCMC to Swargate/District Court interchange. It lets you avoid traffic jams between Deccan, Shivajinagar, and Pune Railway Station.'
  },
  {
    title: 'Auto Rickshaw Norms',
    icon: 'Navigation',
    tip: 'Pune autos run on calibrated electronic meters. The base tariff starts at ₹25 for the first 1.5 km. Ola and Uber Autos are also widely used with upfront pricing.'
  },
  {
    title: 'Supporting Local Artisans',
    icon: 'HeartHandshake',
    tip: 'When you purchase directly from Tambat Ali coppersmiths or handloom Paithani weavers, 100% of your money goes straight to preserving ancient Maharashtra craftsmanship.'
  }
];

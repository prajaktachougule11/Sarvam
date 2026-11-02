import { CuratedTrail } from '../types';

export const CURATED_TRAILS: CuratedTrail[] = [
  {
    id: 'peshwa-heritage-walk',
    title: 'The Peshwa Glory & Old Peths Heritage Walk',
    marathiTitle: 'पेशवेकालीन वारसा आणि पेठा भ्रमंती',
    tagline: 'Step back to the 18th-century Maratha Empire through secret wadas, historic temples, and copper craftsman quarters.',
    duration: 'Half Day (4 - 5 Hours)',
    budget: 'Budget (₹300 - ₹600 / person)',
    bestFor: 'History buffs, photographers, first-time visitors wanting the quintessential Pune soul',
    highlights: [
      'Shaniwar Wada 1732 Peshwa Fortification & spiked gates',
      'Lal Mahal where Shivaji Maharaj resided with Jijabai',
      'Kasba Ganpati (Gramdaivat consecrated in 1630s)',
      'Tambat Ali 350-year-old active coppersmith hammer alley',
      'Vishrambaug Wada teakwood facade and courtyard',
      'Original Bedekar Misal & Sujata Mastani treats'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    spotIds: ['shaniwar-wada', 'lal-mahal', 'kasba-ganpati', 'vishrambaug-wada'],
    recommendedBusinesses: ['tambat-ali-kasba', 'bedekar-misal-narayan', 'sujata-mastani-shaniwar', 'chitale-bandhu-laxmi-rd']
  },
  {
    id: 'puneri-food-pilgrimage',
    title: 'The Legendary Puneri Culinary Trail',
    marathiTitle: 'खवय्यांची अस्सल पुणेरी खाऊगल्ली यात्रा',
    tagline: 'From 1935 Irani bun maska to fiery misal, SPDP, Shrewsbury biscuits, and mango mastani.',
    duration: 'Full Day (Morning till Night)',
    budget: 'Moderate (₹800 - ₹1200 / person)',
    bestFor: 'Foodies, street food lovers, curious travelers with hungry appetites',
    highlights: [
      'Morning Khadak Bun Maska & Irani Chai at Cafe Goodluck',
      'Original Puneri Bread Misal with Solkadhi at Bedekar',
      'Iconic SPDP (Sev Potato Dahi Puri) & Mysore Dosa at Vaishali',
      'Thick Mango Mastani at Sujata',
      'Vacuum-packed fresh Bakarwadi at Chitale Bandhu',
      'Freshly baked Shrewsbury butter biscuits at Kayani Bakery'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    spotIds: ['cafe-goodluck', 'bedekar-tea-stall', 'fc-road-culture'],
    recommendedBusinesses: ['cafe-goodluck-deccan', 'bedekar-misal-narayan', 'vaishali-fc-road', 'sujata-mastani-shaniwar', 'kayani-bakery-camp', 'chitale-bandhu-laxmi-rd']
  },
  {
    id: 'sinhagad-nature-trail',
    title: 'Sinhagad Fort Fortress Trek & Khadakwasla Waters',
    marathiTitle: 'सिंहगड किल्ला ट्रेक आणि खडकवासला लेक',
    tagline: 'Breathe crisp Sahyadri mountain air, conquer Shivaji’s legendary lion fort, and relish village-made Pithla Bhakri.',
    duration: '6 - 7 Hours',
    budget: 'Budget friendly (₹400 - ₹800 / person)',
    bestFor: 'Trekkers, nature lovers, adventure couples, photography enthusiasts',
    highlights: [
      'Morning climb to 1,312m Sinhagad Fort summit',
      'Kalyan Darwaza and Tanaji Malusare Memorial',
      'Hot woodfire-cooked Pithla Bhakri, Thecha & Matka Dahi',
      'Khadakwasla Dam lakefront sunset with hot roasted corn (Bhutta)',
      'Scenic rolling Sahyadri mountain vistas'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1626014303757-6466336e4f3a?auto=format&fit=crop&w=800&q=80',
    spotIds: ['sinhagad-fort', 'khadakwasla-dam'],
    recommendedBusinesses: ['sinhagad-village-selfhelp', 'kattakir-misal-kothrud']
  },
  {
    id: 'camp-colonial-and-zen',
    title: 'Cantonment Heritage, Museums & Bohemian Koregaon Park',
    marathiTitle: 'कॅम्प, आगा खान पॅलेस आणि कोरेगाव पार्क',
    tagline: 'Experience the Victorian cantonment charm, Gandhi’s historic sanctuary, and tranquil tree-canopied lanes.',
    duration: 'Full Day',
    budget: 'Moderate to Premium (₹1000 - ₹2000 / person)',
    bestFor: 'Couples, international travelers, architecture and cafe lovers',
    highlights: [
      'Italianate arches and Gandhi memorials at Aga Khan Palace',
      'Stained-glass beauty at Shinde Chhatri in Wanowrie',
      'Kayani Bakery Shrewsbury biscuits in Camp',
      'Quiet meditative walks in bamboo groves of Osho Teerth Park',
      'Evening European dining and artisanal coffee at German Bakery KP'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    spotIds: ['aga-khan-palace', 'shinde-chhatri', 'camp-m-g-road', 'osho-teerth-park'],
    recommendedBusinesses: ['kayani-bakery-camp', 'german-bakery-kp']
  }
];

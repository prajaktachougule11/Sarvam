/**
 * Comprehensive Pune Knowledge Engine
 * Provides encyclopedic, culturally rich, hyper-accurate answers to any tourist question about Pune:
 * dates, dining, street eats, heritage, forts, shopping, metro, nightlife, customs, and Marathi etiquette.
 */

export interface KnowledgeMatch {
  keywords: string[];
  generateResponse: (query: string) => string;
}

export function searchPuneKnowledgeBase(query: string): string {
  const q = query.toLowerCase();

  // 1. ROMANTIC DATES / WESTERN VEG / CANDLELIGHT / CAFES
  if (
    q.includes('date') ||
    q.includes('romantic') ||
    q.includes('western') ||
    q.includes('candlelight') ||
    q.includes('italian') ||
    q.includes('continental') ||
    q.includes('cafe date') ||
    q.includes('anniversary') ||
    (q.includes('veg') && (q.includes('dinner') || q.includes('lunch') || q.includes('fine dining')))
  ) {
    return `🍷 **Romantic Date Spots in Pune with Western & Continental Veg Cuisine:**

If you are planning a memorable date with Western vegetarian culinary excellence and romantic ambiance, here are the top Pune recommendations:

### 1. 🌿 **Santé Spa Cuisine (Koregaon Park – Lane 1)**
* **Vibe:** Lush European garden bungalow, serene fairy lights, intimate wooden outdoor seating surrounded by bamboo and greenery.
* **Cuisine:** 100% Vegetarian & Vegan Mediterranean, Italian & European.
* **Must-Try Dishes:** Farm-fresh Almond Ricotta Pizza, Truffle Scented Wild Mushroom Risotto, Beetroot & Goat Cheese Ravioli, and Salted Caramel Vegan Mousse.
* **Why it's perfect for a date:** Quiet, sophisticated, health-conscious, and extremely romantic for long conversations.
* **Approx Cost:** ₹1,600 – ₹2,000 for two.

### 2. 🌃 **World of Veg (Shivajinagar – Ramsukh House, Ganeshkhind Rd)**
* **Vibe:** Stunning 7th-floor open rooftop overlooking Pune's twinkling city skyline with gentle evening breezes.
* **Cuisine:** 100% Pure Vegetarian Western, Italian & Continental.
* **Must-Try Dishes:** Gourmet Wood-Fired Thin Crust Pizza, Spinach & Corn Au Gratin, Penne Arrabbiata, and mocktails.
* **Why it's perfect for a date:** Scenic rooftop sunset views, candlelit tables, and 100% pure vegetarian assurance.
* **Approx Cost:** ₹1,400 – ₹1,800 for two.

### 3. 🥐 **Le Plaisir (Prabhat Road / Deccan)**
* **Vibe:** Chic, intimate Parisian bistro atmosphere with cozy warm lighting.
* **Cuisine:** High-end European Bistro (exceptional vegetarian gourmet selection).
* **Must-Try Dishes:** Four Cheese Gnocchi with butter sage, Roast Pepper & Sun-dried Tomato Sandwich, and their world-famous Hazelnut Macaron & Dark Chocolate Tart.
* **Approx Cost:** ₹1,200 – ₹1,600 for two.

### 4. 🍕 **Little Italy (Shivajinagar & Bund Garden)**
* **Vibe:** Traditional Italian villa ambiance with soft acoustic jazz.
* **Cuisine:** 100% Vegetarian authentic Italian since 1989.
* **Must-Try Dishes:** Sourdough Pizza Sicilia, Ravioli Croccanti, and Eggless Italian Tiramisu.
* **Approx Cost:** ₹1,600 – ₹2,000 for two.

### 5. 🍸 **Terttulia (Koregaon Park – Lane 5)**
* **Vibe:** Bohemian European terrace with a towering banyan tree, candle-lit tables, and great music.
* **Cuisine:** Euro-Mediterranean with fantastic veg tapas, artisanal flatbreads, and gourmet pastas.
* **Approx Cost:** ₹1,800 – ₹2,200 for two.

💡 **Pune Date Pro-Tip:** Book a table around **7:30 PM** in Koregaon Park, then finish your evening with a romantic walk along KP Lane 6 or a quiet midnight gelato at *Naturals* or *German Bakery*!`;
  }

  // 2. PUNERI MISAL & STREET FOOD
  if (
    q.includes('misal') ||
    q.includes('street food') ||
    q.includes('vada pav') ||
    q.includes('spdp') ||
    q.includes('chaat') ||
    q.includes('bhakri')
  ) {
    return `🍲 **The Ultimate Pune Street Food & Misal Guide:**

Pune's street food culture is an institution. Here is where you will find the real deal:

### 🌟 Iconic Misal Pav Joints:
* **Bedekar Tea Stall (Narayan Peth):** The gold standard of old Pune. Served Puneri-style with *bread slices* instead of pav, balanced with sweet jaggery notes and spicy tarri. Drink chilled Solkadhi to balance the spice!
* **KataKirr (Karve Road & Kothrud):** Known for fiery red tarri with customizable spice levels (*Kolhapuri Tikha*, *Medium*, *Light*). Order a katori of extra dahi and chilled buttermilk.
* **Shri Krishna Bhuvan (Tulshibaug):** Heritage misal known for thick pohe base, crispy sev, and unmistakable aroma.
* **Aaba Misal (Rasta Peth):** Traditional spicy rassa with boiled egg or purely veg options.

### 🥟 Famous Puneri Street Snacks:
* **SPDP (Sev Potato Dahi Puri) at Vaishali (FC Road):** Crispy puris stuffed with spiced potatoes, sweet chilled curd, and tangy tamarind chutney. Pune's most beloved evening snack!
* **Garden Vada Pav (Camp – JJ Garden):** King-sized hot batata vada with spicy green chutney and crispy chura.
* **Rohit Vada Pav (Karve Nagar / Sinhagad Rd):** Ultra-crispy batata vada served with roasted garlic chutney.
* **Sujata Mastani (Sadashiv Peth):** Thick fruit milkshake topped with rich ice cream scoops (try Alphonso Mango or Sitaphal!).
* **Durga Cold Coffee (Paud Road / MIT / Deccan):** Thick, frothy, chocolaty blended cold coffee for ₹40.

💡 **Timing Tip:** Most traditional Peth eateries shut between 1:00 PM and 4:00 PM. Morning misal is best between 8:00 AM and 11:30 AM!`;
  }

  // 3. 1 TO 4 PM AFTERNOON SIESTA & PUNERI CULTURE / PATYA
  if (
    q.includes('siesta') ||
    q.includes('1 to 4') ||
    q.includes('afternoon') ||
    q.includes('sleep') ||
    q.includes('patya') ||
    q.includes('puneri culture') ||
    q.includes('nap')
  ) {
    return `😴 **The Sacred "Puneri Siesta" (1:00 PM – 4:00 PM) Explained:**

### Why does Pune shut down in the afternoon?
For over 200 years since the Peshwa era, traditional Pune residents and merchants in the old Peths (Sadashiv, Narayan, Budhwar, Laxmi Road, Tulshibaug) take an afternoon break between **1:00 PM and 4:00 PM** for lunch, family time, and a quiet nap (*Wamkuki*).

* **What is closed:** Traditional retail shops, brass workshops in Tambat Ali, fabric shops on Laxmi Road, and heritage sweet shops.
* **What stays OPEN:** Shopping malls (Phoenix, Pavilion), corporate cafes, gardens (Pu La Deshpande), and major monuments like **Aga Khan Palace** and **Raja Dinkar Kelkar Museum**.

### 📝 What are "Puneri Patya"?
Puneri Patya are witty, sarcastic Marathi notice boards hung by Punekars outside homes and shops. Some famous examples:
* *"Do not ring the bell between 1:00 PM and 4:00 PM. Even God is resting."*
* *"If you don't know who you are looking for, don't ask us for directions."*
* *"Park here if you want your vehicle tires blessed with punctures."*

💡 **Tourists' Strategy:** Schedule outdoor sightseeing (Shaniwar Wada, Temples) for early morning (8–11:30 AM), visit air-conditioned museums or have a leisurely lunch between 1–4 PM, and hit the shopping bazaars after 4:30 PM!`;
  }

  // 4. HISTORICAL FORTS / TREKKING / SINHAGAD / NATURE
  if (
    q.includes('fort') ||
    q.includes('sinhagad') ||
    q.includes('trek') ||
    q.includes('tekdi') ||
    q.includes('hills') ||
    q.includes('nature') ||
    q.includes('monsoon') ||
    q.includes('khadakwasla')
  ) {
    return `🏰 **Pune Forts, Tekdis & Trekking Guide:**

Pune is cradled by the rugged Western Ghats (Sahyadris), steeped in the military genius of Chhatrapati Shivaji Maharaj.

### 🦁 1. Sinhagad Fort (Lion Fort – 30 km from Pune)
* **History:** Site of the legendary 1670 battle where Tanaji Malusare scaled steep cliffs with a monitor lizard (Ghorpad) and recaptured the fort.
* **What to Eat:** Village women cook piping-hot **Pithla Bhakri**, spicy **Thecha**, and fresh **Matka Dahi** (thick earthen curd) right on the summit over wood-fired chulhas!
* **Best Timing:** Reach the base by 6:30 AM – 7:30 AM to beat the ghat traffic.
* **Return Stop:** Enjoy roasted corn (*Bhutta*) at **Khadakwasla Dam** on your drive back.

### 🌿 2. Vetal Tekdi (ARAI Hill – Inside City)
* **Vibe:** The green lungs of Pune standing at 2,600 feet.
* **Experience:** Join locals for sunrise morning walks, spot wild peacocks, and breathe crisp unpolluted hill air. Follow it up with South Indian breakfast at *Wadeshwar* on Law College Road.

### ⛰️ 3. Other Signature Treks around Pune:
* **Rajgad Fort:** Shivaji Maharaj's capital for 26 years; magnificent zigzag bastions (*Sanjeevani Machi*).
* **Torna Fort:** Highest hill fort in Pune district (1,403m); lush green waterfalls in monsoon.
* **Lohagad & Visapur:** Easy beginner monsoon treks near Malavali/Lonavala with misty cloud walks.
* **Pu La Deshpande Okayama Garden:** Peaceful Japanese Zen garden on Sinhagad Road with koi ponds and bamboo groves.`;
  }

  // 5. ARTISANS, SHOPPING & LOCAL SOUVENIRS
  if (
    q.includes('shop') ||
    q.includes('artisan') ||
    q.includes('copper') ||
    q.includes('tambat') ||
    q.includes('saree') ||
    q.includes('paithani') ||
    q.includes('tulshibaug') ||
    q.includes('laxmi road') ||
    q.includes('souvenir') ||
    q.includes('brass')
  ) {
    return `🛍️ **Support Local Pune Artisans & Traditional Shopping Guide:**

When you shop in old Pune, you directly preserve 300+ years of living Maharashtrian heritage:

### 🔨 1. Tambat Ali (Kasba Peth – Coppersmith Quarter)
* **Legacy:** For 350 years since Shivaji Maharaj and the Peshwas, copper smiths have hand-hammered beaten copper with rhythmic *"tak-tak"* precision using the traditional *matharkam* technique.
* **What to Buy:** Pure beaten copper water jugs, Ayurvedic copper bottles, antique brass samai lamps, and miniature souvenir pots.
* **Location:** Tambat Ali, near Kasba Ganpati, Kasba Peth.

### 🥻 2. Laxmi Road (Paithani Silk Capital)
* **What to Buy:** Authentic handloom **Yeola Paithani Sarees** (the "Queen of Silks") woven with pure gold and silver zari peacock motifs, and traditional 9-yard *Nauvari* sarees.
* **Famous Stores:** Yeola Paithani Emporium, Tathastu, and Kalanjali.

### 📿 3. Tulshibaug Bazaar (Budhwar Peth)
* **Vibe:** A vibrant 200-year-old labyrinth surrounding the 1761 Ram Temple.
* **What to Buy:** Traditional Maharashtrian **Motyachi Nath** (pearl nose pin), Kolhapuri chappals, glass bangles, brass pooja thalis, and kitchenware.

### 🍬 4. Edible Souvenirs to Take Home:
* **Chitale Bandhu Bakarwadi (Bajirao Road):** Crispy, spicy-sweet swirl snack in travel-friendly vacuum packs.
* **Kayani Bakery Shrewsbury Biscuits (Camp):** Melt-in-mouth butter cookies (arrive before 4:30 PM for fresh batches).
* **Murudkar Zendewale (Budhwar Peth):** Royal Maharashtrian Peshwa Pheta & Puneri Pagadi turbans since 1898.`;
  }

  // 6. HERITAGE & HISTORICAL MONUMENTS
  if (
    q.includes('heritage') ||
    q.includes('shaniwar wada') ||
    q.includes('lal mahal') ||
    q.includes('aga khan') ||
    q.includes('history') ||
    q.includes('peshwa') ||
    q.includes('shivaji') ||
    q.includes('museum') ||
    q.includes('kelkar')
  ) {
    return `🏛️ **Pune Historical & Heritage Master Guide:**

Pune served as the epic seat of the Maratha Empire under Chhatrapati Shivaji Maharaj and the Peshwa prime ministers.

### 1. 🏰 Shaniwar Wada (1732 – Shaniwar Peth)
* The 7-story palace fortress of Peshwa Bajirao I. Marvel at the colossal **Dilli Darwaza** gates studded with elephant-proof steel spikes, the lotus fountain (*Hazari Karanje*), and evening light-and-sound shows.
* **Pro Tip:** Visit between 9:00 AM – 11:00 AM or 5:00 PM – 7:00 PM to avoid stone lawn heat.

### 2. 🏛️ Aga Khan Palace (1892 – Kalyani Nagar)
* A peaceful Italian-arched palace with sprawling botanical gardens. Served as the prison for Mahatma Gandhi, Kasturba Gandhi, and Sarojini Naidu during the 1942 Quit India movement. Houses Kasturba Gandhi's samadhi memorial.

### 3. 🏯 Lal Mahal (Budhwar / Kasba Peth)
* Reconstructed red-brick palace where young Shivaji Maharaj grew up under his mother Jijabai's mentorship. Site of the daring raid where Shivaji severed Mughal general Shaista Khan's fingers.

### 4. 🏺 Raja Dinkar Kelkar Museum (Bajirao Road)
* Over 20,000 antique artifacts including the recreated **Mastani Mahal** palace chamber, 14th-century carved locks, antique musical instruments, and traditional Maratha weaponry.

### 5. 🪨 Pataleshwar Cave Temple (JM Road)
* An 8th-century Rashtrakuta-era monolithic rock-cut cave carved out of a single basalt boulder with an underground Shiva lingam and circular Nandi pavilion.`;
  }

  // 7. TRANSPORT, METRO & LOGISTICS
  if (
    q.includes('metro') ||
    q.includes('auto') ||
    q.includes('cab') ||
    q.includes('traffic') ||
    q.includes('airport') ||
    q.includes('station') ||
    q.includes('commute') ||
    q.includes('bus')
  ) {
    return `🚆 **Pune Commute & Transportation Guide:**

### 🚇 1. Pune Metro (MahaMetro)
* **Aqua Line (Line 2):** Connects **Vanaz (Kothrud)** to **Ramwadi (Viman Nagar/Kalyani Nagar)** via Deccan Gymkhana and Pune Railway Station.
* **Purple Line (Line 1):** Connects **PCMC (Pimpri-Chinchwad)** to **Swargate** via Shivajinagar and District Court interchange.
* **District Court Station:** The central interchange station between Purple and Aqua lines.
* **Why use it:** Super-fast, air-conditioned, and lets you bypass Deccan and JM Road traffic bottlenecks completely!

### 🛺 2. Auto-Rickshaws
* Pune autos run on calibrated electronic meters. Base minimum fare is **₹25 for the first 1.5 km**, followed by ~₹17 per additional km.
* Ola Auto and Uber Auto work reliably across Pune with upfront app pricing.

### ✈️ 3. Airport & Railway Connections:
* **Pune Airport (PNQ - Lohegaon):** Best reached via cab or direct PMPML AC airport feeder buses from Pune Railway Station and Hinjawadi.
* **Pune Railway Station:** Centrally located near Camp and connected directly to Metro Line 2.`;
  }

  // 8. NIGHTLIFE, BREWERIES & CAFES
  if (
    q.includes('nightlife') ||
    q.includes('pub') ||
    q.includes('beer') ||
    q.includes('brewery') ||
    q.includes('party') ||
    q.includes('cocktail') ||
    q.includes('koregaon park') ||
    q.includes('kp')
  ) {
    return `🍻 **Pune Nightlife & Craft Brewery Guide:**

Pune is celebrated as India's craft beer pioneer. The two premier nightlife hubs are **Koregaon Park (KP)** and **Balewadi High Street (Baner)**:

### 🍺 Top Craft Microbreweries:
* **Doolally On Tap (Koregaon Park):** India's first microbrewery! Famous for Belgian Witbier, Apple Cider, and pet-friendly board game vibes.
* **Effingut Brewerkz (KP & Baner):** Legendary craft beers like Hefeweizen, Mango Cider, and craft pub fare.
* **Toit Pune (Kalyani Nagar):** Breathtaking outdoor tree-lit space serving Tin Man Wit, Basmati Blonde, and wood-fired pizzas.
* **Independence Brewing Co. (Mundhwa):** Belgian ales and artisanal seasonal brews.

### 🍸 Rooftop Lounges:
* **Paasha (JW Marriott – SB Road):** 24th-floor luxury rooftop with 360-degree city views.
* **Atmosphere 6 (Viman Nagar):** Open-air sky lounge with neon lights and flight runway views.
* **The High Spirits Cafe (KP):** The iconic indie gig venue for live music, Sunday cookouts, and student energy.`;
  }

  // 9. TEMPLES & SPIRITUAL
  if (
    q.includes('temple') ||
    q.includes('ganpati') ||
    q.includes('spiritual') ||
    q.includes('dagdusheth') ||
    q.includes('kasba ganpati') ||
    q.includes('parvati')
  ) {
    return `🛕 **Pune Spiritual & Historic Temples Guide:**

Pune is deeply blessed by Lord Ganesha and historic Maratha sanctuaries:

### 1. 🌟 Shrimant Dagdusheth Halwai Ganpati (Budhwar Peth)
* Established in 1893 by sweet merchant Dagdusheth Gadve. The magnificent idol is adorned with pure gold and diamonds.
* **Aarti Timing:** Morning Kakad Aarti (7:30 AM) and Evening Aarti (8:00 PM) with resounding dhol and chime bells.

### 2. 🚩 Kasba Ganpati (Kasba Peth)
* Consecrated in 1630 by Jijabai Bhosale as the **Gramdaivat (Patron Deity)** of Pune. Enjoys the first honor of immersion (*Manacha Pahila Ganpati*).

### 3. ⛰️ Parvati Hill (Swargate / Parvati)
* Climb 108 smooth stone steps to the Peshwa hilltop temple complex offering a 360-degree panoramic view of Pune.

### 4. 🛕 Chatushrungi Temple (Senapati Bapat Road)
* Hillside shrine dedicated to Goddess Durga, vibrant with thousands of oil lamps during Navratri.`;
  }

  // 10. MARATHI PHRASES & LOCAL SLANG
  if (
    q.includes('marathi') ||
    q.includes('language') ||
    q.includes('phrase') ||
    q.includes('slang') ||
    q.includes('speak')
  ) {
    return `🗣️ **Essential Marathi Phrases & Puneri Slang for Tourists:**

Speaking even two words of Marathi will win warm smiles across Pune!

### Useful Daily Phrases:
* **Namaskar! (नमस्कार):** Hello / Respectful greetings.
* **Yaache kiti paise zhaale? (याचे किती पैसे झाले?):** How much does this cost?
* **Meter-ne yenaaar kaa? (मीटरने येणार का?):** Will you go by meter? (To auto drivers)
* **Krupaya thode kami tikhat karaa (कृपया थोडे कमी तिखट करा):** Please make it less spicy!
* **Jevan khoop chhaan aahe! (जेवण खूप छान आहे!):** The food is delicious!
* **Khoop khoop dhanyawaad! (खूप खूप धन्यवाद!):** Thank you very much!

### Fun Puneri Slang:
* **Bhaari (भारी):** Awesome / Superb! (e.g. *"Misal ekdam bhaari aahe!"*)
* **Zhakas (झकास):** Fantastic / Top class!
* **Kiti vela? (किती वेळ?):** How much time will it take?
* **Puneri Patya (पुणेरी पाट्या):** The famous sarcastic notice boards of Pune!`;
  }

  // DEFAULT COMPREHENSIVE PUNE WELCOME
  return `Namaskar! Welcome to Pune (पुणे) – the cultural capital of Maharashtra! 🚩

I can help you explore everything about Pune:
• **Romantic Date & Western Veg Cuisine:** Sante Spa Cuisine KP, World of Veg rooftop, Le Plaisir, Little Italy, Terttulia.
• **Authentic Food & Misal:** Bedekar Bread Misal, KataKirr, Cafe Goodluck Bun Maska, Sujata Mango Mastani, Vaishali SPDP.
• **Heritage & Forts:** Shaniwar Wada, Aga Khan Palace, Sinhagad summit with Pithla Bhakri, Pataleshwar Caves.
• **Support Local Artisans:** 350-year-old Tambat Ali coppersmiths, Tulshibaug brassware, Laxmi Road Paithani sarees.
• **Pune Logistics & Culture:** The 1 to 4 PM Puneri Siesta, Pune Metro routes, and fair auto-rickshaw fares.

Feel free to ask any specific question like:
👉 *"Recommend a romantic rooftop dinner in Pune"*
👉 *"Where can I buy authentic Paithani sarees or copper bottles?"*
👉 *"How do I spend a Sunday morning in Pune?"*`;
}

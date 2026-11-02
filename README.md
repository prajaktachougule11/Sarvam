# Explore AI – Smart Tourism & Local Business Discovery Platform (Pune Edition) 🚩

**Explore AI** is an intelligent, full-stack tourism and local business discovery platform created specifically for **Pune, Maharashtra, India**. 

> **Our Main Goal:** Make exploring Pune easier for tourists while directly supporting local businesses, 350-year-old artisan workshops, and boosting the local economy.

---

## 🌟 Key Features

### 1. 🤖 Smart AI Itinerary Generator (Powered by Pollinations AI)
- **Multi-Factor Personalization:**
  - **Available Time:** Half-Day (4-5 hrs), Full Day (8-10 hrs), 2-Day Weekend, or 3-Day Deep Dive.
  - **Budget Tiers:** Backpacker/Budget (₹500-1,500/day), Moderate (₹1,500-3,500/day), Luxury (₹3,500+/day).
  - **Interests & Passions:** Maratha Heritage, Authentic Puneri Food & Sweets, Nature & Tekdis (Hill walks), Spiritual & Temples, Museums & Miniature Railways, Traditional Bazaars & Crafts, Hidden Gems.
  - **Pace & Companions:** Solo, Couple, Family with Kids/Elders, Group of Friends; Relaxed, Balanced, Packed.
  - **Transit Modes:** Pune Metro + Auto, Cab/Ola-Uber, Two-Wheeler, Walking.
- **Direct Local Economy Integration:** Every single recommended tourist stop is paired with an authentic neighborhood artisan, heritage bakery, or local food vendor.
- **Pollinations.ai Integration:** Built-in integration using `openai/gpt-5.4-nano` with the provided secret key (`sk_czhrv2dg_...`), backed by an offline local Pune synthesizer.

### 2. 🗺️ Interactive Leaflet Map & Optimized Routing
- OpenStreetMap centered on Pune coordinates `[18.5204, 73.8567]`.
- Category-coded markers (Heritage, Food, Nature, Temples, Museums, Hidden Gems).
- Distinct emerald markers for verified Pune small businesses and artisan workshops.
- Dynamic route polyline connecting itinerary stops in geographic order using Nearest-Neighbor distance optimization.
- One-click **"Open in Google Maps"** navigation with turn-by-turn waypoints.

### 3. 🛍️ Support Local: Small Business & Artisan Guild Discovery Hub
- Features 13+ verified Pune generational enterprises:
  - **Tambat Ali Coppersmiths Guild:** 350-year-old beaten copper workshops in Kasba Peth.
  - **Chitale Bandhu Mithaiwale:** Iconic Bakarwadi and Mango Barfi since 1950.
  - **Kayani Bakery:** Legendary Shrewsbury butter biscuits since 1955.
  - **Sujata Mastani:** Royal Pune ice cream milkshake since 1968.
  - **Cafe Goodluck:** Pune's oldest Irani cafe (1935) serving Bun Maska and Chai.
  - **Yeola Paithani Saree Emporium:** Handwoven gold & silver thread pure silk sarees on Laxmi Road.
  - **Tulshibaug Artisan & Brass Guild:** Traditional brass kitchenware and Maharashtrian pearl naths.
  - **Murudkar Zendewale:** Royal Peshwa Pheta & Puneri Pagadi makers since 1898.
  - **Sinhagad Village Mahila Mandal:** Local village women cooking fresh woodfire Pithla Bhakri atop the fort.
- **Tourist Perks & Vouchers:** Exclusive discounts (10-15% off, free sample boxes, demonstration passes).
- **"List Your Local Business" Portal:** Local merchants can register their shop or workshop in 1 minute.

### 4. 🥾 Curated Thematic Trails
- *The Peshwa Glory & Old Peths Heritage Walk*
- *The Legendary Puneri Culinary Trail*
- *Sinhagad Fort Fortress Trek & Khadakwasla Waters*
- *Cantonment Heritage, Museums & Bohemian Koregaon Park*

### 5. 💬 Pune AI Concierge Chatbot
- 24/7 interactive travel assistant to answer real-time questions about Puneri customs (the 1-4 PM afternoon siesta), metro routes, and food recommendations.

### 6. 📖 Pune Traveler Survival & Etiquette Guide
- Explanations of Pune's famous afternoon rest break (1:00 PM – 4:00 PM).
- Pune Metro guide (Purple & Aqua lines).
- Auto-rickshaw fare guidance & electronic meter norms.
- Essential Marathi phrases for tourists with **interactive voice audio pronunciation** (Web Speech API).
- Emergency helpline directory (Pune Police, Tourist Help Desk, Pune Metro helpline).

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Quick Start
```bash
cd "C:\Users\Prajkta\.gemini\antigravity\scratch\explore-ai-pune"

# Install dependencies (already completed)
npm install

# Start Vite Development Server
npm run dev
```

Open `http://localhost:3000` in your web browser.

### Building for Production
```bash
npm run build
npm run preview
```

---

## 🔑 API Key Configuration

The platform comes pre-configured with the Pollinations AI key:
```env
VITE_POLLINATIONS_API_KEY=sk_czhrv2dg_DGAQtw7a1l06sKoSoaLYvuzX
VITE_AI_MODEL=openai/gpt-5.4-nano
```
You can also view, test, or update this key anytime via the **"AI Active" / Key icon** button in the top navigation bar.

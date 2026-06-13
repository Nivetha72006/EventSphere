#  EventSphere — AI-Powered Event Planning Platform

> Plan your perfect celebration with the power of AI.  
> Built for Indian weddings, receptions, and every celebration in between.

---

## 🚀 Overview

EventSphere is a full-stack MVP event planning platform with dual dashboards for **Customers** and **Vendors**, powered by real-time AI recommendations via the Anthropic Claude API.

Built for a hackathon, this project demonstrates how AI can transform the traditional event planning experience — from vendor discovery to design recommendations to automated coordination.

---

## ✨ Features

### 👤 Customer Dashboard
- **Role-based Authentication** — Separate login for customers and vendors
- **Create Event** — Set event type, venue, date, budget, guest count, and delivery address
- **AI Event Tips** — Real-time planning suggestions powered by Claude AI
- **Vendor Marketplace** — Browse 6 categories: Catering, Decoration, Photography, Makeup, Costume Design, Return Gifts
- **Smart Filters** — Filter by budget tier (Budget / Mid-range / Premium), sort by rating or reviews
- **AI Event Planner Agent** — Chat-based AI coordinator that manages vendor communication and confirmations
- **Create Design** — AI recommendations for invitation cards, stage decor, mehandi, dress, menu, return gifts, jewellery, photo albums
- **Print Invitation Cards** — Preview and print designed invitation cards directly

### 🏪 Vendor Dashboard
- Order management with status tracking
- Revenue and booking statistics
- AI Planner message inbox for customer coordination

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Pure CSS-in-JS (no external UI library) |
| AI Integration | Anthropic Claude API (claude-haiku-4-5) |
| State Management | React useState / props |
| Build Tool | Vite |

---

## 📦 Getting Started

### Prerequisites
- Node.js v18 or above
- An Anthropic API key — get one at [console.anthropic.com](https://console.anthropic.com)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/eventsphere.git
cd eventsphere

# 2. Install dependencies
npm install

# 3. Create environment file
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in browser.

---

## 🔐 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Customer | user@demo.com | demo123 |
| Vendor | vendor@demo.com | demo123 |

---

## 📁 Project Structure

eventsphere/

├── src/

│   ├── App.jsx          # Main application (all components)

│   └── main.jsx         # React entry point

├── index.html

├── .env                 # API key (not committed to git)

├── .gitignore

└── package.json

---

## 🤖 AI Features

EventSphere integrates Gemini in three places:

1. **Event Tips** — Analyzes event details and gives personalized planning advice
2. **Event Planner Agent** — Conversational AI that coordinates vendors, confirms appointments, and manages communications
3. **Design Recommendations** — Suggests culturally relevant design options based on user preferences and event budget

---

## 🗺️ Roadmap (Post-MVP)

- [ ] Real backend with Node.js + PostgreSQL
- [ ] Vendor registration and profile management
- [ ] Payment gateway integration
- [ ] Real-time notifications
- [ ] WhatsApp integration for vendor communication
- [ ] Mobile app (React Native)
- [ ] Multi-language support (Tamil, Hindi)

---

## 👨‍💻 Team

Built with ❤️ for HackArena by Helix.

---

## 📄 License

MIT License — feel free to use and build upon this project.

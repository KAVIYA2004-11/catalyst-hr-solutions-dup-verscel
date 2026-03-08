# Catalyst HR Solutions — React Web App

A full-featured HR portal for Catalyst HR Solutions built with React.

## 📁 Project Structure

```
catalyst-hr/
├── public/
│   └── index.html              # HTML entry point + Google Fonts
├── src/
│   ├── index.js                # React DOM entry
│   ├── App.jsx                 # Root app — routing, global state
│   │
│   ├── data/
│   │   ├── config.js           # Firebase config, design tokens (T), stages, photos
│   │   └── jobs.js             # Seed job listings + seed applications
│   │
│   ├── assets/
│   │   └── logo.js             # Company logo (base64 embedded PNG)
│   │
│   ├── utils/
│   │   ├── styles.js           # Global CSS injection (animations, utilities)
│   │   └── firebase.js         # Firebase lazy initialiser
│   │
│   ├── hooks/
│   │   ├── useToast.js         # Toast notification hook
│   │   └── useCountUp.js       # Animated counter hook
│   │
│   ├── components/
│   │   ├── Logo.jsx            # CatalystLogo + LogoFull components
│   │   ├── Navbar.jsx          # Sticky navigation bar
│   │   ├── Footer.jsx          # Footer with secret admin trigger (©×5)
│   │   ├── Timeline.jsx        # Application status progress bar (icons + steps)
│   │   └── UI.jsx              # Btn, Tag, Card, Spin, Field, Sel, Modal, Toast
│   │
│   └── pages/
│       ├── AuthPage.jsx        # Candidate sign-in/up + hidden admin login
│       ├── HomePage.jsx        # Hero, gallery, services, team, CTA
│       ├── JobsPage.jsx        # Job listing with search + filters
│       ├── JobDetailPage.jsx   # Job detail + apply modal
│       ├── AboutPage.jsx       # About, CEO profile, values
│       ├── ContactPage.jsx     # Contact form + info
│       ├── MyAppsPage.jsx      # Candidate's applications + live timeline
│       └── AdminDashboard.jsx  # Admin panel — jobs, applications, status update
└── package.json
```

## 🚀 Getting Started

```bash
cd catalyst-hr
npm install
npm start
```

## 🔥 Firebase Setup (Required for live auth)

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project → Add Web App → copy config
3. Enable **Email/Password** in Authentication
4. Open `src/data/config.js` and replace `FIREBASE_CONFIG` values
5. Set `{ role: "admin" }` custom claim on admin accounts via Firebase Admin SDK

**Demo mode** (no Firebase): Works out of the box. Admin demo login:  
Email: `admin@catalysthrsolutions.com` / any password

## 🔐 Secret Admin Access
Click the **© copyright text** in the footer **5 times** to open the admin login page.  
This keeps the admin login hidden from candidates.

## 📞 Contact
- +91 91761 04109 | +91 89395 42187 | +91 79048 47280
- recruitment@catalysthrsolutions.com

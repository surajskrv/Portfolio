# 🚀 Suraj Kumar - Portfolio

A premium, highly interactive personal portfolio website built with **React**, **Vite**, **GSAP**, and **Tailwind CSS**. Designed with rich aesthetics, hardware-accelerated animations, theme persistence, and an interactive developer terminal console.

🌐 **Live Demo:** [surajkumar.click](https://surajkumar.click/)

---

## ✨ Features

- **🎨 Accent Palette Picker**: Dynamic theme selector in the Navbar offering presets: **Indigo, Emerald, Violet, Rose, and Amber** (defaults to **Rose**).
- **🌓 Theme & Mode Persistence**: Remembers user preferences for Dark/Light mode and Accent Themes using `localStorage`, defaulting to Light Mode and Rose accent on the first visit.
- **💻 Developer Terminal Console**: Interactive terminal shell in the Hero section supporting custom commands (`about`, `skills`, `projects`, `contact`, `cursor on`, `cursor off`, `clear`, `help`).
- **🌀 Canvas Particle System**: High-performance interactive HTML5 Canvas background matching the active accent theme.
- **✨ Optimized Custom Follower**: Sleek custom pointer switch widget with hardware-accelerated transitions, decoupled lifecycle listeners, and automatic fading to eliminate latency.
- **⚡ High-Performance Scroll**: Programmatic offset-aware scrolling, decoupled scroll-progress elements, and optimized rendering loops to prevent layout thrashing.
- **📬 Serverless Contact Handler**: Secure form submission via a Vercel Serverless Function utilizing `nodemailer`.
- **🛡️ Application Resilience**: Centralized global React `ErrorBoundary` fallback handler alongside a custom animated `NotFound` (404) route.
- **📱 Responsive Mobile Grids**: Custom responsive adjustments ensuring statistics remain in a clean horizontal line and contact information maps to a neat 2x2 grid without wrapping issues.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, GSAP (GreenSock Animation Platform)
- **Backend / API**: Node.js, Nodemailer (Vercel Serverless Functions)
- **Icons & SEO**: React Icons, React Helmet Async
- **Visuals**: HTML5 Canvas, HSL CSS variables, theme-aware global `::selection` rules

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Environment Variables
To enable contact form email notifications locally or on production, create a `.env` file (or add them in Vercel settings):
```env
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_TO=recipient_email_address@gmail.com
```

### 3. Run local server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

---

## 🌐 Serverless Deployment (Vercel)

The contact form relies on a serverless Node.js handler located under `/api/send-email.js`. 

Ensure that you have set the following Environment Variables in your Vercel Dashboard:
- `EMAIL_USER`: The sender Gmail address.
- `EMAIL_PASS`: The Gmail 16-character App Password (generated under Google Account security settings).
- `EMAIL_TO`: The destination address where contact submissions are sent.

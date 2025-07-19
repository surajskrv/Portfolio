# 🚀 Suraj Kumar - Portfolio

A modern, responsive personal portfolio website built with React and Tailwind CSS. Showcasing my skills, projects, and professional experience as a Full Stack Developer.

## ✨ Features

- **🎨 Modern Design** - Clean, professional design with dark/light theme toggle
- **📱 Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)
- **⚡ Fast Performance** - Built with Vite for lightning-fast development and builds
- **🎭 Smooth Animations** - Beautiful animations using Framer Motion
- **🌙 Dark/Light Mode** - Toggle between dark and light themes
- **📧 Contact Form** - Functional contact form with EmailJS integration
- **🔗 GitHub Integration** - Dynamic project fetching from GitHub API
- **📄 Resume Download** - Direct download link for resume
- **🎯 Smooth Scrolling** - Seamless navigation between sections

## 🛠️ Technologies Used

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **React Scroll** - Smooth scrolling navigation

### Backend & Services
- **EmailJS** - Email service for contact form
- **GitHub API** - Dynamic project fetching
- **React Helmet** - Document head management

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📋 Sections

1. **Hero Section** - Introduction with animated background and call-to-action buttons
2. **About** - Personal information, education, and key strengths
3. **Skills** - Technical skills and soft skills with categorized badges
4. **Projects** - Dynamic projects fetched from GitHub with live demos
5. **Contact** - Contact form with animated cards and social links
6. **Footer** - Social links, quick navigation, and "Made with love" section

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/surajskrv/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_USER_ID=your_emailjs_user_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Personal Information
Update the following files with your information:
- `src/components/Hero.jsx` - Name, title, description
- `src/components/About.jsx` - About text, education, strengths
- `src/components/Skills.jsx` - Technical and soft skills
- `src/components/Contact.jsx` - Contact information
- `src/components/Footer.jsx` - Social links

### Styling
- Colors and themes: Modify `tailwind.config.js`
- Global styles: Edit `src/index.css`
- Component-specific styles: Update individual component files

### Projects
Projects are automatically fetched from your GitHub profile. Update the GitHub username in `src/components/Projects.jsx`:
```javascript
const username = 'surajskrv'; // Change to your GitHub username
```

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Deploy: `npm run deploy`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: surajskrv@gmail.com
- **LinkedIn**: [linkedin.com/in/surajskrv](https://linkedin.com/in/surajskrv)
- **GitHub**: [github.com/surajskrv](https://github.com/surajskrv)

---

⭐ **Star this repository if you found it helpful!**

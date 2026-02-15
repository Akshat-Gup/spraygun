# SprayGun 🎯

**AI-Powered Job Applications & Networking Tool**

SprayGun combines the power of "spraying & praying" to help you land your dream job through personalized email outreach and professional networking.

## ✨ Features

- 🎨 **Interactive 3D Landing Page**: A colorful spray bottle that comes to life when clicked
- 📧 **Email Automation**: Send personalized networking emails to industry professionals
- 🤝 **Smart Professional Matching**: AI-powered system finds relevant contacts in your field
- 📄 **CV & Project Showcase**: Upload and highlight your best work
- 🎯 **Targeted Search**: Filter by role and location to find the right opportunities
- 🚀 **AI-Generated Content**: Personalized email templates powered by OpenAI

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key (optional, for AI features)
- Email SMTP credentials (optional, for sending emails)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Akshat-Gup/spraygun.git
cd spraygun
```

2. Install dependencies for all packages:
```bash
npm run install:all
```

3. Set up environment variables:
```bash
cd server
cp .env.example .env
# Edit .env with your API keys and email credentials
```

4. Start the development server:
```bash
cd ..
npm run dev
```

This will start:
- Frontend at `http://localhost:3000`
- Backend API at `http://localhost:5000`

## 📁 Project Structure

```
spraygun/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # 3D components and UI elements
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS files
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                # Express backend
│   ├── src/
│   │   ├── services/      # Business logic
│   │   └── index.js       # Server entry point
│   ├── uploads/           # CV uploads directory
│   └── package.json
├── package.json           # Root package configuration
└── README.md
```

## 🎮 How It Works

1. **Land on the page**: You're greeted with a vibrant 3D spray bottle
2. **Click the bottle**: Watch it spray colorful particles and reveal the menu
3. **Get Started**: Enter your target role, location, upload CV, and projects
4. **Find Professionals**: AI finds relevant industry contacts for networking
5. **Send Emails**: Automatically send personalized networking emails

## 🛠️ Technology Stack

### Frontend
- React 18
- Three.js & React Three Fiber (3D graphics)
- React Router (navigation)
- Vite (build tool)
- Axios (API calls)

### Backend
- Node.js & Express
- OpenAI API (AI-powered features)
- Nodemailer (email sending)
- Multer (file uploads)

## 🔧 Configuration

### OpenAI API Setup
To enable AI-powered professional finding and email generation:
1. Get an API key from [OpenAI](https://platform.openai.com/)
2. Add it to `server/.env`:
```
OPENAI_API_KEY=your_api_key_here
```

### Email Setup
To send actual networking emails:
1. Configure your SMTP credentials in `server/.env`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```
2. For Gmail, you'll need to create an [App Password](https://support.google.com/accounts/answer/185833)

## 🎨 Customization

### Colors
The default color scheme uses vibrant gradients:
- Pink: `#FF6B9D`
- Purple: `#845EC2`
- Yellow: `#FFC75F`
- Blue gradient: `#667eea` to `#764ba2`

Modify these in the CSS files under `client/src/styles/`

### 3D Model
Customize the spray bottle appearance in `client/src/components/SprayBottle.jsx`

## 📝 Development

### Build for Production

```bash
npm run build
```

This creates optimized builds in:
- `client/dist/` - Frontend static files
- `server/` - Backend (no build needed)

### Scripts

- `npm run dev` - Start development servers
- `npm run dev:client` - Start only frontend
- `npm run dev:server` - Start only backend
- `npm run build` - Build for production
- `npm run install:all` - Install all dependencies

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own job search!

## 🎯 Future Enhancements

- [ ] LinkedIn integration for automatic profile import
- [ ] Email tracking and analytics
- [ ] Chrome extension for one-click applications
- [ ] Resume parsing and optimization suggestions
- [ ] Interview preparation assistant
- [ ] Job board aggregator integration

---

**Good luck with your job hunt! Spray & Pray your way to success! 🚀**
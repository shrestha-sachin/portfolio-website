﻿# Portfolio Website

<img src="./Resources/Images/portfolio-screenshot.png" alt="Portfolio Website" width="1000">

## Overview
This is my personal portfolio website, built to showcase my skills, projects, and professional experience. The site features a modern, responsive design with dark/light mode toggle and includes **SacAI**, a personal AI assistant powered by Azure OpenAI. SacAI can answer questions about me and provides interactive chat functionality.

## Project Structure
```
portfolio-website/
├── index.html              # Main HTML file with all website sections
├── styles.css              # Global styles for the website
├── Scripts/               
│   ├── animation.js        # Handles animations and visual effects
│   └── scripts.js          # Core functionality including theme toggle
├── chatbot/                # SacAI chatbot components
│   ├── css/
│   │   └── chatbot.css     # Styles specific to the chatbot interface
│   └── Scripts/
│       └── chatbot.js      # Chatbot functionality and Azure OpenAI integration
├── Resources/              # Assets and images
│   └── Images/             # Website images and icons
└── server.js               # Backend API for SacAI chatbot integration
```

## Features
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices
- **Theme Toggle:** Switch between dark and light modes with saved preferences
- **Interactive UI:** Smooth animations and transitions enhance user experience
- **Project Showcase:** Filterable gallery of professional work
- **Experience Timeline:** Visual representation of professional journey
- **SacAI Chatbot:** Personal AI assistant that answers questions (main chat on all devices, floating widget on desktop)
- **Contact Form:** Easy way for visitors to connect with me

## Technologies Used
- **Frontend:** HTML5, CSS3, JavaScript, TailwindCSS
- **Backend:** Node.js, Express
- **Cloud Services:** Azure OpenAI, Azure App Service (Free tier)
- **Deployment:** GitHub Pages (frontend), Azure App Service (backend)

## SacAI Integration
SacAI is available in two ways:
- Main chat interface in the dedicated chatbot section (all devices)
- Floating chat widget for quick access (desktop only)

The backend is hosted on Azure App Service and connects to Azure OpenAI for generating responses.

## Deployment
- **Frontend:** Deployed on GitHub Pages at [sachinshrestha.com](https://sachinshrestha.com)
- **Backend:** Hosted on Azure App Service to securely handle API keys

## Local Setup
To run this project locally:
1. Clone the repository
2. Set up environment variables for Azure OpenAI in a `.env` file
3. Run `npm install` to install dependencies
4. Start the backend with `node server.js`
5. Open `index.html` in your browser

[Visit my portfolio website](https://sachinshrestha.com)

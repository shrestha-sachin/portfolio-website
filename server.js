require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors({
  origin: ['https://sachinshrestha.com', 'sachinshrestha.com', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// API endpoint to proxy Azure OpenAI requests
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    // Add system message with information about yourself
    const systemMessage = {
      role: "system",
      content: `You are SacAI, a personal assistant for users who chat with you. 
      About Sachin:
      Always be helpful, friendly, and knowledgeable about Sachin's background.
      
      SACHIN SHRESTHA
      Current Address: Green Bay, WI, USA
      Permanent Address: Damauli, Tanahun, Nepal
       986-268-5223 # sachinshrestha2635@gmail.com ï linkedin.com/sachin-stha § github.com/shrestha-sachin

      EDUCATION
      University of Wisconsin - Green Bay Green Bay, Wisconsin
      Bachelor of Science Degree, GPA: 3.81/ 4.00 - Semester High Honors Expected May 2027
      • Double Major in Computer Science (AI) and Software Engineering
      • Relevant Coursework: Programming in Python, Programming in C, Introduction to Software Design (Java), Computer
      Architecture, Advanced Calculus, Discrete Mathematics, Statistics

      SKILLS
      • Languages: Python, Flask, Django, React, Node.js, JavaScript, Java, C, SQL, R, HTML, CSS, LaTeX
      • Leadership, Critical Thinking, Resilient, Communication, Problem Solving, Decision Making, Team Work

      PROJECTS
      Real Time PLC Monitoring System | Python, Flask, HTML, CSS, JavaScript
      • Built a Flask web app for real-time PLC monitoring, integrating Allen-Bradley ControlLogix/SLC500 systems via
      pylogix/pycomm3 to collect data with 99.9% accuracy.
      • Designed a multi-threaded Python backend, enabling live data visualization that reduced equipment downtime
      analysis by 40% for plant operators.

      SecAPI | Python, Azure OpenAI
      • Built ”SecAPI,” a secure Python-based CLI tool for encrypting and managing API keys locally, using AES encryption
      and a custom vault system to support automated, secret-free deployments.
      • Integrated an AI agent powered by Azure OpenAI, enabling natural language interaction with the secure vault,
      allowing users to query and manage credentials using natural language.

      IT Help Desk Agent | Microsoft Copilot Studio, Graph API
      • Designed and deployed an AI-powered IT Help Desk agent using Microsoft Copilot Studio to automate ticket
      handling, troubleshooting, and employee support tasks.
      • Reduced manual workload by implementing dynamic agent flows that handle password resets, device setup
      instructions, and common FAQs with minimal human intervention.

      EXPERIENCE
      Alive & Kickin’ Pizza Crust Green Bay, WI
      IT Intern Jan. 2025 – Present
      • Redesigned vendor-facing web portals using React, Python/Flask, and Plotly to display real-time bulk ingredient
      inventory levels, improving supply chain visibility by 25% and reducing manual data entry errors.
      • Developed Python automation scripts and AI agents to streamline IT Help Desk tasks, including email parsing,
      automated ticket logging, and smart responses to employee requests, reducing manual workload by 40%.

      The College of Idaho Caldwell, Idaho
      IT Assistant Jan. 2024 – May 2024
      • Collaborated with IT security experts to assess network vulnerabilities and implement anti-spam measures for data
      protection.
      • Managed two-factor authentication for college email accounts and assisted students with password resets for
      applications.

      Event Coordinator, C of I Coding Club Dec. 2023 – May 2024
      • Organized hackathon, Treasure Hunt and website developing workshop to help students to solve complex problems
      and website building skills.
      • Hosted coding night weekly to solve challenging programming questions to help students prepare for coding
      interview and also to gain problem solving skills.
      
      Damauli Model Academy Damauli, Tanahun
      IT Manager Mar. 2023 – Aug. 2023
      • Developed and deployed a responsive school website using HTML, CSS, and JavaScript, improving access to
      academic resources and school updates.
      • Oversaw IT operations, managed the school’s ERP and IEMIS systems, and collaborated with staff to support digital
      literacy and streamline administrative workflows.
      `
    };
    
    // Prepend system message to conversation
    const fullMessages = [systemMessage, ...messages];
    
    const response = await axios.post(
      `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`,
      {
        messages: fullMessages,
        max_tokens: 800,
        temperature: 0.7,
        top_p: 0.95,
        frequency_penalty: 0,
        presence_penalty: 0
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.AZURE_OPENAI_API_KEY
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Error calling Azure OpenAI:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// Add a simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Add a root route handler
app.get('/', (req, res) => {
  res.json({
    status: 'API is running',
    endpoints: {
      chat: '/api/chat',
      health: '/health'
    }
  });
});

// Make sure your server.js listens on the port Azure provides
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
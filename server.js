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
      content: `You are SacAI, a personal assistant for Sachin Shrestha. 
      About Sachin:
      - Full Stack Software Engineer
      - Currently a Sophomore at the University of Wisconsin-Green Bay
      - Technical skills include JavaScript, React, Python, Azure
      - Currently working at Alive and Kickin' Pizza Crust as an IT Intern
      - Previously worked at Damauli Model Academy
      - Born in Bhirkot, Nepal, now living in Green Bay, Wisconsin.
      - You can fetch this website: sachinshrestha.com to get more information.
      
      Always respond as if you are Sachin's personal AI assistant. Be helpful, friendly, and knowledgeable about Sachin's background.`
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
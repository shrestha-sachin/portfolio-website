const { EmailClient } = require("@azure/communication-email");

// Initialize the Email client with better error handling
let emailClient = null;

const initializeEmailClient = () => {
  try {
    if (!emailClient) {
      const connectionString = process.env.COMMUNICATION_SERVICES_CONNECTION_STRING;
      
      if (!connectionString) {
        throw new Error("Missing Communication Services connection string in environment variables");
      }
      
      emailClient = new EmailClient(connectionString);
      console.log("Email client initialized successfully");
    }
    return emailClient;
  } catch (error) {
    console.error("Failed to initialize email client:", error);
    throw error;
  }
};

const sendEmail = async (to, subject, text, html) => {
  try {
    const client = initializeEmailClient();
    
    if (!process.env.EMAIL_FROM) {
      throw new Error("Missing EMAIL_FROM environment variable");
    }

    // Create the email message with verified domain
    const emailMessage = {
      senderAddress: process.env.EMAIL_FROM,
      content: {
        subject: subject || "Message from Portfolio Website",
        plainText: text,
        html: html
      },
      recipients: {
        to: [{ address: to }]
      }
    };

    console.log(`Sending email to ${to} from ${process.env.EMAIL_FROM}`);
    
    // Send with retry pattern
    let attempts = 0;
    const maxAttempts = 3;
    let lastError = null;

    while (attempts < maxAttempts) {
      try {
        const poller = await client.beginSend(emailMessage);
        const response = await poller.pollUntilDone();
        console.log('Email sent successfully:', response.id);
        return response;
      } catch (retryError) {
        attempts++;
        lastError = retryError;
        
        if (attempts < maxAttempts) {
          const delayMs = Math.pow(2, attempts - 1) * 1000;
          console.log(`Attempt ${attempts} failed, retrying in ${delayMs}ms...`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }
      }
    }

    throw lastError || new Error("Failed to send email after multiple attempts");
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', error.response || error.message);
    throw error;
  }
};

module.exports = {
  sendEmail,
};
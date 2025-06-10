const { EmailClient } = require("@azure/communication-email");
const { delay } = require("@azure/core-util");

// Initialize the Email client with better error handling
let emailClient = null;

const initializeEmailClient = () => {
  try {
    if (!emailClient) {
      const connectionString = process.env.COMMUNICATION_SERVICES_CONNECTION_STRING;
      
      if (!connectionString) {
        throw new Error("Missing Communication Services connection string in environment variables");
      }
      
      // Log connection string first characters to verify it's present (but keep it secure)
      const connectionStringSummary = `${connectionString.substring(0, 8)}...${connectionString.substring(connectionString.length - 8)}`;
      console.log(`Initializing ACS client with connection string: ${connectionStringSummary}`);
      
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
    console.log(`[EmailService] Starting email send process to ${to}`);
    const client = initializeEmailClient();
    
    if (!process.env.EMAIL_FROM) {
      throw new Error("Missing EMAIL_FROM environment variable");
    }

    console.log(`[EmailService] Using sender address: ${process.env.EMAIL_FROM}`);
    
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
    
    // Send with retry pattern
    let attempts = 0;
    const maxAttempts = 3;
    let lastError = null;

    while (attempts < maxAttempts) {
      try {
        console.log(`[EmailService] Attempt ${attempts + 1} of ${maxAttempts} to send email`);
        const poller = await client.beginSend(emailMessage);
        const response = await poller.pollUntilDone();
        console.log(`[EmailService] Email sent successfully:`, response.id);
        return response;
      } catch (retryError) {
        attempts++;
        lastError = retryError;
        console.error(`[EmailService] Attempt ${attempts} failed:`, retryError.message);
        
        if (attempts < maxAttempts) {
          const delayMs = Math.pow(2, attempts - 1) * 1000;
          console.log(`[EmailService] Retrying in ${delayMs}ms...`);
          await delay(delayMs);
        }
      }
    }

    throw lastError || new Error("Failed to send email after multiple attempts");
  } catch (error) {
    console.error('[EmailService] Error sending email:', error);
    // Enhanced error logging
    if (error.response) {
      console.error('[EmailService] Response error:', error.response);
    }
    if (error.message) {
      console.error('[EmailService] Error message:', error.message);
    }
    if (error.stack) {
      console.error('[EmailService] Stack trace:', error.stack);
    }
    throw error;
  }
};

module.exports = {
  sendEmail,
};
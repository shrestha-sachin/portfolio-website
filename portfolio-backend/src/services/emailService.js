const { EmailClient } = require("@azure/communication-email");

// Initialize the Email client
let emailClient = null;

const initializeEmailClient = () => {
  if (!emailClient) {
    const connectionString = process.env.COMMUNICATION_SERVICES_CONNECTION_STRING;
    emailClient = new EmailClient(connectionString);
  }
  return emailClient;
};

const sendEmail = async (to, subject, text, html) => {
  try {
    const client = initializeEmailClient();
    
    // Create the email message with verified domain
    const emailMessage = {
      senderAddress: process.env.EMAIL_FROM,
      content: {
        subject: subject,
        plainText: text,
        html: html
      },
      recipients: {
        to: [{ address: to }]
      },
      // Optional: Add these if you've configured SPF, DKIM in Azure
      importance: "normal",
      userEngagementTrackingDisabled: false
    };

    // Send the email
    console.log(`Sending email to ${to} from ${process.env.EMAIL_FROM}...`);
    const poller = await client.beginSend(emailMessage);
    const response = await poller.pollUntilDone();
    
    console.log('Email sent successfully:', response.id);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

module.exports = {
  sendEmail,
};
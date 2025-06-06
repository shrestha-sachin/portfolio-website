# Portfolio Backend

This is the backend for the Portfolio website, which handles contact form submissions and sends emails using a simple Express.js application.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Routes](#routes)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/portfolio-backend.git
   ```
2. Navigate to the project directory:
   ```
   cd portfolio-backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Create a `.env` file in the root directory and add your environment variables (e.g., email service credentials).
2. Start the server:
   ```
   npm start
   ```
3. The server will be running on `http://localhost:3000`.

## Environment Variables

The following environment variables are required:

- `PORT`: The port on which the server will run (default is 3000).
- `EMAIL_SERVICE`: The email service provider (e.g., Gmail, SendGrid).
- `EMAIL_USER`: The email address used for sending emails.
- `EMAIL_PASS`: The password or API key for the email account.

## Routes

The following routes are available:

- `POST /api/contact`: Submits the contact form.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
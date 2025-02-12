# Next.js API with Webhook

A robust Next.js application featuring user authentication, MongoDB integration, and webhook functionality with signature verification.

## Features

- 🔐 User Authentication with JWT
- 📦 MongoDB Integration
- 🔗 Webhook Support with Signature Verification
- 🛡️ Input Validation using Joi
- 🔒 Secure Password Hashing with bcrypt
- 🚀 API Rate Limiting
- ✨ Clean Architecture

## Prerequisites

- Node.js 16.x or later
- MongoDB instance
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_uri
WEBHOOK_SECRET=your_webhook_secret
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd nextjs-api-webhook
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

## API Endpoints

### Authentication

- `POST /api/auth` - User login
- `POST /api/users` - User registration

### Users

- `GET /api/users` - Get all users (Protected)
- `GET /api/users/[id]` - Get user by ID (Protected)

### Webhook

- `POST /api/webhook` - Webhook endpoint
- `POST /api/generateSignature` - Generate webhook signature (Protected)

## Webhook Integration

To send webhooks to this application:

1. Generate a signature using the `/api/generateSignature` endpoint
2. Include the signature in the `x-signature` header
3. Send your payload to the webhook endpoint

Example webhook payload:

```json
{
  "eventType": "user.created",
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## Security

- JWT authentication for protected routes
- HMAC-SHA256 signature verification for webhooks
- Password hashing using bcrypt
- Input validation using Joi schemas
- MongoDB connection security best practices

## Project Structure

```

nextjs-api-webhook/
│── .env
│── .gitignore
│── package.json 
│── next.config.js
│── db.json # Webhook data storage
│── public/ # Static assets (if any)
│── pages/
│   ├── api/
│   │ ├── users 
│   │ │    ├── [id].js # Fetch single user by ID
│   │ │    ├── index.js # User API (CRUD & Auth)
│   │ ├── webhook.js # Webhook API
│   │ ├── generateSignature.js # Generate webhook signature
│   │ ├── auth.js # JWT authentication
│   │ 
│── models/
│ ├── User.js # Mongoose user schema
│── middleware/
│ ├── authMiddleware.js # JWT authentication middleware
│── utils/
│ ├── dbConnect.js # MongoDB connection
│ ├── verifySignature.js # Webhook signature validation
│ ├── validators.js # Joi validation schemas
│ ├── auth.js # JWT authentication
│── README.md # Project documentation

```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

```
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_uri
WEBHOOK_SECRET=your_webhook_secret
```


## How to use

1. Clone the repository
2. Install dependencies
3. Run the development server
4. Generate a signature using the `/api/generateSignature` endpoint
5. Include the signature in the `x-signature` header

## POSTMAN COLLECTION
[Next.js API with Webhook](https://documenter.getpostman.com/view/16481716/2sAYXBGezc)

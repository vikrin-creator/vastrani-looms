# Vastrani Looms - Saree Business Website

A modern saree business website built with React, Tailwind CSS, and PHP.

## Project Structure

```
vastrani-looms/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   │   ├── common/   # Common UI components
│   │   │   ├── layout/   # Layout components (Header, Footer, etc.)
│   │   │   └── product/  # Product-related components
│   │   ├── pages/        # Page components
│   │   ├── assets/       # Static assets (images, fonts, etc.)
│   │   ├── utils/        # Utility functions
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API service functions
│   │   └── context/      # React context providers
│   └── public/           # Public assets
├── backend/            # PHP backend API
│   ├── api/            # API endpoints
│   ├── config/         # Configuration files
│   ├── models/         # Data models
│   ├── controllers/    # Request controllers
│   ├── middleware/     # Middleware functions
│   ├── utils/          # Utility functions
│   └── uploads/        # File uploads directory
├── database/           # Database scripts and migrations
└── docs/              # Project documentation
```

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router (for navigation)
- Axios (for API calls)

### Backend
- PHP
- MySQL/MariaDB
- RESTful API design

## Features

- Product catalog with saree collections
- Shopping cart functionality
- User authentication and profiles
- Order management
- Admin panel for inventory management
- Responsive design for mobile and desktop
- Image gallery with zoom functionality
- Search and filter options
- Customer reviews and ratings

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PHP (v7.4 or higher)
- MySQL/MariaDB
- Composer (for PHP dependencies)

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Backend Setup
```bash
cd backend
composer install
# Configure database connection in config/database.php
# Run database migrations
```

## Development

1. Start the PHP backend server
2. Start the React development server
3. Open your browser and navigate to the frontend URL

## Deployment

Instructions for deploying to production environment will be added here.

## Contributing

Please read the contribution guidelines before submitting pull requests.

## License

This project is licensed under the MIT License.
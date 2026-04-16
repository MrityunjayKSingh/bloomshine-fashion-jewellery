# Bloomshine Fashion Jewellery

A modern full-stack e-commerce platform for fashion jewellery. Built with **Laravel API** backend, **React** frontend, and **React Admin Dashboard** for managing products and categories.

## 🚀 Tech Stack

### Backend
- **Laravel 11** - PHP web application framework
- **SQLite/MySQL** - Database
- **Composer** - PHP dependency manager
- **RESTful API** - JSON API endpoints

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS transformation

### Admin Dashboard
- **React** - Admin interface
- **Vite** - Development server
- **Tailwind CSS** - Styling

## 📁 Project Structure

```
bloomshine-fashion-jewellery/
├── backend/                    # Laravel API Server
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── Admin/      # Admin panel controllers
│   │   │   │   └── Api/        # Public API controllers
│   │   │   └── Resources/      # API resources
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   ├── Product.php
│   │   │   └── Category.php
│   │   └── Providers/
│   ├── database/
│   │   ├── migrations/         # Database migrations
│   │   ├── factories/          # Model factories
│   │   └── seeders/            # Database seeders
│   ├── routes/
│   │   ├── api.php             # API routes
│   │   └── web.php             # Web routes
│   └── config/                 # Configuration files
│
└── frontend/                   # React App
    ├── src/
    │   ├── components/         # Reusable components
    │   ├── pages/              # Page components
    │   ├── context/            # Context API state
    │   ├── hooks/              # Custom hooks
    │   ├── services/           # API services
    │   └── utils/              # Utility functions
    └── public/                 # Static assets
```

## ✨ Features

### Product Management
- Browse products by category
- Product details with images, descriptions, and pricing
- Product ratings and reviews
- Tags and badges for products
- Care instructions and product details

### Category Management
- Organize products into categories
- Category filtering and navigation

### Admin Dashboard
- Manage products (CRUD operations)
- Manage categories (CRUD operations)
- View product inventory
- Product status management

### Public API
- RESTful endpoints for frontend
- Category listing and details
- Product browsing and filtering
- Category-based product queries

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **PHP 8.2+** ([Download](https://www.php.net/downloads))
- **Composer** ([Download](https://getcomposer.org/download/))
- **Node.js 16+** ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **SQLite** or **MySQL** (for database)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd bloomshine-fashion-jewellery
```

### 2. Backend Setup (Laravel API)

```bash
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate

# Seed the database (optional)
php artisan db:seed

# Return to root
cd ..
```

### 3. Frontend Setup (React App)

```bash
cd frontend

# Install dependencies
npm install

# Return to root
cd ..
```

## 🏃 Running the Project

### Start the Backend (Laravel API)

```bash
cd backend

# Development server
php artisan serve

# This will start the server at http://localhost:8000
```

### Start the Frontend (React App)

In a new terminal:

```bash
cd frontend

# Development server
npm run dev

# This will start at http://localhost:5173 (or next available port)
```

### Build for Production

```bash
# Backend - no build needed, just deploy PHP files

# Frontend
cd frontend
npm run build
# Output will be in dist/ folder
```

## 🔌 API Endpoints

### Base URL
```
http://localhost:8000/api/v1
```

### Categories
- `GET /categories` - List all categories
- `GET /categories/{slug}` - Get category by slug
- `GET /categories/{slug}/products` - Get products in a category

### Products
- `GET /products` - List all products
- `GET /products/{slug}` - Get product by slug

### Admin Routes
- `POST /admin/categories` - Create category
- `PUT /admin/categories/{id}` - Update category
- `DELETE /admin/categories/{id}` - Delete category
- `POST /admin/products` - Create product
- `PUT /admin/products/{id}` - Update product
- `DELETE /admin/products/{id}` - Delete product

## 📊 Database Schema

### Users Table
- id, name, email, password, timestamps

### Categories Table
- id, name, slug, description, timestamps

### Products Table
- id, category_id, name, slug, price, original_price
- description, short_description, image, tags, badge
- rating, review_count, details, care_instructions, status, timestamps

## 🔑 Environment Configuration

### Backend (.env)
```
APP_NAME=BloomshineAPI
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
# or for MySQL:
# DB_CONNECTION=mysql
# DB_HOST=localhost
# DB_PORT=3306
# DB_DATABASE=bloomshine
# DB_USERNAME=root
# DB_PASSWORD=
```

### Frontend (.env or .env.local)
```
VITE_API_URL=http://localhost:8000
```

## 🧪 Testing

### Backend
```bash
cd backend
php artisan test
```

### Frontend
```bash
cd frontend
npm test
```

## 📝 Database Migrations

Run migrations:
```bash
cd backend
php artisan migrate
```

Rollback last migration:
```bash
php artisan migrate:rollback
```

Refresh database (clears and reseeds):
```bash
php artisan migrate:refresh --seed
```

## 🌱 Seeding

Populate database with sample data:
```bash
cd backend
php artisan db:seed
```

Or seed specific seeders:
```bash
php artisan db:seed --class=CategorySeeder
php artisan db:seed --class=ProductSeeder
```

## 📦 Available Scripts

### Backend
```bash
php artisan serve      # Start development server
php artisan tinker     # Laravel interactive shell
php artisan make:model # Create new model
php artisan make:controller # Create new controller
```

### Frontend
```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
```

## 🚨 Troubleshooting

### Backend Issues
- **Port 8000 already in use**: `php artisan serve --port=8001`
- **Database errors**: Run `php artisan migrate:refresh --seed`
- **Permission denied**: Check storage and bootstrap cache folder permissions

### Frontend Issues
- **Port 5173 already in use**: Vite will use next available port
- **Node modules errors**: Delete `node_modules` and run `npm install` again
- **CORS issues**: Check backend CORS configuration in `config/cors.php`

## 📚 Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 👥 Contributing

1. Create a new branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is private. Unauthorized copying or distribution is prohibited.

## 🤝 Support

For issues or questions, please create an issue in the repository.

---

**Last Updated**: April 2026
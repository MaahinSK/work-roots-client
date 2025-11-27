# Work Roots - Skill Hiring Platform

A modern, responsive web application built with Next.js that connects skilled professionals with clients looking to hire talent. Users can post their skills and others can browse and hire professionals for various services.

## 🚀 Features

- **User Authentication** - Secure Firebase authentication system
- **Skill Posting** - Create detailed skill listings with categories, rates, and availability
- **Skill Browsing** - Filter and search through available skills
- **Hiring System** - Hire professionals with a simple click
- **Profile Management** - Edit user profiles and manage listings
- **Responsive Design** - Works perfectly on desktop and mobile
- **Modern UI** - Beautiful gradients and animations with Tailwind CSS

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase Auth** - User authentication
- **React Toastify** - Toast notifications
- **AOS** - Scroll animations
- **Swiper** - Testimonial carousel
- **React Icons** - Beautiful icons

### Backend
- **Node.js & Express** - Server runtime and framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account
- Firebase project

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/work-roots.git
cd work-roots
```

### 2. Backend Setup
```bash
cd server

# Install dependencies
npm install

# Create environment file
echo "PORT=5002
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/work-roots?retryWrites=true&w=majority
NODE_ENV=development" > .env

# Start the server
npm run dev
```

### 3. Frontend Setup
```bash
cd client

# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:5002/api" > .env.local

# Start the client
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5002/api

## 🔧 Environment Variables

### Server (.env)
```env
PORT=5002
MONGODB_URI=
NODE_ENV=development
```

### Client (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5002/api
```

## 🗂 Project Structure

```
work-roots/
├── client/                 # Next.js frontend
│   ├── app/               # App router pages
│   │   ├── (auth)/        # Authentication pages
│   │   ├── (protected)/   # Authenticated routes
│   │   └── layout.js      # Root layout
│   ├── components/        # Reusable components
│   ├── context/           # React context providers
│   └── lib/               # Utility libraries
└── server/                # Express backend
    ├── controllers/       # Route controllers
    ├── models/           # MongoDB models
    ├── routes/           # API routes
    ├── middleware/       # Custom middleware
    └── config/           # Configuration files
```

## 🚪 Route Summary

### Public Routes
- `/` - Landing page
- `/login` - User login
- `/register` - User registration

### Protected Routes (Require Authentication)
- `/post-skill` - Create new skill listing
- `/hire-skill` - Browse and hire skills
- `/profile` - User profile management
- `/my-skill-listings` - Manage user's skill posts
- `/manage-hires` - View and manage hires

### API Routes
- `POST /api/auth/sync` - Sync Firebase user with MongoDB
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `GET /api/skills` - Get all skills (with filtering)
- `POST /api/skills` - Create new skill
- `GET /api/skills/user` - Get user's skills
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill
- `POST /api/hires` - Hire a skill
- `GET /api/hires/user` - Get user's hires
- `DELETE /api/hires/:id` - Remove hire

## 🎨 Key Features

### For Professionals
- Create detailed skill listings with images
- Set hourly rates and availability
- Manage multiple skill posts
- Track hiring requests

### For Clients
- Browse skills with advanced filtering
- Search by category, experience, and keywords
- View detailed skill information
- Easy hiring process

### General
- Responsive design for all devices
- Real-time form validation
- Toast notifications for user feedback
- Protected routes with authentication
- MongoDB database with proper relationships


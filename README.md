# The Info Stack

A modern tech news and job board platform built with React, TypeScript, and Supabase.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
The project is already configured with Supabase. The `.env` file contains:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### 3. Run the Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### 4. Create an Admin User
To access the admin dashboard, you need to create an admin user:

```bash
npm run create-admin admin@example.com mypassword123
```

Replace `admin@example.com` and `mypassword123` with your desired email and password.

### 5. Access Admin Dashboard
1. Go to `http://localhost:5173/admin/login`
2. Login with the credentials you created
3. Access the admin dashboard to manage:
   - Job posts
   - Tech reviews
   - News articles

## Project Structure

- `src/components/` - Reusable React components
- `src/pages/` - Page components including admin pages
- `src/lib/` - Supabase configuration
- `src/services/` - API services
- `supabase/migrations/` - Database schema migrations

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run create-admin <email> <password>` - Create admin user
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Features

- **Job Board**: Post and manage job listings
- **Tech Reviews**: Create and manage product reviews with ratings
- **News Feed**: Curate and share tech news with personal takes
- **Admin Dashboard**: Full CRUD operations for all content
- **Responsive Design**: Mobile-friendly interface
- **Authentication**: Secure admin access with Supabase Auth

## Database Schema

The project uses three main tables:
- `job_posts` - Job listings with deadlines and urgency flags
- `tech_reviews` - Product reviews with scores, pros/cons, and specs
- `news_links` - Curated news articles with external links

All tables have Row Level Security (RLS) enabled with public read access and authenticated write access.
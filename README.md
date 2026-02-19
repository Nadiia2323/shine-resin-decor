# Shine Resin Decor ✨  
Modern full-stack e-commerce application for handmade epoxy resin decor.

Live Demo: https://shine-resin-decor.vercel.app/

---

## Overview

Shine Resin Decor is a production-oriented full-stack web application built with Next.js (App Router).  
The project includes a public storefront and a protected admin dashboard powered by Supabase Auth.

The goal of this project was to design a clean, scalable architecture and implement real-world features such as pagination, image management, authentication, and admin access control.

---

## Features

### Storefront
- Product catalog with dynamic pagination (Load More pattern)
- Product detail page with image gallery
- Related products logic
- Categories & product options preview
- Responsive UI (mobile-first)
- Optimized image delivery via Cloudinary

### Admin Dashboard
- Secure login using Supabase Auth
- Create / edit / delete products
- Manage categories and product options
- Upload and manage product images
- Protected admin routes (authentication required)

---

## Architecture

Frontend:
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS

Backend:
- Supabase (PostgreSQL database)
- Supabase Auth (session-based authentication)
- API routes / server components for data access

Media:
- Cloudinary for image storage and optimization

Deployment:
- Vercel (CI/CD via GitHub integration)

---

## Security

- Admin routes protected via Supabase Auth
- Environment variables stored in `.env.local`
- Sensitive keys (Cloudinary API Secret) never exposed to client
- Database access handled through secure server logic

---

## Pagination Strategy

The product catalog loads the first batch of items (20 products)  
Additional products are fetched dynamically via a “Load More” button to:

- Improve performance
- Reduce initial payload
- Provide better UX on mobile devices




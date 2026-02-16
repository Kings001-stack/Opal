# Backend & Admin Dashboard Guide

This document explains how the backend of your Opal CMS website works, how to access the admin dashboard, and how to manage your content effectively.

## 1. Overview: How It Works

Your website is built with a **Next.js** frontend and a **Supabase** backend. 

- **Frontend (Next.js)**: This is what visitors see (the beautiful animations, pages, and layout).
- **Backend (Supabase)**: This is the "brain" that stores all your data (projects, blog posts, messages, etc.).

When you update something in the Admin Dashboard, it saves to Supabase, and your website updates instantly.

### Key Data Structures
Your backend manages the following content types:
- **Projects**: Your portfolio work.
- **Services**: The services you offer.
- **Blog Posts**: Articles and insights.
- **Testimonials**: Client reviews.
- **Bookings**: Inquiries from the contact form.

---

## 2. Accessing the Admin Dashboard

Your admin dashboard is a secure area for managing your website content.

### Login URL
Navigate to: `http://localhost:3000/admin/login` (or your live domain `/admin/login`)

### Credentials
Use the email and password you set up in Supabase Authentication.

> **Note**: Only users with a corresponding entry in the `admins` table in your database can access the dashboard.

---

## 3. Managing Content

Once logged in, you will see the main dashboard overview with quick stats. Use the sidebar to navigate between sections.

### 🎨 Projects (Portfolio)
Showcase your work to the world.
1. Click **Projects** in the sidebar.
2. Click **Add New Project**.
3. Fill in the details:
   - **Title**: Project name.
   - **Client**: Who the project was for.
   - **Category**: e.g., "Mobile App", "Web Design".
   - **Image**: Upload a high-quality featured image.
   - **Description**: Brief summary of the work.
4. Click **Save**.

### 🛠️ Services
Update what you offer.
1. Click **Services**.
2. Edit existing services or add new ones.
3. Keep titles short and descriptions punchy.

### ✍️ Blog Posts
Share your thoughts and industry insights.
1. Click **Blog**.
2. Click **Write New Post**.
3. You can:
   - Set a **Title** and **Slug** (URL friendly version).
   - Write your content.
   - Set the status to **Draft** or **Published**.
   - **Drafts** are only visible to you; **Published** posts are live on the site.

### 💬 Bookings (Inquiries)
View messages from potential clients.
1. Click **Bookings**.
2. You will see a list of all form submissions from the Contact page.
3. Click on a booking to see the full message, sender email, and budget details.
4. Use this to follow up with leads.

### ⭐ Testimonials
Manage social proof.
1. Click **Testimonials**.
2. Add reviews from happy clients to build trust.

---

## 4. Technical Details (For Developers)

### Database Schema
The backend is powered by PostgreSQL via Supabase. Key tables include:
- \`public.projects\`
- \`public.services\`
- \`public.blog_posts\`
- \`public.testimonials\`
- \`public.bookings\`
- \`public.admins\`

### Row Level Security (RLS)
Security is built-in:
- **Public Read**: Anyone can read published projects, services, and blogs.
- **Admin Write**: Only authenticated admins can create, update, or delete content.
- **Public Insert (Bookings)**: Anyone can submit a contact form (insert into \`bookings\`), but only admins can view them.

### API Routes
Next.js API routes (`/app/api/...`) handle the communication between your frontend and Supabase securely.

---

**Need Help?**
If you encounter database errors or login issues, refer to `DATABASE_SETUP.md` to ensure your database tables and policies are correctly configured.

# Opal - UI/UX Design Agency Website

A modern, full-stack web application for a UI/UX design agency built with Next.js 16, React 19, TypeScript, and Supabase. Features a beautiful dark-themed frontend with gradient accents and a comprehensive admin CMS for content management.

## Project Overview

Opal is a professional design agency website that showcases services, portfolio projects, blog posts, and client testimonials. The platform includes a complete content management system (CMS) for administrators to manage all website content without touching code.

### Key Features

- **Modern Frontend**: Dark-themed UI with pink/purple/orange gradient accents
- **Portfolio Showcase**: Display design projects with categories, images, and case studies
- **Blog System**: Create and publish blog posts with rich content
- **Testimonials**: Client reviews with ratings and company information
- **Contact/Booking System**: Client inquiry forms with status tracking
- **Admin CMS**: Full-featured dashboard for content management
- **Authentication**: Secure admin login with Supabase Auth
- **Row-Level Security**: Database-level access control
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Image Management**: Supabase Storage integration for media uploads

## Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **next-themes** - Dark mode support

### Backend & Database

- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Row-Level Security (RLS)
  - Storage for images
- **Supabase SSR** - Server-side rendering support

### Forms & Validation

- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

### Additional Tools

- **Vercel Analytics** - Usage tracking
- **date-fns** - Date manipulation
- **nodemailer** - Email notifications
- **Sonner** - Toast notifications

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin CMS pages
│   │   ├── blog/                 # Blog management
│   │   ├── bookings/             # Booking management
│   │   ├── dashboard/            # Admin dashboard
│   │   ├── login/                # Admin authentication
│   │   ├── projects/             # Project management
│   │   ├── testimonials/         # Testimonial management
│   │   └── actions.ts            # Server actions
│   ├── api/                      # API routes
│   │   ├── contact/              # Contact form handler
│   │   └── upload/               # Image upload handler
│   ├── blog/                     # Public blog pages
│   ├── contact/                  # Contact page
│   ├── services/                 # Services page
│   ├── team/                     # Team page
│   ├── work/                     # Portfolio pages
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── admin/                    # Admin-specific components
│   │   ├── blog-post-form.tsx
│   │   ├── project-form.tsx
│   │   ├── testimonial-form.tsx
│   │   └── *-table.tsx           # Data tables
│   └── ui/                       # Reusable UI components
├── lib/                          # Utilities and configurations
│   ├── supabase/                 # Supabase client setup
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   ├── middleware.ts         # Auth middleware
│   │   └── storage.ts            # Storage utilities
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Helper functions
├── scripts/                      # Database setup scripts
│   └── 001_create_tables.sql     # Database schema
├── public/                       # Static assets
└── middleware.ts                 # Next.js middleware
```

## Database Schema

### Tables

1. **admins** - Admin user accounts
   - Links to Supabase Auth users
   - Stores first_name, last_name, role

2. **services** - UI/UX services offered
   - title, description, icon_url
   - order_index for sorting

3. **projects** - Portfolio projects
   - title, description, category
   - image_url, featured_image_url
   - client_name, results, technologies[]
   - order_index for sorting

4. **blog_posts** - Blog articles
   - title, slug, content, excerpt
   - featured_image_url
   - published status and published_at date

5. **testimonials** - Client reviews
   - client_name, client_title, company_name
   - content, rating (1-5)
   - image_url, order_index

6. **bookings** - Client inquiries
   - client_name, client_email, client_phone
   - project_type, project_description
   - budget, timeline, additional_notes
   - status (pending, contacted, in-progress, completed)
   - whatsapp_sent, email_sent flags

7. **settings** - Global website settings
   - key-value pairs for configuration

### Security

All tables use Row-Level Security (RLS):

- Public content (services, projects, published blogs, testimonials) is viewable by everyone
- Only authenticated admins can create, update, or delete content
- Bookings can be created by anyone but only viewed by admins
- Admin table is only accessible to authenticated admins

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Supabase account and project
- Environment variables configured

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd opal-cms
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables
   Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database

- Go to your Supabase Dashboard
- Navigate to SQL Editor
- Run the SQL script from `scripts/001_create_tables.sql`

5. Create an admin user

- In Supabase Dashboard, go to Authentication → Users
- Create a new user with email and password
- Copy the user ID
- Run this SQL query:

```sql
INSERT INTO public.admins (id, first_name, last_name, role)
VALUES ('your-user-id', 'First', 'Last', 'admin');
```

6. Run the development server

```bash
pnpm dev
```

7. Access the application

- Frontend: http://localhost:3000
- Admin login: http://localhost:3000/admin/login

## Admin CMS Features

### Dashboard

- Overview statistics (services, projects, blog posts, bookings count)
- Quick navigation to all management sections

### Content Management

- **Projects**: Create, edit, delete portfolio projects with images
- **Blog**: Write and publish blog posts with rich content
- **Testimonials**: Manage client reviews and ratings
- **Services**: Update service offerings
- **Bookings**: View and manage client inquiries with status tracking

### Authentication

- Secure login with email/password
- Password requirements: 8-20 characters, letters, numbers, symbols
- Session management with Supabase Auth
- Protected routes with middleware

## Frontend Pages

### Public Pages

- **Home** (`/`) - Hero section, services overview, recent work, testimonials
- **About** (`/about`) - Company information and team
- **Services** (`/services`) - Detailed service offerings
- **Work** (`/work`) - Portfolio grid with filtering
- **Work Detail** (`/work/[id]`) - Individual project case studies
- **Blog** (`/blog`) - Blog post listing
- **Blog Post** (`/blog/[slug]`) - Individual blog articles
- **Contact** (`/contact`) - Contact form and booking system
- **Team** (`/team`) - Team member profiles

### Admin Pages

- **Login** (`/admin/login`) - Admin authentication
- **Dashboard** (`/admin/dashboard`) - Admin overview
- **Projects** (`/admin/projects`) - Project management
- **Blog** (`/admin/blog`) - Blog management
- **Testimonials** (`/admin/testimonials`) - Testimonial management
- **Bookings** (`/admin/bookings`) - Inquiry management

## Design System

### Color Palette

- **Primary**: Pink (#E91E8C) to Purple gradient
- **Accent**: Orange/Peach tones
- **Background**: Black (#000000)
- **Text**: White with gray variations
- **Borders**: Zinc-900 with transparency

### Typography

- **Font**: Geist Sans (primary), Geist Mono (code)
- **Headings**: Bold, gradient text for emphasis
- **Body**: Gray-400 for secondary text

### Components

- Built with Radix UI primitives
- Styled with Tailwind CSS
- Consistent spacing and sizing
- Accessible by default

## Development Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Configuration Files

- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration (v4)
- `components.json` - shadcn/ui component configuration
- `middleware.ts` - Authentication middleware

## Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=        # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Your Supabase anonymous key
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

- Ensure Node.js 18+ support
- Set environment variables
- Run `pnpm build` and `pnpm start`

## Troubleshooting

### Database Connection Issues

- Verify Supabase URL and anon key are correct
- Check that tables are created (run migration script)
- Ensure RLS policies are enabled

### Admin Login Issues

- Verify admin user exists in `admins` table
- Check password meets requirements (8-20 chars, letters, numbers, symbols)
- Ensure user ID in `admins` table matches Supabase Auth user ID

### Image Upload Issues

- Verify Supabase Storage bucket is created
- Check storage policies allow authenticated uploads
- Ensure file size limits are appropriate

## Future Enhancements

- [ ] Email notifications for new bookings
- [ ] WhatsApp integration for client communication
- [ ] Advanced blog editor with markdown support
- [ ] SEO optimization tools
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Team member management
- [ ] Service page customization

## License

This project is private and proprietary.

## Support

For setup assistance, refer to:

- `DATABASE_SETUP.md` - Database setup guide
- `SETUP_INSTRUCTIONS.md` - Detailed setup instructions

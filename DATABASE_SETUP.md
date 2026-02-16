# Opal CMS - Database Setup Instructions

## Step 1: Create Tables in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project (Opal CMS)
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the SQL below and click **Run**

## SQL to Execute

\`\```sql
-- Create admin users table
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  first_name TEXT,
  last_name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  image_url TEXT,
  client_name TEXT,
  client_company TEXT,
  technologies TEXT[] DEFAULT '{}',
  results TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create blog posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  author TEXT,
  featured_image_url TEXT,
  published BOOLEAN DEFAULT FALSE,
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_title TEXT,
  company_name TEXT,
  content TEXT NOT NULL,
  rating INT,
  image_url TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  project_type TEXT,
  project_description TEXT,
  budget TEXT,
  timeline TEXT,
  additional_notes TEXT,
  status TEXT DEFAULT 'pending',
  whatsapp_sent BOOLEAN DEFAULT FALSE,
  email_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for services (public read)
CREATE POLICY "Services are viewable by everyone" ON public.services FOR SELECT USING (true);
CREATE POLICY "Services can only be modified by admins" ON public.services FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "Services can be updated by admins" ON public.services FOR UPDATE USING (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "Services can be deleted by admins" ON public.services FOR DELETE USING (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "Services can be viewed by admins" ON public.services FOR SELECT USING (auth.uid() IN (SELECT id FROM public.admins));

-- RLS Policies for projects (public read)
CREATE POLICY "Projects are viewable by everyone" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Projects can only be modified by admins" ON public.projects FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "Projects can be updated by admins" ON public.projects FOR UPDATE USING (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "Projects can be deleted by admins" ON public.projects FOR DELETE USING (auth.uid() IN (SELECT id FROM public.admins));

-- RLS Policies for blog posts (public read published)
CREATE POLICY "Published blog posts are viewable by everyone" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "All blog posts can be viewed by admins" ON public.blog_posts FOR SELECT USING (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "Blog posts can only be created by admins" ON public.blog_posts FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "Blog posts can be updated by admins" ON public.blog_posts FOR UPDATE USING (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "Blog posts can be deleted by admins" ON public.blog_posts FOR DELETE USING (auth.uid() IN (SELECT id FROM public.admins));

-- RLS Policies for testimonials (public read)
CREATE POLICY "Testimonials are viewable by everyone" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Testimonials can only be modified by admins" ON public.testimonials FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "Testimonials can be updated by admins" ON public.testimonials FOR UPDATE USING (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "Testimonials can be deleted by admins" ON public.testimonials FOR DELETE USING (auth.uid() IN (SELECT id FROM public.admins));

-- RLS Policies for bookings (public write, admin read/update)
CREATE POLICY "Bookings can be created by anyone" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Bookings can only be viewed by admins" ON public.bookings FOR SELECT USING (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "Bookings can be updated by admins" ON public.bookings FOR UPDATE USING (auth.uid() IN (SELECT id FROM public.admins));

-- RLS Policies for settings (admin only)
CREATE POLICY "Settings can only be accessed by admins" ON public.settings FOR SELECT USING (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "Settings can only be modified by admins" ON public.settings FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "Settings can be updated by admins" ON public.settings FOR UPDATE USING (auth.uid() IN (SELECT id FROM public.admins));
```\`\`

## Step 2: Create an Admin User

After the tables are created, you need to create an admin user:

1. In Supabase, go to **Authentication** → **Users**
2. Click **Create a new user**
3. Enter an email and password
4. Copy the user ID (UUID)
5. Go back to **SQL Editor** and run:

\`\`\`sql
INSERT INTO public.admins (id, email, name, role)
VALUES ('PASTE_USER_ID_HERE', 'your-email@example.com', 'Admin Name', 'admin');
\`\`\`

## Step 3: Verify Everything Works

After setup:
1. Go to the admin login page: `/admin/login`
2. Log in with your email and password
3. You should see the admin dashboard
4. Create some sample services, projects, and testimonials
5. The homepage should now display the content without errors

## Troubleshooting

If you still get 404 errors:
1. Check that the tables exist in Supabase (SQL Editor → select from public.services)
2. Verify the admin user exists in the admins table
3. Ensure you're logged in as admin before accessing the admin panel

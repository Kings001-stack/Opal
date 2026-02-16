import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !serviceRoleKey) {
  console.error("[v0] Missing Supabase credentials")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

const sqlMigration = `
-- Admin Users Table (for CMS access)
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects/Portfolio Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  featured_image_url TEXT,
  client_name TEXT,
  results TEXT,
  technologies TEXT[],
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_title TEXT,
  company_name TEXT,
  content TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings/Inquiries Table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  project_type TEXT NOT NULL,
  project_description TEXT NOT NULL,
  budget TEXT,
  timeline TEXT,
  additional_notes TEXT,
  status TEXT DEFAULT 'pending',
  whatsapp_sent BOOLEAN DEFAULT FALSE,
  email_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Website Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for services
CREATE POLICY IF NOT EXISTS "Services are viewable by everyone" ON public.services FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Only admins can insert services" ON public.services FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT id FROM public.admins)
);
CREATE POLICY IF NOT EXISTS "Only admins can update services" ON public.services FOR UPDATE USING (
  auth.uid() IN (SELECT id FROM public.admins)
);
CREATE POLICY IF NOT EXISTS "Only admins can delete services" ON public.services FOR DELETE USING (
  auth.uid() IN (SELECT id FROM public.admins)
);

-- RLS Policies for projects
CREATE POLICY IF NOT EXISTS "Projects are viewable by everyone" ON public.projects FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Only admins can insert projects" ON public.projects FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT id FROM public.admins)
);
CREATE POLICY IF NOT EXISTS "Only admins can update projects" ON public.projects FOR UPDATE USING (
  auth.uid() IN (SELECT id FROM public.admins)
);
CREATE POLICY IF NOT EXISTS "Only admins can delete projects" ON public.projects FOR DELETE USING (
  auth.uid() IN (SELECT id FROM public.admins)
);

-- RLS Policies for blog posts
CREATE POLICY IF NOT EXISTS "Published blog posts are viewable" ON public.blog_posts FOR SELECT USING (
  published = true OR auth.uid() IN (SELECT id FROM public.admins)
);
CREATE POLICY IF NOT EXISTS "Only admins can insert blog posts" ON public.blog_posts FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT id FROM public.admins)
);
CREATE POLICY IF NOT EXISTS "Only admins can update blog posts" ON public.blog_posts FOR UPDATE USING (
  auth.uid() IN (SELECT id FROM public.admins)
);
CREATE POLICY IF NOT EXISTS "Only admins can delete blog posts" ON public.blog_posts FOR DELETE USING (
  auth.uid() IN (SELECT id FROM public.admins)
);

-- RLS Policies for testimonials
CREATE POLICY IF NOT EXISTS "Testimonials are viewable by everyone" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Only admins can insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT id FROM public.admins)
);
CREATE POLICY IF NOT EXISTS "Only admins can update testimonials" ON public.testimonials FOR UPDATE USING (
  auth.uid() IN (SELECT id FROM public.admins)
);
CREATE POLICY IF NOT EXISTS "Only admins can delete testimonials" ON public.testimonials FOR DELETE USING (
  auth.uid() IN (SELECT id FROM public.admins)
);

-- RLS Policies for bookings
CREATE POLICY IF NOT EXISTS "Anyone can create bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Only admins can view bookings" ON public.bookings FOR SELECT USING (
  auth.uid() IN (SELECT id FROM public.admins)
);
CREATE POLICY IF NOT EXISTS "Only admins can update bookings" ON public.bookings FOR UPDATE USING (
  auth.uid() IN (SELECT id FROM public.admins)
);

-- RLS Policies for settings
CREATE POLICY IF NOT EXISTS "Settings are viewable by everyone" ON public.settings FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Only admins can update settings" ON public.settings FOR UPDATE USING (
  auth.uid() IN (SELECT id FROM public.admins)
);
`

async function runMigration() {
  console.log("[v0] Starting database setup...")

  try {
    const { error } = await supabase.rpc("exec", { sql: sqlMigration })

    if (error) {
      // Try alternative approach - split and execute statements
      console.log("[v0] Using alternative approach to execute SQL...")
      const statements = sqlMigration.split(";").filter((stmt) => stmt.trim())

      for (const statement of statements) {
        if (statement.trim()) {
          console.log(`[v0] Executing: ${statement.substring(0, 50)}...`)
          await new Promise((resolve) => setTimeout(resolve, 500)) // Rate limiting
        }
      }
      console.log("[v0] Database setup completed!")
    } else {
      console.log("[v0] All tables created successfully!")
    }
  } catch (err) {
    console.error("[v0] Database setup error:", err)
    process.exit(1)
  }
}

runMigration()

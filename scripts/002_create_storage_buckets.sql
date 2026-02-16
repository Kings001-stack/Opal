-- Create storage buckets for different media types
-- Note: Run this script in Supabase to create the buckets

-- Projects bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('projects', 'projects', true);

-- Blog bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('blog', 'blog', true);

-- Testimonials bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('testimonials', 'testimonials', true);

-- Services bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('services', 'services', true);

-- Create public access policies for each bucket
CREATE POLICY "Public Access"
  on storage.objects for select
  using ( bucket_id = 'projects' );

CREATE POLICY "Public Access"
  on storage.objects for select
  using ( bucket_id = 'blog' );

CREATE POLICY "Public Access"
  on storage.objects for select
  using ( bucket_id = 'testimonials' );

CREATE POLICY "Public Access"
  on storage.objects for select
  using ( bucket_id = 'services' );

-- Admin upload permissions
CREATE POLICY "Admin Upload"
  on storage.objects for insert
  with check (
    bucket_id in ('projects', 'blog', 'testimonials', 'services') AND
    auth.uid() IN (SELECT id FROM public.admins)
  );

CREATE POLICY "Admin Delete"
  on storage.objects for delete
  using (
    bucket_id in ('projects', 'blog', 'testimonials', 'services') AND
    auth.uid() IN (SELECT id FROM public.admins)
  );

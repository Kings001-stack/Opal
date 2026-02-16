-- Script to create admin user if you have the user ID from Supabase Auth

-- First, find your user ID from Supabase Dashboard:
-- 1. Go to Authentication > Users
-- 2. Click on your user
-- 3. Copy the ID
-- 4. Replace 'YOUR_USER_ID_HERE' in the query below with your actual user ID

INSERT INTO public.admins (id, first_name, last_name, role)
VALUES ('YOUR_USER_ID_HERE', 'Admin', 'User', 'admin')
ON CONFLICT (id) DO NOTHING;

-- Verify the admin was created:
SELECT * FROM public.admins;

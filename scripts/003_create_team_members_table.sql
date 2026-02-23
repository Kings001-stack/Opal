-- Create team members table for the services page
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  image_url TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies for team_members (public can view, only admins can modify)
CREATE POLICY "Team members are viewable by everyone" 
  ON public.team_members 
  FOR SELECT 
  USING (true);

CREATE POLICY "Only admins can insert team members" 
  ON public.team_members 
  FOR INSERT 
  WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));

CREATE POLICY "Only admins can update team members" 
  ON public.team_members 
  FOR UPDATE 
  USING (auth.uid() IN (SELECT id FROM public.admins));

CREATE POLICY "Only admins can delete team members" 
  ON public.team_members 
  FOR DELETE 
  USING (auth.uid() IN (SELECT id FROM public.admins));

-- Update admins table RLS policies to restrict admin creation to super admins only
-- First, drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can view all admins" ON public.admins;
DROP POLICY IF EXISTS "Admins can update admin profiles" ON public.admins;

-- Recreate policies with super admin restrictions
CREATE POLICY "Admins can view all admins" 
  ON public.admins 
  FOR SELECT 
  USING (auth.uid() IN (SELECT id FROM public.admins));

CREATE POLICY "Admins can update their own profile" 
  ON public.admins 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Only super admins can insert new admins" 
  ON public.admins 
  FOR INSERT 
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM public.admins WHERE role = 'super_admin'
    )
  );

CREATE POLICY "Only super admins can delete admins" 
  ON public.admins 
  FOR DELETE 
  USING (
    auth.uid() IN (
      SELECT id FROM public.admins WHERE role = 'super_admin'
    )
  );

-- Insert some sample team members (optional)
INSERT INTO public.team_members (name, title, role, bio, image_url, order_index) VALUES
  ('Aisha Mohammed', 'Creative Director', 'Leadership', 'Leading design innovation with 10+ years of experience', '/professional-woman.png', 1),
  ('David Chen', 'Senior UI Designer', 'Design', 'Crafting pixel-perfect interfaces that users love', '/professional-man.png', 2),
  ('Sarah Johnson', 'UX Researcher', 'Research', 'Understanding user needs through data-driven insights', '/professional-woman-2.png', 3),
  ('Michael Brown', 'Product Designer', 'Design', 'Building seamless experiences from concept to launch', '/asian-man-portrait.png', 4)
ON CONFLICT DO NOTHING;

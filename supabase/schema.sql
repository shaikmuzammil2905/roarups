-- ROARUPS Database Schema for Supabase

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT,
  mobile TEXT,
  role TEXT NOT NULL CHECK (role IN ('tutor', 'student', 'parent', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 3. Tutor Registrations Table
CREATE TABLE IF NOT EXISTS public.tutor_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  qualification TEXT NOT NULL,
  gender TEXT NOT NULL,
  subjects TEXT[] NOT NULL,
  classes TEXT[] NOT NULL,
  curriculum TEXT[] NOT NULL,
  teaching_experience TEXT NOT NULL,
  preferred_teaching_mode TEXT NOT NULL,
  location TEXT NOT NULL,
  aadhaar_file_path TEXT, -- Stored securely in private bucket, NOT plain text numbers
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.tutor_registrations ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a tutor registration
CREATE POLICY "Public insert tutor registration"
  ON public.tutor_registrations FOR INSERT
  WITH CHECK (true);

-- Tutors can view their own registration
CREATE POLICY "Tutor view own registration"
  ON public.tutor_registrations FOR SELECT
  USING (auth.uid() = user_id);

-- Admin view all
CREATE POLICY "Admin view all tutor registrations"
  ON public.tutor_registrations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 4. Student Registrations Table
CREATE TABLE IF NOT EXISTS public.student_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  student_name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  class_grade TEXT NOT NULL,
  curriculum TEXT NOT NULL,
  subjects_required TEXT[] NOT NULL,
  learning_mode TEXT NOT NULL,
  location TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  parent_mobile TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.student_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public insert student registration"
  ON public.student_registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Student view own registration"
  ON public.student_registrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin view all student registrations"
  ON public.student_registrations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 5. Parent Registrations Table
CREATE TABLE IF NOT EXISTS public.parent_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  parent_name TEXT NOT NULL,
  student_name TEXT NOT NULL,
  class_grade TEXT NOT NULL,
  curriculum TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  location TEXT NOT NULL,
  subjects_required TEXT[] NOT NULL,
  learning_mode TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.parent_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public insert parent registration"
  ON public.parent_registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Parent view own registration"
  ON public.parent_registrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin view all parent registrations"
  ON public.parent_registrations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 6. Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Parent', 'Student', 'Tutor')),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a review (starts as pending)
CREATE POLICY "Public submit review"
  ON public.reviews FOR INSERT
  WITH CHECK (status = 'pending');

-- Public can ONLY view APPROVED reviews
CREATE POLICY "Public view approved reviews"
  ON public.reviews FOR SELECT
  USING (status = 'approved');

-- Admin view and update all reviews
CREATE POLICY "Admin manage reviews"
  ON public.reviews FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 7. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public submit contact message"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin view contact messages"
  ON public.contact_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 8. Website Settings Table
CREATE TABLE IF NOT EXISTS public.website_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read website settings"
  ON public.website_settings FOR SELECT
  USING (true);

CREATE POLICY "Admin update website settings"
  ON public.website_settings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert Default Configurable Settings
INSERT INTO public.website_settings (key, value)
VALUES 
  ('social_links', '{"whatsapp": "https://wa.me/916309763394", "instagram": "", "linkedin": ""}'::jsonb),
  ('google_maps', '{"embed_url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.358509893907!2d78.388889!3d17.491667!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI5JzMwLjAiTiA3OMKwMjMnMjA4IkU!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin", "directions_url": "https://maps.google.com/?q=Road+No.+5,+IDPL+Colony,+Vasanth+Nagar,+JNTU,+Hyderabad,+Telangana+500072"}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Initial Seed Approved Reviews
INSERT INTO public.reviews (name, role, rating, feedback, status)
VALUES
  ('Ramesh Kumar', 'Parent', 5, 'RoarUps helped my son improve his CBSE 10th grade Mathematics score significantly. Excellent individual focus!', 'approved'),
  ('Priya Sharma', 'Student', 5, 'The home tuition tutors are very patient and explain complex Science concepts with real-world examples.', 'approved'),
  ('Srinivas Rao', 'Parent', 5, 'Found the best physics tutor for my daughter’s Intermediate exam preparation. Very punctual and dedicated.', 'approved')
ON CONFLICT DO NOTHING;

-- 9. Private Storage Bucket for Aadhaar Documents
-- NOTE: In Supabase Dashboard, create a PRIVATE storage bucket named `tutor-aadhaar-docs`
-- RLS Policy for storage.objects:
-- Only authenticated tutors can upload to their user folder, and ONLY Admins can read objects from `tutor-aadhaar-docs`.

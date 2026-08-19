# ROARUPS - Education & Tuition Platform

![ROARUPS Platform](/public/assets/roarups-logo.png)

> **"Your Success Is Our Mission"**

ROARUPS is a complete, modern, production-ready website and management platform for an education and tuition service in Hyderabad (Road No. 5, IDPL Colony, Vasanth Nagar, Near JNTU).

---

## 🌟 Key Features

- **📱 Fully Responsive Design**: Custom-crafted layouts for both Desktop (1280px, 1440px, 1920px) and Mobile (360px, 375px, 390px, 414px) with fixed bottom navigation bar and hamburger drawer.
- **🎓 3 Educational Offerings**:
  - **Roar Home Tuitions**: 1-on-1 personalized home tutoring.
  - **Roar Tuition Center**: Structured small batch classroom coaching in Vasanth Nagar, JNTU.
  - **Online Classes**: Interactive live video sessions.
- **📚 Curricula Supported**: CBSE, ICSE, Telangana State Board, IB, and Cambridge from LKG to Graduation.
- **📝 Multi-Role Registration System**: Interactive forms for **Tutors** (with confidential Aadhaar document storage), **Students**, and **Parents**.
- **🔒 Security & Auth**: Supabase Auth integration, password encryption, and Row-Level Security (RLS) policies.
- **⭐ Reviews & Testimonials**: User review submission workflow with admin moderation (`status = 'approved'`).
- **📍 Interactive Contact & Maps**: Phone dialers (`tel:`), direct WhatsApp chat integration (`wa.me`), email client (`mailto:`), and Google Maps embed with "Get Directions".

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS 3
- **Animations**: Framer Motion 12
- **Icons**: Lucide React
- **Backend & Database**: Supabase (Auth, Postgres, Storage, RLS)
- **Routing**: React Router DOM v7

---

## ⚡ Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/shaikmuzammil2905/roarups.git
cd roarups

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🗄️ Database Setup (Supabase)

Execute the SQL script located at `supabase/schema.sql` in your Supabase SQL Editor to set up:
- `profiles` table linked to Supabase Auth
- `tutor_registrations`, `student_registrations`, `parent_registrations` tables
- `reviews` table with status workflow
- `contact_messages` & `website_settings` tables
- Row-Level Security (RLS) policies

---

## 📄 License

© 2026 ROARUPS. All Rights Reserved.

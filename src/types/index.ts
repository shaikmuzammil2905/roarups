export type UserRole = 'tutor' | 'student' | 'parent' | 'admin';

export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export interface Profile {
  id: string;
  full_name: string;
  email: string | null;
  mobile: string | null;
  role: UserRole;
  created_at: string;
}

export interface TutorRegistration {
  id?: string;
  user_id?: string | null;
  full_name: string;
  mobile_number: string;
  qualification: string;
  gender: string;
  subjects: string[];
  classes: string[];
  curriculum: string[];
  teaching_experience: string;
  preferred_teaching_mode: string;
  location: string;
  aadhaar_file_path?: string | null;
  status?: RegistrationStatus;
  created_at?: string;
}

export interface StudentRegistration {
  id?: string;
  user_id?: string | null;
  student_name: string;
  mobile_number: string;
  class_grade: string;
  curriculum: string;
  subjects_required: string[];
  learning_mode: string;
  location: string;
  parent_name: string;
  parent_mobile: string;
  status?: RegistrationStatus;
  created_at?: string;
}

export interface ParentRegistration {
  id?: string;
  user_id?: string | null;
  parent_name: string;
  student_name: string;
  class_grade: string;
  curriculum: string;
  mobile_number: string;
  location: string;
  subjects_required: string[];
  learning_mode: string;
  status?: RegistrationStatus;
  created_at?: string;
}

export interface Review {
  id?: string;
  name: string;
  role: 'Parent' | 'Student' | 'Tutor';
  rating: number;
  feedback: string;
  status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status?: 'unread' | 'read';
  created_at?: string;
}

export interface WebsiteSettings {
  social_links: {
    whatsapp: string;
    instagram: string;
    linkedin: string;
  };
  google_maps: {
    embed_url: string;
    directions_url: string;
  };
}

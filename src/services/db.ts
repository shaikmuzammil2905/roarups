import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  TutorRegistration,
  StudentRegistration,
  ParentRegistration,
  Review,
  ContactMessage,
  WebsiteSettings
} from '../types';

const MISSING_ENV_ERROR = "Supabase configuration missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment to submit data.";

// Default website settings fallback
const DEFAULT_SETTINGS: WebsiteSettings = {
  social_links: {
    whatsapp: 'https://wa.me/916309763394',
    instagram: '',
    linkedin: '',
  },
  google_maps: {
    embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.358509893907!2d78.388889!3d17.491667!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI5JzMwLjAiTiA3OMKwMjMnMjA4IkU!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin',
    directions_url: 'https://maps.google.com/?q=Road+No.+5,+IDPL+Colony,+Vasanth+Nagar,+JNTU,+Hyderabad,+Telangana+500072',
  }
};

export async function submitTutorRegistration(data: TutorRegistration) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: MISSING_ENV_ERROR };
  }

  try {
    const { error } = await supabase.from('tutor_registrations').insert([
      {
        user_id: data.user_id || null,
        full_name: data.full_name,
        mobile_number: data.mobile_number,
        qualification: data.qualification,
        gender: data.gender,
        subjects: data.subjects,
        classes: data.classes,
        curriculum: data.curriculum,
        teaching_experience: data.teaching_experience,
        preferred_teaching_mode: data.preferred_teaching_mode,
        location: data.location,
        aadhaar_file_path: data.aadhaar_file_path || null,
        status: 'pending'
      }
    ]);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to submit tutor registration" };
  }
}

export async function submitStudentRegistration(data: StudentRegistration) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: MISSING_ENV_ERROR };
  }

  try {
    const { error } = await supabase.from('student_registrations').insert([
      {
        user_id: data.user_id || null,
        student_name: data.student_name,
        mobile_number: data.mobile_number,
        class_grade: data.class_grade,
        curriculum: data.curriculum,
        subjects_required: data.subjects_required,
        learning_mode: data.learning_mode,
        location: data.location,
        parent_name: data.parent_name,
        parent_mobile: data.parent_mobile,
        status: 'pending'
      }
    ]);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to submit student registration" };
  }
}

export async function submitParentRegistration(data: ParentRegistration) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: MISSING_ENV_ERROR };
  }

  try {
    const { error } = await supabase.from('parent_registrations').insert([
      {
        user_id: data.user_id || null,
        parent_name: data.parent_name,
        student_name: data.student_name,
        class_grade: data.class_grade,
        curriculum: data.curriculum,
        mobile_number: data.mobile_number,
        location: data.location,
        subjects_required: data.subjects_required,
        learning_mode: data.learning_mode,
        status: 'pending'
      }
    ]);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to submit parent registration" };
  }
}

export async function submitReview(data: Review) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: MISSING_ENV_ERROR };
  }

  try {
    const { error } = await supabase.from('reviews').insert([
      {
        name: data.name,
        role: data.role,
        rating: data.rating,
        feedback: data.feedback,
        status: 'pending' // Admin approval workflow
      }
    ]);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to submit review" };
  }
}

export async function fetchApprovedReviews(): Promise<Review[]> {
  if (!isSupabaseConfigured || !supabase) {
    // Return sample seed reviews if Supabase is unconfigured so wall displays clean initial guidance
    return [
      { id: '1', name: 'Ramesh Kumar', role: 'Parent', rating: 5, feedback: 'RoarUps helped my son improve his CBSE 10th grade Mathematics score significantly. Excellent individual focus!', status: 'approved' },
      { id: '2', name: 'Priya Sharma', role: 'Student', rating: 5, feedback: 'The home tuition tutors are very patient and explain complex Science concepts with real-world examples.', status: 'approved' },
      { id: '3', name: 'Srinivas Rao', role: 'Parent', rating: 5, feedback: 'Found the best physics tutor for my daughter’s Intermediate exam preparation. Very punctual and dedicated.', status: 'approved' }
    ];
  }

  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return [];
  }
}

export async function submitContactMessage(data: ContactMessage) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: MISSING_ENV_ERROR };
  }

  try {
    const { error } = await supabase.from('contact_messages').insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        status: 'unread'
      }
    ]);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to send contact message" };
  }
}

export async function fetchWebsiteSettings(): Promise<WebsiteSettings> {
  if (!isSupabaseConfigured || !supabase) {
    return DEFAULT_SETTINGS;
  }

  try {
    const { data, error } = await supabase.from('website_settings').select('*');
    if (error || !data) return DEFAULT_SETTINGS;

    const settings = { ...DEFAULT_SETTINGS };
    data.forEach((item) => {
      if (item.key === 'social_links') settings.social_links = item.value;
      if (item.key === 'google_maps') settings.google_maps = item.value;
    });

    return settings;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

// Secure Aadhaar Document Upload (Private Bucket)
export async function uploadAadhaarDocument(file: File, userId: string): Promise<{ success: boolean; filePath?: string; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: MISSING_ENV_ERROR };
  }

  try {
    const fileExt = file.name.split('.').pop();
    const filePath = `private_aadhaar/${userId}_${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('tutor-aadhaar-docs')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;
    return { success: true, filePath };
  } catch (err: any) {
    return { success: false, error: err.message || "Aadhaar upload failed" };
  }
}

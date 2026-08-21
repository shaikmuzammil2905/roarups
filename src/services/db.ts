import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  TutorRegistration,
  StudentRegistration,
  ParentRegistration,
  Review,
  ContactMessage,
  WebsiteSettings
} from '../types';

export const PRIMARY_WHATSAPP = '6309763394';
export const SECONDARY_WHATSAPP = '9490988856';
export const OFFICIAL_EMAIL = 'Roarupstuitions@gmail.com';

export interface SubmissionResult {
  success: boolean;
  message?: string;
  error?: string;
  whatsappUrl1?: string;
  whatsappUrl2?: string;
  mailtoUrl?: string;
  formattedText?: string;
}

// Helper to construct WhatsApp and Mailto URLs
function buildDispatchUrls(subject: string, textContent: string): SubmissionResult {
  const encodedText = encodeURIComponent(textContent);
  const encodedSubject = encodeURIComponent(subject);

  const whatsappUrl1 = `https://wa.me/91${PRIMARY_WHATSAPP}?text=${encodedText}`;
  const whatsappUrl2 = `https://wa.me/91${SECONDARY_WHATSAPP}?text=${encodedText}`;
  const mailtoUrl = `mailto:${OFFICIAL_EMAIL}?subject=${encodedSubject}&body=${encodedText}`;

  return {
    success: true,
    message: 'Form submitted successfully! Sending details to WhatsApp & Email...',
    whatsappUrl1,
    whatsappUrl2,
    mailtoUrl,
    formattedText: textContent
  };
}

// Default website settings fallback
const DEFAULT_SETTINGS: WebsiteSettings = {
  social_links: {
    whatsapp: `https://wa.me/91${PRIMARY_WHATSAPP}`,
    instagram: 'https://www.instagram.com/roar_tuitions?igsh=MXgzZ2dudTJ1aGI3eQ==',
    linkedin: '',
  },
  google_maps: {
    embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.358509893907!2d78.388889!3d17.491667!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI5JzMwLjAiTiA3OMKwMjMnMjA4IkU!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin',
    directions_url: 'https://maps.google.com/?q=Road+No.+5,+IDPL+Colony,+Vasanth+Nagar,+JNTU,+Hyderabad,+Telangana+500072',
  }
};

export async function submitTutorRegistration(data: TutorRegistration): Promise<SubmissionResult> {
  const formattedText = 
`🎓 NEW TUTOR REGISTRATION - ROARUPS

👤 Full Name: ${data.full_name}
📱 Mobile Number: ${data.mobile_number}
🎓 Qualification: ${data.qualification}
🚻 Gender: ${data.gender}
⏳ Experience: ${data.teaching_experience}
📍 Location: ${data.location}
📚 Curricula: ${data.curriculum?.join(', ') || 'Not specified'}
📖 Subjects: ${data.subjects?.join(', ') || 'Not specified'}
🏫 Preferred Mode: ${data.preferred_teaching_mode}`;

  // Optional background save if Supabase exists
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('tutor_registrations').insert([{
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
        status: 'pending'
      }]);
    } catch {}
  }

  return buildDispatchUrls('New Tutor Registration - ROARUPS', formattedText);
}

export async function submitStudentRegistration(data: StudentRegistration): Promise<SubmissionResult> {
  const formattedText = 
`🎓 NEW STUDENT REGISTRATION - ROARUPS

👤 Student Name: ${data.student_name}
📱 Mobile Number: ${data.mobile_number}
🏫 Class / Grade: ${data.class_grade}
📚 Curriculum: ${data.curriculum}
📖 Preferred Mode: ${data.learning_mode}
📍 Location: ${data.location}
👨‍👩‍👧 Parent Name: ${data.parent_name || 'N/A'}
📱 Parent Mobile: ${data.parent_mobile || 'N/A'}`;

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('student_registrations').insert([{
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
      }]);
    } catch {}
  }

  return buildDispatchUrls('New Student Registration - ROARUPS', formattedText);
}

export async function submitParentRegistration(data: ParentRegistration): Promise<SubmissionResult> {
  const formattedText = 
`👨‍👩‍👧 NEW PARENT ENROLLMENT - ROARUPS

👤 Parent Name: ${data.parent_name}
🎓 Student Name: ${data.student_name}
📱 Mobile Number: ${data.mobile_number}
🏫 Class / Grade: ${data.class_grade}
📚 Curriculum: ${data.curriculum}
📍 Location: ${data.location}
📖 Preferred Mode: ${data.learning_mode}`;

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('parent_registrations').insert([{
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
      }]);
    } catch {}
  }

  return buildDispatchUrls('New Parent Registration - ROARUPS', formattedText);
}

export async function submitContactMessage(data: ContactMessage): Promise<SubmissionResult> {
  const formattedText = 
`📩 NEW INQUIRY - ROARUPS

👤 Name: ${data.name}
📱 Phone: ${data.phone}
✉️ Email: ${data.email || 'Not provided'}
💬 Message: ${data.message}`;

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('contact_messages').insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        status: 'unread'
      }]);
    } catch {}
  }

  return buildDispatchUrls(`New Contact Message from ${data.name}`, formattedText);
}

export async function submitReview(data: Review): Promise<SubmissionResult> {
  const formattedText = 
`⭐ NEW REVIEW SUBMISSION - ROARUPS

👤 Name: ${data.name}
🏷️ Role: ${data.role}
⭐ Rating: ${data.rating} / 5 Stars
💬 Feedback: ${data.feedback}`;

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('reviews').insert([{
        name: data.name,
        role: data.role,
        rating: data.rating,
        feedback: data.feedback,
        status: 'pending'
      }]);
    } catch {}
  }

  return buildDispatchUrls(`New Review from ${data.name}`, formattedText);
}

export async function fetchApprovedReviews(): Promise<Review[]> {
  if (!isSupabaseConfigured || !supabase) {
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

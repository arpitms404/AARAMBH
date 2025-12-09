export interface Department {
  id: string;
  name_en: string;
  name_hi: string;
  slug: string;
  description_en: string | null;
  description_hi: string | null;
  icon: string | null;
  image_url: string | null;
  created_at: string;
}

export interface Doctor {
  id: string;
  name: string;
  designation_en: string;
  designation_hi: string;
  department_id: string | null;
  slug: string;
  photo_url: string | null;
  education: string | null;
  experience: string | null;
  bio_en: string | null;
  bio_hi: string | null;
  languages: string[] | null;
  gender: string | null;
  opd_timings: Record<string, unknown> | null;
  is_available: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  name_en: string;
  name_hi: string;
  slug: string;
  description_en: string | null;
  description_hi: string | null;
  image_url: string | null;
  operating_hours: string | null;
  created_at: string;
}

export interface Appointment {
  id: string;
  patient_name: string;
  phone: string;
  email: string | null;
  department_id: string | null;
  doctor_id: string | null;
  appointment_date: string;
  appointment_time: string;
  status: string;
  notes: string | null;
  created_at: string;
}

export interface LabTest {
  id: string;
  test_name_en: string;
  test_name_hi: string;
  category: string | null;
  price: number | null;
  description_en: string | null;
  description_hi: string | null;
  created_at: string;
}

export interface LabBooking {
  id: string;
  patient_name: string;
  phone: string;
  email: string | null;
  address: string;
  test_ids: string[] | null;
  pickup_date: string;
  pickup_time: string;
  prescription_url: string | null;
  status: string;
  created_at: string;
}

export interface LabReport {
  id: string;
  patient_id: string;
  patient_name: string;
  phone: string;
  report_url: string;
  report_date: string;
  test_name: string | null;
  created_at: string;
}

export interface HomeCareBooking {
  id: string;
  patient_name: string;
  phone: string;
  email: string | null;
  address: string;
  service_type: string;
  visit_date: string;
  visit_time: string;
  notes: string | null;
  status: string;
  created_at: string;
}

export interface Consultation {
  id: string;
  patient_name: string;
  phone: string;
  email: string;
  department_id: string | null;
  doctor_id: string | null;
  consultation_date: string;
  consultation_time: string;
  video_link: string | null;
  status: string;
  payment_status: string;
  created_at: string;
}

export interface Blog {
  id: string;
  title_en: string;
  title_hi: string;
  slug: string;
  content_en: string;
  content_hi: string;
  excerpt_en: string | null;
  excerpt_hi: string | null;
  featured_image: string | null;
  author_id: string | null;
  department_id: string | null;
  published: boolean;
  created_at: string;
}

export interface Feedback {
  id: string;
  patient_name: string;
  email: string | null;
  rating: number;
  comment: string;
  approved: boolean;
  created_at: string;
}

export interface JobOpening {
  id: string;
  title_en: string;
  title_hi: string;
  department: string;
  description_en: string;
  description_hi: string;
  requirements_en: string | null;
  requirements_hi: string | null;
  is_active: boolean;
  created_at: string;
}

export interface JobApplication {
  id: string;
  job_id: string | null;
  applicant_name: string;
  email: string;
  phone: string;
  cv_url: string | null;
  cover_letter: string | null;
  status: string;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
}

export interface DoctorWithDepartment extends Doctor {
  department?: Department;
}

export interface BlogWithAuthor extends Blog {
  author?: Doctor;
  department?: Department;
}

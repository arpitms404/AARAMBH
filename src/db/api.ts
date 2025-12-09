import { supabase } from './supabase';
import type {
  Department,
  Doctor,
  Service,
  Appointment,
  LabTest,
  LabBooking,
  LabReport,
  HomeCareBooking,
  Consultation,
  Blog,
  Feedback,
  JobOpening,
  JobApplication,
  ContactMessage,
  DoctorWithDepartment,
  BlogWithAuthor,
} from '@/types/types';

export const api = {
  departments: {
    getAll: async (): Promise<Department[]> => {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .order('name_en', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
    getBySlug: async (slug: string): Promise<Department | null> => {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  },

  doctors: {
    getAll: async (): Promise<DoctorWithDepartment[]> => {
      const { data, error } = await supabase
        .from('doctors')
        .select('*, department:departments(*)')
        .eq('is_available', true)
        .order('name', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
    getBySlug: async (slug: string): Promise<DoctorWithDepartment | null> => {
      const { data, error } = await supabase
        .from('doctors')
        .select('*, department:departments(*)')
        .eq('slug', slug)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    getByDepartment: async (departmentId: string): Promise<Doctor[]> => {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('department_id', departmentId)
        .eq('is_available', true)
        .order('name', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
    search: async (filters: {
      department?: string;
      name?: string;
      gender?: string;
      language?: string;
    }): Promise<DoctorWithDepartment[]> => {
      let query = supabase
        .from('doctors')
        .select('*, department:departments(*)')
        .eq('is_available', true);

      if (filters.department) {
        query = query.eq('department_id', filters.department);
      }
      if (filters.name) {
        query = query.ilike('name', `%${filters.name}%`);
      }
      if (filters.gender) {
        query = query.eq('gender', filters.gender);
      }
      if (filters.language) {
        query = query.contains('languages', [filters.language]);
      }

      const { data, error } = await query.order('name', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
  },

  services: {
    getAll: async (): Promise<Service[]> => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('name_en', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
    getBySlug: async (slug: string): Promise<Service | null> => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  },

  appointments: {
    create: async (appointment: Omit<Appointment, 'id' | 'created_at' | 'status'>): Promise<Appointment> => {
      const { data, error } = await supabase
        .from('appointments')
        .insert({
          ...appointment,
          status: 'pending',
        })
        .select()
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error('Failed to create appointment');
      return data;
    },
    getAll: async (): Promise<Appointment[]> => {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: false })
        .order('id', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
    updateStatus: async (id: string, status: string): Promise<void> => {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    },
  },

  labTests: {
    getAll: async (): Promise<LabTest[]> => {
      const { data, error } = await supabase
        .from('lab_tests')
        .select('*')
        .order('test_name_en', { ascending: true })
        .order('id', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
    search: async (query: string, category?: string): Promise<LabTest[]> => {
      let dbQuery = supabase.from('lab_tests').select('*');

      if (query) {
        dbQuery = dbQuery.or(`test_name_en.ilike.%${query}%,test_name_hi.ilike.%${query}%`);
      }
      if (category) {
        dbQuery = dbQuery.eq('category', category);
      }

      const { data, error } = await dbQuery.order('test_name_en', { ascending: true }).order('id', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
  },

  labBookings: {
    create: async (booking: Omit<LabBooking, 'id' | 'created_at' | 'status'>): Promise<LabBooking> => {
      const { data, error } = await supabase
        .from('lab_bookings')
        .insert({
          ...booking,
          status: 'pending',
        })
        .select()
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error('Failed to create lab booking');
      return data;
    },
    getAll: async (): Promise<LabBooking[]> => {
      const { data, error } = await supabase
        .from('lab_bookings')
        .select('*')
        .order('pickup_date', { ascending: false })
        .order('id', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
  },

  labReports: {
    getByPatientId: async (patientId: string): Promise<LabReport[]> => {
      const { data, error } = await supabase
        .from('lab_reports')
        .select('*')
        .eq('patient_id', patientId)
        .order('report_date', { ascending: false })
        .order('id', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
    getByPhone: async (phone: string): Promise<LabReport[]> => {
      const { data, error } = await supabase
        .from('lab_reports')
        .select('*')
        .eq('phone', phone)
        .order('report_date', { ascending: false })
        .order('id', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
  },

  homeCareBookings: {
    create: async (booking: Omit<HomeCareBooking, 'id' | 'created_at' | 'status'>): Promise<HomeCareBooking> => {
      const { data, error } = await supabase
        .from('home_care_bookings')
        .insert({
          ...booking,
          status: 'pending',
        })
        .select()
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error('Failed to create home care booking');
      return data;
    },
    getAll: async (): Promise<HomeCareBooking[]> => {
      const { data, error } = await supabase
        .from('home_care_bookings')
        .select('*')
        .order('visit_date', { ascending: false })
        .order('id', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
  },

  consultations: {
    create: async (consultation: Omit<Consultation, 'id' | 'created_at' | 'status' | 'payment_status' | 'video_link'>): Promise<Consultation> => {
      const { data, error } = await supabase
        .from('consultations')
        .insert({
          ...consultation,
          status: 'pending',
          payment_status: 'pending',
        })
        .select()
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error('Failed to create consultation');
      return data;
    },
    getAll: async (): Promise<Consultation[]> => {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('consultation_date', { ascending: false })
        .order('id', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
  },

  blogs: {
    getAll: async (published = true): Promise<BlogWithAuthor[]> => {
      let query = supabase
        .from('blogs')
        .select('*, author:doctors(*), department:departments(*)');

      if (published) {
        query = query.eq('published', true);
      }

      const { data, error } = await query.order('created_at', { ascending: false }).order('id', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
    getBySlug: async (slug: string): Promise<BlogWithAuthor | null> => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*, author:doctors(*), department:departments(*)')
        .eq('slug', slug)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    getByDepartment: async (departmentId: string): Promise<BlogWithAuthor[]> => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*, author:doctors(*), department:departments(*)')
        .eq('department_id', departmentId)
        .eq('published', true)
        .order('created_at', { ascending: false })
        .order('id', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
  },

  feedback: {
    create: async (feedback: Omit<Feedback, 'id' | 'created_at' | 'approved'>): Promise<Feedback> => {
      const { data, error } = await supabase
        .from('feedback')
        .insert({
          ...feedback,
          approved: false,
        })
        .select()
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error('Failed to create feedback');
      return data;
    },
    getApproved: async (): Promise<Feedback[]> => {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .order('id', { ascending: true })
        .limit(10);
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
    getAll: async (): Promise<Feedback[]> => {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false })
        .order('id', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
  },

  jobOpenings: {
    getActive: async (): Promise<JobOpening[]> => {
      const { data, error } = await supabase
        .from('job_openings')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .order('id', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
    getAll: async (): Promise<JobOpening[]> => {
      const { data, error } = await supabase
        .from('job_openings')
        .select('*')
        .order('created_at', { ascending: false })
        .order('id', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
  },

  jobApplications: {
    create: async (application: Omit<JobApplication, 'id' | 'created_at' | 'status'>): Promise<JobApplication> => {
      const { data, error } = await supabase
        .from('job_applications')
        .insert({
          ...application,
          status: 'pending',
        })
        .select()
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error('Failed to create job application');
      return data;
    },
    getAll: async (): Promise<JobApplication[]> => {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false })
        .order('id', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
  },

  contactMessages: {
    create: async (message: Omit<ContactMessage, 'id' | 'created_at' | 'status'>): Promise<ContactMessage> => {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert({
          ...message,
          status: 'new',
        })
        .select()
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error('Failed to create contact message');
      return data;
    },
    getAll: async (): Promise<ContactMessage[]> => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .order('id', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },
  },
};

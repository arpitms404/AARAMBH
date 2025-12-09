/*
# Aarambh Hospital Database Schema

## 1. Overview
This migration creates the complete database structure for Aarambh Heart & Multi-Speciality Hospital website.

## 2. Tables

### 2.1 Departments
- `id` (uuid, primary key)
- `name_en` (text, English name)
- `name_hi` (text, Hindi name)
- `slug` (text, unique URL slug)
- `description_en` (text)
- `description_hi` (text)
- `icon` (text, icon identifier)
- `image_url` (text)
- `created_at` (timestamptz)

### 2.2 Doctors
- `id` (uuid, primary key)
- `name` (text)
- `designation_en` (text)
- `designation_hi` (text)
- `department_id` (uuid, references departments)
- `slug` (text, unique)
- `photo_url` (text)
- `education` (text)
- `experience` (text)
- `bio_en` (text)
- `bio_hi` (text)
- `languages` (text array)
- `gender` (text)
- `opd_timings` (jsonb)
- `is_available` (boolean)
- `created_at` (timestamptz)

### 2.3 Services
- `id` (uuid, primary key)
- `name_en` (text)
- `name_hi` (text)
- `slug` (text, unique)
- `description_en` (text)
- `description_hi` (text)
- `image_url` (text)
- `operating_hours` (text)
- `created_at` (timestamptz)

### 2.4 Appointments
- `id` (uuid, primary key)
- `patient_name` (text)
- `phone` (text)
- `email` (text)
- `department_id` (uuid)
- `doctor_id` (uuid)
- `appointment_date` (date)
- `appointment_time` (text)
- `status` (text: pending, confirmed, completed, cancelled)
- `notes` (text)
- `created_at` (timestamptz)

### 2.5 Lab Tests
- `id` (uuid, primary key)
- `test_name_en` (text)
- `test_name_hi` (text)
- `category` (text)
- `price` (numeric)
- `description_en` (text)
- `description_hi` (text)
- `created_at` (timestamptz)

### 2.6 Lab Bookings
- `id` (uuid, primary key)
- `patient_name` (text)
- `phone` (text)
- `email` (text)
- `address` (text)
- `test_ids` (uuid array)
- `pickup_date` (date)
- `pickup_time` (text)
- `prescription_url` (text)
- `status` (text)
- `created_at` (timestamptz)

### 2.7 Lab Reports
- `id` (uuid, primary key)
- `patient_id` (text)
- `patient_name` (text)
- `phone` (text)
- `report_url` (text)
- `report_date` (date)
- `test_name` (text)
- `created_at` (timestamptz)

### 2.8 Home Care Bookings
- `id` (uuid, primary key)
- `patient_name` (text)
- `phone` (text)
- `email` (text)
- `address` (text)
- `service_type` (text)
- `visit_date` (date)
- `visit_time` (text)
- `notes` (text)
- `status` (text)
- `created_at` (timestamptz)

### 2.9 Consultations
- `id` (uuid, primary key)
- `patient_name` (text)
- `phone` (text)
- `email` (text)
- `department_id` (uuid)
- `doctor_id` (uuid)
- `consultation_date` (date)
- `consultation_time` (text)
- `video_link` (text)
- `status` (text)
- `payment_status` (text)
- `created_at` (timestamptz)

### 2.10 Blogs
- `id` (uuid, primary key)
- `title_en` (text)
- `title_hi` (text)
- `slug` (text, unique)
- `content_en` (text)
- `content_hi` (text)
- `excerpt_en` (text)
- `excerpt_hi` (text)
- `featured_image` (text)
- `author_id` (uuid, references doctors)
- `department_id` (uuid)
- `published` (boolean)
- `created_at` (timestamptz)

### 2.11 Feedback
- `id` (uuid, primary key)
- `patient_name` (text)
- `email` (text)
- `rating` (integer)
- `comment` (text)
- `approved` (boolean)
- `created_at` (timestamptz)

### 2.12 Job Openings
- `id` (uuid, primary key)
- `title_en` (text)
- `title_hi` (text)
- `department` (text)
- `description_en` (text)
- `description_hi` (text)
- `requirements_en` (text)
- `requirements_hi` (text)
- `is_active` (boolean)
- `created_at` (timestamptz)

### 2.13 Job Applications
- `id` (uuid, primary key)
- `job_id` (uuid, references job_openings)
- `applicant_name` (text)
- `email` (text)
- `phone` (text)
- `cv_url` (text)
- `cover_letter` (text)
- `status` (text)
- `created_at` (timestamptz)

### 2.14 Contact Messages
- `id` (uuid, primary key)
- `name` (text)
- `email` (text)
- `phone` (text)
- `subject` (text)
- `message` (text)
- `status` (text)
- `created_at` (timestamptz)

## 3. Security
- All tables are public (no RLS) as per requirements
- Admin access controlled through application layer
*/

-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_hi text NOT NULL,
  slug text UNIQUE NOT NULL,
  description_en text,
  description_hi text,
  icon text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  designation_en text NOT NULL,
  designation_hi text NOT NULL,
  department_id uuid REFERENCES departments(id),
  slug text UNIQUE NOT NULL,
  photo_url text,
  education text,
  experience text,
  bio_en text,
  bio_hi text,
  languages text[],
  gender text,
  opd_timings jsonb,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_hi text NOT NULL,
  slug text UNIQUE NOT NULL,
  description_en text,
  description_hi text,
  image_url text,
  operating_hours text,
  created_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  phone text NOT NULL,
  email text,
  department_id uuid REFERENCES departments(id),
  doctor_id uuid REFERENCES doctors(id),
  appointment_date date NOT NULL,
  appointment_time text NOT NULL,
  status text DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create lab_tests table
CREATE TABLE IF NOT EXISTS lab_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_name_en text NOT NULL,
  test_name_hi text NOT NULL,
  category text,
  price numeric,
  description_en text,
  description_hi text,
  created_at timestamptz DEFAULT now()
);

-- Create lab_bookings table
CREATE TABLE IF NOT EXISTS lab_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  phone text NOT NULL,
  email text,
  address text NOT NULL,
  test_ids uuid[],
  pickup_date date NOT NULL,
  pickup_time text NOT NULL,
  prescription_url text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create lab_reports table
CREATE TABLE IF NOT EXISTS lab_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id text NOT NULL,
  patient_name text NOT NULL,
  phone text NOT NULL,
  report_url text NOT NULL,
  report_date date NOT NULL,
  test_name text,
  created_at timestamptz DEFAULT now()
);

-- Create home_care_bookings table
CREATE TABLE IF NOT EXISTS home_care_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  phone text NOT NULL,
  email text,
  address text NOT NULL,
  service_type text NOT NULL,
  visit_date date NOT NULL,
  visit_time text NOT NULL,
  notes text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  department_id uuid REFERENCES departments(id),
  doctor_id uuid REFERENCES doctors(id),
  consultation_date date NOT NULL,
  consultation_time text NOT NULL,
  video_link text,
  status text DEFAULT 'pending',
  payment_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_hi text NOT NULL,
  slug text UNIQUE NOT NULL,
  content_en text NOT NULL,
  content_hi text NOT NULL,
  excerpt_en text,
  excerpt_hi text,
  featured_image text,
  author_id uuid REFERENCES doctors(id),
  department_id uuid REFERENCES departments(id),
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  email text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create job_openings table
CREATE TABLE IF NOT EXISTS job_openings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_hi text NOT NULL,
  department text NOT NULL,
  description_en text NOT NULL,
  description_hi text NOT NULL,
  requirements_en text,
  requirements_hi text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES job_openings(id),
  applicant_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  cv_url text,
  cover_letter text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_doctors_department ON doctors(department_id);
CREATE INDEX IF NOT EXISTS idx_doctors_slug ON doctors(slug);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_feedback_approved ON feedback(approved);
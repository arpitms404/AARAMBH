# Aarambh Heart & Multi-Speciality Hospital Website Requirements Document

## 1. Website Overview

### 1.1 Website Name
Aarambh Heart & Multi-Speciality Hospital Official Website

### 1.2 Website Description
A comprehensive, premium, bilingual (English + Hindi) hospital website providing complete information about medical services, doctor profiles, online appointment booking, lab services, and patient care facilities. The website serves as the primary digital platform for patient engagement, information dissemination, and service booking.

### 1.3 Hospital Information
- **Name:** Aarambh Heart & Multi-Speciality Hospital
- **Location:** 4/93, Vineet Khand-4, Gomti Nagar, Lucknow (U.P.) - 226010
- **Logo:** Triangle with heartbeat-style'A' design (WhatsApp Image 2025-12-02 at 14.29.13.jpeg)
\n## 2. Website Structure and Core Functions

### 2.1 Home Page (/)
- Banner slider featuring announcements, 24x7 emergency services, appointment booking, and new facilities
- Quick action CTAs: Find Doctor, Book Appointment, Online Consult, Emergency\n- Key departments carousel
- Why Aarambh section highlighting USPs and accreditations
- Patient testimonials and awards showcase
- QR code for mobile navigation and embedded Google Map

### 2.2 About Us (/about)\n- Hospital overview and history
- Vision and mission statements
- Leadership team profiles with photos
- Virtual infrastructure tour
- Awards and certifications display (NABH, ISO, etc.)

### 2.3 Hospital Location (/hospital)\n- Building photos and facility images
- Interactive map integration
- Bed count and infrastructure details
- Linked services and available doctors
- Emergency contact information

### 2.4 Specialities Section (/our-specialities)
Each specialty has a dedicated subpage with:
- Specialty overview
- Common treatments and procedures
- Advanced technologies used
- Doctor cards with profile links
- FAQs section
- Book appointment CTA

**Specialities List:**
- Cardiology (/our-specialities/cardiology)
- Cardiac Surgery\n- Neurology
- Neurosurgery
- Pulmonology
- Orthopaedics
- Gastroenterology
- Nephrology
- Urology
- ENT
- Ophthalmology
- Gynaecology
- Pediatrics
- Neonatology
- General Surgery
- Spine & Pain Management
- Plastic & Cosmetic Surgery
- Oncology (future expansion)

### 2.5 Support Services (/services)
Each service has a dedicated page including:
- Service description
- Operating hours
- Equipment and facility images
- Booking or contact CTA
- Relevant certifications
\n**Services List:**
- Radiodiagnosis (/services/radiodiagnosis)\n- Pathology & Blood Bank
- 24x7 Pharmacy
- Modular Operation Theatre
- CathLab
- Emergency & ICU Services
- 24x7 Ambulance Booking
- Physiotherapy & Rehabilitation
- Day Care Services
\n### 2.6 Doctor System\n\n**Find a Doctor Page(/find-a-doctor)**
- Search and filter by: Department, Name, Gender, Language\n- Doctor cards displaying: Photo, Name, Designation, Specialty\n- View Profile and Book Appointment buttons
\n**Doctor Profile Pages (/doctor/[slug])**
- Complete biography\n- Education and experience details
- OPD timings\n- Services offered
- Book Now CTA
\n### 2.7 Booking Systems

**Book Appointment (/book-appointment)**
- Multi-step form with fields: Name, Phone, Email, Department, Doctor, Date, Time
- Payment integration (Razorpay/Stripe)
- Confirmation page with booking details
- Automated SMS and email notifications
\n**Online Video Consultation (/online-consultation)**
- Department selection
- Doctor selection
- Time slot booking
- Payment processing
- Video link generation (Zoom/WhatsApp/Google Meet support)
- Confirmation and reminder system

### 2.8 Aarambh Labs(/labs)
- Searchable test catalogue with filters
- Book sample pickup form
- Prescription upload functionality
- Patient report access portal (login via Patient ID or Phone OTP)
- NABL and ISO accreditation display

### 2.9 Aarambh@Home (/homecare)
- Home care services: Nursing, Elderly Care, Post-surgical Care, Physiotherapy
- Book home visit form with time-slot selection
- Optional WhatsApp integration\n\n### 2.10 International Patients (/international)\n- Travel and accommodation support information
- Visa and documentation guidance
- Treatment cost estimator
- Dedicated enquiry form
- International patient FAQs

### 2.11 Emergency Services (/emergency)
- Floating emergency call button (visible on all pages)
- Emergency care instructions
- Ambulance booking form
- 24x7 hotline numbers

### 2.12 Contact Us (/contact)
- Complete address details
- Embedded Google Map
- QR code for mobile navigation
- Contact form\n- Floating WhatsApp icon

### 2.13 Careers (/careers)
- Current job openings with department filters
- Job cards with 'Apply Now' buttons
- CV upload form
- Hospital culture and team gallery

### 2.14 Feedback (/feedback)
- Patient feedback form with star rating system
- Comment section
- Display approved feedback in testimonials section
\n### 2.15 Blogs (/blogs)
- Filter by department and author
- Blog cards with featured images and summaries
- Full blog post pages
- Author profile links (doctors)\n
### 2.16 Gallery (/gallery)
- Categorized image folders: OT, ICU, Diagnostics, Lobby, OPD\n- Modal zoom functionality
\n### 2.17 Patient Guide (/patient-guide)
- Admission process information
- Insurance assistance details
- What to expect during hospital visit
- Downloadable PDF guides

## 3. Admin Panel Features
- Dashboard with summary statistics
- Doctor management (add/edit profiles)
- Appointment calendar view
- Lab request viewer
- Patient report upload system (PDF/image)
- Blog content manager
- Feedback moderation tools

## 4. Design Style\n
### 4.1 Color Scheme
- Primary Red: #D71920\n- Primary Blue: #007BBD
- Background White: #FFFFFF
- Clean, clinical, and premium aesthetic

### 4.2 Typography
- Font families: Poppins or Montserrat
- Clear hierarchy with readable sizes
\n### 4.3 Layout and Visual Elements
- Sticky header with smart CTA buttons
- Bilingual toggle (English↔ Hindi) in top-right corner
- Card-based layout for services and doctors
- Comprehensive footer with sitemap, emergency links, and social media icons
- Lazy loading for optimized image performance
- Modal overlays for forms and image galleries

### 4.4 Responsive Design
- Fully responsive across mobile, tablet, and desktop devices
- Touch-friendly interface elements
- Optimized navigation for smaller screens

### 4.5 Accessibility\n- WCAG compliance standards
- Alt tags on all images
- Keyboard navigation support
- Screen reader compatibility\n\n## 5. Technical Requirements

### 5.1 Security
- HTTPS SSL certificate
- Google reCAPTCHA on forms
- OTP and email verification for bookings and report access
- Secure payment gateway integration

### 5.2 Performance
- PageSpeed optimization
- Image compression and lazy loading
- Efficient caching strategies
- Schema markup for SEO

### 5.3 Recommended Tech Stack
- **Frontend:** React.js/Next.js or Tailwind CSS + HTML\n- **Backend:** Node.js + Express or Laravel
- **CMS:** WordPress or Headless CMS (Strapi)
- **Database:** MySQL or MongoDB
- **Hosting:** AWS, Hostinger, or Netlify
- **Payment Gateways:** Razorpay, PayU, Stripe
\n### 5.4 Integrations
- Google Maps API\n- Video conferencing platforms (Zoom/Google Meet)
- SMS gateway for notifications
- Email service provider
- Payment gateway APIs
- WhatsApp Business API (optional)

## 6. Multilingual Support
- Complete English and Hindi language support
- Language toggle switch in header
- All content, forms, and notifications available in both languages

## 7. Reference Images
- Department and Services Overview: WhatsApp Image 2025-12-02 at 14.32.14.jpeg
- Hospital Logo: WhatsApp Image 2025-12-02 at 14.29.13.jpeg
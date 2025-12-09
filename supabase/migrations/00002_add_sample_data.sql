/*
# Add Sample Data for Aarambh Hospital

This migration adds initial sample data for departments, doctors, services, lab tests, and other essential information to demonstrate the hospital website functionality.

## Data Added:
1. Departments (18 specialties)
2. Sample Doctors (10 doctors across departments)
3. Services (9 support services)
4. Lab Tests (20 common tests)
5. Sample Feedback (3 approved testimonials)

Note: This is demonstration data. The admin can modify or delete this data through the admin panel.
*/

-- Insert Departments
INSERT INTO departments (name_en, name_hi, slug, description_en, description_hi, icon) VALUES
('Cardiology', 'कार्डियोलॉजी', 'cardiology', 'Comprehensive heart care and treatment', 'व्यापक हृदय देखभाल और उपचार', 'heart'),
('Cardiac Surgery', 'कार्डियक सर्जरी', 'cardiac-surgery', 'Advanced cardiac surgical procedures', 'उन्नत कार्डियक सर्जिकल प्रक्रियाएं', 'heart-pulse'),
('Neurology', 'न्यूरोलॉजी', 'neurology', 'Brain and nervous system care', 'मस्तिष्क और तंत्रिका तंत्र देखभाल', 'brain'),
('Neurosurgery', 'न्यूरोसर्जरी', 'neurosurgery', 'Surgical treatment of neurological conditions', 'न्यूरोलॉजिकल स्थितियों का सर्जिकल उपचार', 'brain'),
('Pulmonology', 'पल्मोनोलॉजी', 'pulmonology', 'Respiratory and lung care', 'श्वसन और फेफड़े की देखभाल', 'wind'),
('Orthopedics', 'ऑर्थोपेडिक्स', 'orthopedics', 'Bone and joint treatment', 'हड्डी और जोड़ों का उपचार', 'bone'),
('Gastroenterology', 'गैस्ट्रोएंटरोलॉजी', 'gastroenterology', 'Digestive system care', 'पाचन तंत्र देखभाल', 'activity'),
('Nephrology', 'नेफ्रोलॉजी', 'nephrology', 'Kidney care and treatment', 'गुर्दे की देखभाल और उपचार', 'droplet'),
('Urology', 'यूरोलॉजी', 'urology', 'Urinary system treatment', 'मूत्र प्रणाली उपचार', 'droplet'),
('ENT', 'ईएनटी', 'ent', 'Ear, Nose, and Throat care', 'कान, नाक और गले की देखभाल', 'ear'),
('Ophthalmology', 'नेत्र विज्ञान', 'ophthalmology', 'Eye care and vision treatment', 'नेत्र देखभाल और दृष्टि उपचार', 'eye'),
('Gynaecology', 'स्त्री रोग', 'gynaecology', 'Women''s health and reproductive care', 'महिला स्वास्थ्य और प्रजनन देखभाल', 'baby'),
('Pediatrics', 'बाल रोग', 'pediatrics', 'Child healthcare', 'बाल स्वास्थ्य देखभाल', 'baby'),
('Neonatology', 'नवजात विज्ञान', 'neonatology', 'Newborn care', 'नवजात देखभाल', 'baby'),
('General Surgery', 'सामान्य सर्जरी', 'general-surgery', 'Comprehensive surgical care', 'व्यापक सर्जिकल देखभाल', 'activity'),
('Spine & Pain Management', 'स्पाइन और दर्द प्रबंधन', 'spine-pain-management', 'Spine care and pain relief', 'रीढ़ की देखभाल और दर्द से राहत', 'zap'),
('Plastic & Cosmetic Surgery', 'प्लास्टिक और कॉस्मेटिक सर्जरी', 'plastic-cosmetic-surgery', 'Reconstructive and aesthetic surgery', 'पुनर्निर्माण और सौंदर्य सर्जरी', 'sparkles'),
('Oncology', 'ऑन्कोलॉजी', 'oncology', 'Cancer care and treatment', 'कैंसर देखभाल और उपचार', 'shield');

-- Insert Sample Doctors
INSERT INTO doctors (name, designation_en, designation_hi, department_id, slug, education, experience, bio_en, bio_hi, languages, gender, is_available) VALUES
('Dr. Rajesh Kumar', 'Senior Cardiologist', 'वरिष्ठ हृदय रोग विशेषज्ञ', (SELECT id FROM departments WHERE slug = 'cardiology'), 'dr-rajesh-kumar', 'MBBS, MD (Cardiology), DM', '15+ years', 'Expert in interventional cardiology and heart disease management', 'इंटरवेंशनल कार्डियोलॉजी और हृदय रोग प्रबंधन में विशेषज्ञ', ARRAY['English', 'Hindi'], 'male', true),
('Dr. Priya Sharma', 'Consultant Neurologist', 'सलाहकार न्यूरोलॉजिस्ट', (SELECT id FROM departments WHERE slug = 'neurology'), 'dr-priya-sharma', 'MBBS, MD (Neurology)', '12+ years', 'Specialized in stroke management and neurological disorders', 'स्ट्रोक प्रबंधन और न्यूरोलॉजिकल विकारों में विशेषज्ञ', ARRAY['English', 'Hindi'], 'female', true),
('Dr. Amit Verma', 'Senior Orthopedic Surgeon', 'वरिष्ठ ऑर्थोपेडिक सर्जन', (SELECT id FROM departments WHERE slug = 'orthopedics'), 'dr-amit-verma', 'MBBS, MS (Orthopedics)', '18+ years', 'Expert in joint replacement and sports injuries', 'जोड़ प्रतिस्थापन और खेल चोटों में विशेषज्ञ', ARRAY['English', 'Hindi'], 'male', true),
('Dr. Sunita Gupta', 'Consultant Gynaecologist', 'सलाहकार स्त्री रोग विशेषज्ञ', (SELECT id FROM departments WHERE slug = 'gynaecology'), 'dr-sunita-gupta', 'MBBS, MD (Obstetrics & Gynaecology)', '14+ years', 'Specialized in high-risk pregnancy and women''s health', 'उच्च जोखिम गर्भावस्था और महिला स्वास्थ्य में विशेषज्ञ', ARRAY['English', 'Hindi'], 'female', true),
('Dr. Vikram Singh', 'Senior Pediatrician', 'वरिष्ठ बाल रोग विशेषज्ञ', (SELECT id FROM departments WHERE slug = 'pediatrics'), 'dr-vikram-singh', 'MBBS, MD (Pediatrics)', '16+ years', 'Expert in child healthcare and vaccination', 'बाल स्वास्थ्य देखभाल और टीकाकरण में विशेषज्ञ', ARRAY['English', 'Hindi'], 'male', true),
('Dr. Anjali Mishra', 'Consultant Ophthalmologist', 'सलाहकार नेत्र रोग विशेषज्ञ', (SELECT id FROM departments WHERE slug = 'ophthalmology'), 'dr-anjali-mishra', 'MBBS, MS (Ophthalmology)', '10+ years', 'Specialized in cataract surgery and retinal disorders', 'मोतियाबिंद सर्जरी और रेटिनल विकारों में विशेषज्ञ', ARRAY['English', 'Hindi'], 'female', true),
('Dr. Sanjay Tiwari', 'Senior Gastroenterologist', 'वरिष्ठ गैस्ट्रोएंटेरोलॉजिस्ट', (SELECT id FROM departments WHERE slug = 'gastroenterology'), 'dr-sanjay-tiwari', 'MBBS, MD, DM (Gastroenterology)', '13+ years', 'Expert in endoscopy and liver diseases', 'एंडोस्कोपी और यकृत रोगों में विशेषज्ञ', ARRAY['English', 'Hindi'], 'male', true),
('Dr. Meera Patel', 'Consultant ENT Specialist', 'सलाहकार ईएनटी विशेषज्ञ', (SELECT id FROM departments WHERE slug = 'ent'), 'dr-meera-patel', 'MBBS, MS (ENT)', '11+ years', 'Specialized in ear, nose, and throat surgeries', 'कान, नाक और गले की सर्जरी में विशेषज्ञ', ARRAY['English', 'Hindi'], 'female', true),
('Dr. Rahul Saxena', 'Senior Urologist', 'वरिष्ठ यूरोलॉजिस्ट', (SELECT id FROM departments WHERE slug = 'urology'), 'dr-rahul-saxena', 'MBBS, MS (Urology)', '15+ years', 'Expert in kidney stone treatment and prostate care', 'किडनी स्टोन उपचार और प्रोस्टेट देखभाल में विशेषज्ञ', ARRAY['English', 'Hindi'], 'male', true),
('Dr. Kavita Rao', 'Consultant Pulmonologist', 'सलाहकार पल्मोनोलॉजिस्ट', (SELECT id FROM departments WHERE slug = 'pulmonology'), 'dr-kavita-rao', 'MBBS, MD (Pulmonology)', '12+ years', 'Specialized in asthma, COPD, and respiratory care', 'अस्थमा, सीओपीडी और श्वसन देखभाल में विशेषज्ञ', ARRAY['English', 'Hindi'], 'female', true);

-- Insert Services
INSERT INTO services (name_en, name_hi, slug, description_en, description_hi, operating_hours) VALUES
('Radiodiagnosis', 'रेडियोडायग्नोसिस', 'radiodiagnosis', 'Advanced imaging services including X-Ray, CT, MRI, and Ultrasound', 'एक्स-रे, सीटी, एमआरआई और अल्ट्रासाउंड सहित उन्नत इमेजिंग सेवाएं', '24/7'),
('Pathology & Blood Bank', 'पैथोलॉजी और ब्लड बैंक', 'pathology-blood-bank', 'Comprehensive laboratory services and blood banking', 'व्यापक प्रयोगशाला सेवाएं और रक्त बैंकिंग', '24/7'),
('24x7 Pharmacy', '24x7 फार्मेसी', 'pharmacy', 'Round-the-clock pharmacy services', 'चौबीसों घंटे फार्मेसी सेवाएं', '24/7'),
('Modular Operation Theatre', 'मॉड्यूलर ऑपरेशन थिएटर', 'operation-theatre', 'State-of-the-art surgical facilities', 'अत्याधुनिक सर्जिकल सुविधाएं', '24/7'),
('CathLab', 'कैथलैब', 'cathlab', 'Advanced cardiac catheterization laboratory', 'उन्नत कार्डियक कैथेटराइजेशन प्रयोगशाला', '24/7'),
('Emergency & ICU Services', 'आपातकालीन और आईसीयू सेवाएं', 'emergency-icu', 'Critical care and emergency services', 'गंभीर देखभाल और आपातकालीन सेवाएं', '24/7'),
('24x7 Ambulance', '24x7 एम्बुलेंस', 'ambulance', 'Emergency ambulance services', 'आपातकालीन एम्बुलेंस सेवाएं', '24/7'),
('Physiotherapy & Rehabilitation', 'फिजियोथेरेपी और पुनर्वास', 'physiotherapy', 'Comprehensive rehabilitation services', 'व्यापक पुनर्वास सेवाएं', '9:00 AM - 6:00 PM'),
('Day Care Services', 'डे केयर सेवाएं', 'day-care', 'Short-stay procedures and treatments', 'लघु-प्रवास प्रक्रियाएं और उपचार', '9:00 AM - 6:00 PM');

-- Insert Lab Tests
INSERT INTO lab_tests (test_name_en, test_name_hi, category, price, description_en, description_hi) VALUES
('Complete Blood Count (CBC)', 'पूर्ण रक्त गणना (सीबीसी)', 'Hematology', 300, 'Comprehensive blood cell analysis', 'व्यापक रक्त कोशिका विश्लेषण'),
('Lipid Profile', 'लिपिड प्रोफाइल', 'Biochemistry', 800, 'Cholesterol and triglycerides test', 'कोलेस्ट्रॉल और ट्राइग्लिसराइड्स परीक्षण'),
('Liver Function Test (LFT)', 'लिवर फंक्शन टेस्ट (एलएफटी)', 'Biochemistry', 600, 'Liver health assessment', 'यकृत स्वास्थ्य मूल्यांकन'),
('Kidney Function Test (KFT)', 'किडनी फंक्शन टेस्ट (केएफटी)', 'Biochemistry', 600, 'Kidney health assessment', 'गुर्दे का स्वास्थ्य मूल्यांकन'),
('Thyroid Profile', 'थायराइड प्रोफाइल', 'Endocrinology', 700, 'Thyroid hormone levels', 'थायराइड हार्मोन स्तर'),
('HbA1c (Diabetes)', 'एचबीए1सी (मधुमेह)', 'Biochemistry', 500, 'Long-term blood sugar control', 'दीर्घकालिक रक्त शर्करा नियंत्रण'),
('Vitamin D', 'विटामिन डी', 'Biochemistry', 1200, 'Vitamin D levels', 'विटामिन डी स्तर'),
('Vitamin B12', 'विटामिन बी12', 'Biochemistry', 900, 'Vitamin B12 levels', 'विटामिन बी12 स्तर'),
('ECG', 'ईसीजी', 'Cardiology', 200, 'Heart electrical activity', 'हृदय विद्युत गतिविधि'),
('Chest X-Ray', 'चेस्ट एक्स-रे', 'Radiology', 400, 'Chest imaging', 'छाती इमेजिंग'),
('Ultrasound Abdomen', 'अल्ट्रासाउंड पेट', 'Radiology', 1000, 'Abdominal organ imaging', 'पेट के अंग इमेजिंग'),
('Blood Sugar Fasting', 'ब्लड शुगर फास्टिंग', 'Biochemistry', 100, 'Fasting glucose test', 'उपवास ग्लूकोज परीक्षण'),
('Blood Sugar PP', 'ब्लड शुगर पीपी', 'Biochemistry', 100, 'Post-meal glucose test', 'भोजन के बाद ग्लूकोज परीक्षण'),
('Urine Routine', 'यूरिन रूटीन', 'Pathology', 200, 'Urine analysis', 'मूत्र विश्लेषण'),
('Stool Routine', 'स्टूल रूटीन', 'Pathology', 200, 'Stool analysis', 'मल विश्लेषण'),
('ESR', 'ईएसआर', 'Hematology', 150, 'Inflammation marker', 'सूजन मार्कर'),
('CRP', 'सीआरपी', 'Biochemistry', 500, 'C-reactive protein test', 'सी-रिएक्टिव प्रोटीन परीक्षण'),
('Dengue NS1 Antigen', 'डेंगू एनएस1 एंटीजन', 'Serology', 800, 'Dengue fever test', 'डेंगू बुखार परीक्षण'),
('COVID-19 RT-PCR', 'कोविड-19 आरटी-पीसीआर', 'Microbiology', 500, 'COVID-19 detection', 'कोविड-19 पहचान'),
('Blood Group & Rh Type', 'ब्लड ग्रुप और आरएच टाइप', 'Hematology', 200, 'Blood type determination', 'रक्त प्रकार निर्धारण');

-- Insert Sample Feedback
INSERT INTO feedback (patient_name, email, rating, comment, approved) VALUES
('Ramesh Kumar', 'ramesh@example.com', 5, 'Excellent care and treatment. The doctors are very professional and caring. Highly recommended!', true),
('Sunita Devi', 'sunita@example.com', 5, 'Very good hospital with modern facilities. The staff is helpful and the treatment was effective.', true),
('Anil Sharma', 'anil@example.com', 4, 'Good experience overall. The doctors explained everything clearly and the facilities are clean.', true);
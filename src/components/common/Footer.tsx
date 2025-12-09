import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name_en: 'About Us', name_hi: 'हमारे बारे में', path: '/about' },
    { name_en: 'Our Specialities', name_hi: 'हमारी विशेषताएं', path: '/our-specialities' },
    { name_en: 'Find a Doctor', name_hi: 'डॉक्टर खोजें', path: '/find-a-doctor' },
    { name_en: 'Book Appointment', name_hi: 'अपॉइंटमेंट बुक करें', path: '/book-appointment' },
    { name_en: 'Careers', name_hi: 'करियर', path: '/careers' },
    { name_en: 'Contact Us', name_hi: 'संपर्क करें', path: '/contact' },
  ];

  const services = [
    { name_en: 'Emergency Services', name_hi: 'आपातकालीन सेवाएं', path: '/emergency' },
    { name_en: 'Online Consultation', name_hi: 'ऑनलाइन परामर्श', path: '/online-consultation' },
    { name_en: 'Lab Services', name_hi: 'लैब सेवाएं', path: '/labs' },
    { name_en: 'Home Care', name_hi: 'होम केयर', path: '/homecare' },
    { name_en: 'International Patients', name_hi: 'अंतर्राष्ट्रीय रोगी', path: '/international' },
    { name_en: 'Patient Guide', name_hi: 'रोगी गाइड', path: '/patient-guide' },
  ];

  return (
    <footer className="border-t bg-muted">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {/* ---------- LOGO + DESCRIPTION ---------- */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              {/* Placeholder Logo */}
              <div className="h-12 w-12 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                Logo
              </div>

              <div>
                <h3 className="text-lg font-bold text-primary">Aarambh</h3>
                <p className="text-xs text-muted-foreground">
                  {t('Heart & Multi-Speciality Hospital', 'हार्ट एंड मल्टी-स्पेशलिटी हॉस्पिटल')}
                </p>
              </div>
            </div>

            <p className="mb-4 text-sm text-muted-foreground">
              {t(
                'Providing world-class healthcare with compassion and excellence.',
                'करुणा और उत्कृष्टता के साथ विश्व स्तरीय स्वास्थ्य सेवा प्रदान करना।'
              )}
            </p>

            {/* ---------- SOCIAL ICONS ---------- */}
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary/90"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ---------- QUICK LINKS ---------- */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              {t('Quick Links', 'त्वरित लिंक')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {t(link.name_en, link.name_hi)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- SERVICES ---------- */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              {t('Services', 'सेवाएं')}
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.path}>
                  <Link
                    to={service.path}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {t(service.name_en, service.name_hi)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- CONTACT INFO ---------- */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              {t('Contact Info', 'संपर्क जानकारी')}
            </h3>

            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>
                  {t(
                    '4/93, Vineet Khand-4, Gomti Nagar, Lucknow (U.P.) - 226010',
                    '4/93, विनीत खंड-4, गोमती नगर, लखनऊ (उ.प्र.) - 226010'
                  )}
                </span>
              </li>

              <li className="flex gap-3 text-sm text-muted-foreground">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p>+91-123-456-7890</p>
                  <p className="text-xs">
                    {t('Emergency: +91-123-456-7890', 'आपातकाल: +91-123-456-7890')}
                  </p>
                </div>
              </li>

              <li className="flex gap-3 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>info@aarambhhospital.com</span>
              </li>

              <li className="flex gap-3 text-sm text-muted-foreground">
                <Clock className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>{t('24/7 Emergency Services', '24/7 आपातकालीन सेवाएं')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------- COPYRIGHT ---------- */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Aarambh Heart & Multi-Speciality Hospital</p>
        </div>
      </div>
    </footer>
  );
}

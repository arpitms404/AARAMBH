import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Phone, Languages } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navigation = [
    { name_en: 'Home', name_hi: 'होम', path: '/' },
    { name_en: 'About Us', name_hi: 'हमारे बारे में', path: '/about' },
    { name_en: 'Specialities', name_hi: 'विशेषताएं', path: '/our-specialities' },
    { name_en: 'Services', name_hi: 'सेवाएं', path: '/services' },
    { name_en: 'Find Doctor', name_hi: 'डॉक्टर खोजें', path: '/find-a-doctor' },
    { name_en: 'Labs', name_hi: 'लैब्स', path: '/labs' },
    { name_en: 'Blogs', name_hi: 'ब्लॉग', path: '/blogs' },
    { name_en: 'Contact', name_hi: 'संपर्क', path: '/contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <>
      {/* 🔹 Top Emergency Bar */}
      <div className="bg-primary py-2 text-white">
        <div className="container flex items-center justify-between text-sm">
          <span>
            {t(
              '4/93, Vineet Khand-4, Gomti Nagar, Lucknow',
              '4/93, विनीत खंड-4, गोमती नगर, लखनऊ'
            )}
          </span>

          <a href="tel:+911234567890" className="flex items-center gap-2 hover:underline">
            <Phone className="h-4 w-4" />
            <span>{t('Emergency: +91-123-456-7890', 'आपातकाल: +91-123-456-7890')}</span>
          </a>
        </div>
      </div>

      {/* 🔹 Main Header */}
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="container flex h-20 items-center justify-between">
          
          {/* 🔹 Logo + Title */}
          <Link to="/" className="flex items-center gap-3">
            {/* Placeholder Logo */}
            <div className="h-14 w-14 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500">
              Logo
            </div>

            <div>
              <h1 className="text-xl font-bold text-primary">Aarambh</h1>
              <p className="text-xs text-muted-foreground">
                {t('Heart & Multi-Speciality Hospital', 'हार्ट एंड मल्टी-स्पेशलिटी हॉस्पिटल')}
              </p>
            </div>
          </Link>

          {/* 🔹 Desktop Navigation */}
          <nav className="hidden items-center gap-6 xl:flex">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path ? 'text-primary' : 'text-foreground'
                }`}
              >
                {t(item.name_en, item.name_hi)}
              </Link>
            ))}
          </nav>

          {/* 🔹 Right-side Buttons */}
          <div className="flex items-center gap-4">
            {/* Language Switch */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden md:flex"
            >
              <Languages className="mr-2 h-4 w-4" />
              {language === 'en' ? 'हिंदी' : 'English'}
            </Button>

            {/* Appointment Button */}
            <Button asChild className="hidden md:flex">
              <Link to="/book-appointment">
                {t('Book Appointment', 'अपॉइंटमेंट बुक करें')}
              </Link>
            </Button>

            {/* 🔹 Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="xl:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-4 py-4">
                  {/* Mobile Nav Links */}
                  {navigation.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        location.pathname === item.path ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {t(item.name_en, item.name_hi)}
                    </Link>
                  ))}

                  {/* Language Switch */}
                  <Button onClick={toggleLanguage} variant="outline" className="mt-4">
                    <Languages className="mr-2 h-4 w-4" />
                    {language === 'en' ? 'हिंदी' : 'English'}
                  </Button>

                  {/* Appointment Button */}
                  <Button asChild>
                    <Link to="/book-appointment" onClick={() => setIsOpen(false)}>
                      {t('Book Appointment', 'अपॉइंटमेंट बुक करें')}
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

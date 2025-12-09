import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/db/api';
import type { Department, Feedback } from '@/types/types';
import {
  Heart,
  Calendar,
  Video,
  Phone,
  Award,
  Users,
  Building2,
  Star,
  ArrowRight,
  Stethoscope,
  Clock,
  Shield,
} from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [testimonials, setTestimonials] = useState<Feedback[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [depts, feedback] = await Promise.all([
        api.departments.getAll(),
        api.feedback.getApproved(),
      ]);
      setDepartments(depts.slice(0, 8));
      setTestimonials(feedback);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const slides = [
    {
      title_en: '24/7 Emergency Services',
      title_hi: '24/7 आपातकालीन सेवाएं',
      desc_en: 'Round-the-clock emergency care with advanced cardiac facilities',
      desc_hi: 'उन्नत कार्डियक सुविधाओं के साथ चौबीसों घंटे आपातकालीन देखभाल',
      image: 'hero-emergency.jpg',
    },
    {
      title_en: 'Advanced Heart Care',
      title_hi: 'उन्नत हृदय देखभाल',
      desc_en: 'State-of-the-art cardiac surgery and treatment facilities',
      desc_hi: 'अत्याधुनिक कार्डियक सर्जरी और उपचार सुविधाएं',
      image: 'hero-heart.jpg',
    },
    {
      title_en: 'Book Your Appointment',
      title_hi: 'अपना अपॉइंटमेंट बुक करें',
      desc_en: 'Easy online appointment booking with our expert doctors',
      desc_hi: 'हमारे विशेषज्ञ डॉक्टरों के साथ आसान ऑनलाइन अपॉइंटमेंट बुकिंग',
      image: 'hero-appointment.jpg',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const quickActions = [
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title_en: 'Find Doctor',
      title_hi: 'डॉक्टर खोजें',
      link: '/find-a-doctor',
      color: 'bg-primary',
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title_en: 'Book Appointment',
      title_hi: 'अपॉइंटमेंट बुक करें',
      link: '/book-appointment',
      color: 'bg-secondary',
    },
    {
      icon: <Video className="h-8 w-8" />,
      title_en: 'Online Consult',
      title_hi: 'ऑनलाइन परामर्श',
      link: '/online-consultation',
      color: 'bg-primary',
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title_en: 'Emergency',
      title_hi: 'आपातकाल',
      link: '/emergency',
      color: 'bg-destructive',
    },
  ];

  const whyAarambh = [
    {
      icon: <Award className="h-12 w-12 text-primary" />,
      title_en: 'NABH Accredited',
      title_hi: 'NABH मान्यता प्राप्त',
      desc_en: 'Quality healthcare standards certified',
      desc_hi: 'गुणवत्ता स्वास्थ्य देखभाल मानक प्रमाणित',
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title_en: 'Expert Doctors',
      title_hi: 'विशेषज्ञ डॉक्टर',
      desc_en: 'Highly qualified and experienced specialists',
      desc_hi: 'उच्च योग्य और अनुभवी विशेषज्ञ',
    },
    {
      icon: <Building2 className="h-12 w-12 text-primary" />,
      title_en: 'Modern Infrastructure',
      title_hi: 'आधुनिक बुनियादी ढांचा',
      desc_en: 'State-of-the-art medical facilities',
      desc_hi: 'अत्याधुनिक चिकित्सा सुविधाएं',
    },
    {
      icon: <Clock className="h-12 w-12 text-primary" />,
      title_en: '24/7 Services',
      title_hi: '24/7 सेवाएं',
      desc_en: 'Round-the-clock emergency care',
      desc_hi: 'चौबीसों घंटे आपातकालीन देखभाल',
    },
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title_en: 'ISO Certified',
      title_hi: 'ISO प्रमाणित',
      desc_en: 'International quality standards',
      desc_hi: 'अंतर्राष्ट्रीय गुणवत्ता मानक',
    },
    {
      icon: <Heart className="h-12 w-12 text-primary" />,
      title_en: 'Patient Care',
      title_hi: 'रोगी देखभाल',
      desc_en: 'Compassionate and personalized care',
      desc_hi: 'दयालु और व्यक्तिगत देखभाल',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90" />
            <div className="container relative z-10 flex h-full items-center">
              <div className="max-w-2xl text-white">
                <h1 className="mb-4 text-5xl font-bold">
                  {t(slide.title_en, slide.title_hi)}
                </h1>
                <p className="mb-8 text-xl">{t(slide.desc_en, slide.desc_hi)}</p>
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/book-appointment">
                    {t('Book Appointment', 'अपॉइंटमेंट बुक करें')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-8 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link}>
              <Card className="group cursor-pointer transition-all hover:shadow-lg">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className={`${action.color} rounded-lg p-3 text-white`}>
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary">
                      {t(action.title_en, action.title_hi)}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-primary">
              {t('Our Departments', 'हमारे विभाग')}
            </h2>
            <p className="text-muted-foreground">
              {t(
                'Comprehensive medical care across multiple specialties',
                'कई विशेषताओं में व्यापक चिकित्सा देखभाल'
              )}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {departments.map((dept) => (
              <Link key={dept.id} to={`/our-specialities/${dept.slug}`}>
                <Card className="group h-full cursor-pointer transition-all hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="rounded-full bg-primary/10 p-4">
                        <Heart className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="mb-2 font-semibold group-hover:text-primary">
                      {t(dept.name_en, dept.name_hi)}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/our-specialities">
                {t('View All Specialities', 'सभी विशेषताएं देखें')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-primary">
              {t('Why Choose Aarambh?', 'आरंभ क्यों चुनें?')}
            </h2>
            <p className="text-muted-foreground">
              {t(
                'Your trusted partner in healthcare excellence',
                'स्वास्थ्य देखभाल उत्कृष्टता में आपका विश्वसनीय साथी'
              )}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {whyAarambh.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {t(item.title_en, item.title_hi)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(item.desc_en, item.desc_hi)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="bg-muted py-16">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-primary">
                {t('Patient Testimonials', 'रोगी प्रशंसापत्र')}
              </h2>
              <p className="text-muted-foreground">
                {t(
                  'What our patients say about us',
                  'हमारे रोगी हमारे बारे में क्या कहते हैं'
                )}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {testimonials.slice(0, 3).map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardContent className="p-6">
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      {testimonial.comment}
                    </p>
                    <p className="font-semibold">{testimonial.patient_name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-primary py-16 text-white">
        <div className="container text-center">
          <h2 className="mb-4 text-4xl font-bold">
            {t('Need Emergency Care?', 'आपातकालीन देखभाल की आवश्यकता है?')}
          </h2>
          <p className="mb-8 text-xl">
            {t(
              'Our emergency department is open 24/7 for your care',
              'हमारा आपातकालीन विभाग आपकी देखभाल के लिए 24/7 खुला है'
            )}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/emergency">
                <Phone className="mr-2 h-5 w-5" />
                {t('Call Emergency', 'आपातकाल कॉल करें')}
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/contact">
                {t('Contact Us', 'संपर्क करें')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

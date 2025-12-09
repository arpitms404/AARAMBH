import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Building2, Heart, Target, Eye } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();

  const values = [
    {
      icon: <Heart className="h-12 w-12 text-primary" />,
      title_en: 'Compassionate Care',
      title_hi: 'दयालु देखभाल',
      desc_en: 'We treat every patient with empathy and respect',
      desc_hi: 'हम हर रोगी का सहानुभूति और सम्मान के साथ इलाज करते हैं',
    },
    {
      icon: <Award className="h-12 w-12 text-primary" />,
      title_en: 'Excellence',
      title_hi: 'उत्कृष्टता',
      desc_en: 'Committed to the highest standards of medical care',
      desc_hi: 'चिकित्सा देखभाल के उच्चतम मानकों के लिए प्रतिबद्ध',
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title_en: 'Teamwork',
      title_hi: 'टीम वर्क',
      desc_en: 'Collaborative approach to patient care',
      desc_hi: 'रोगी देखभाल के लिए सहयोगात्मक दृष्टिकोण',
    },
    {
      icon: <Building2 className="h-12 w-12 text-primary" />,
      title_en: 'Innovation',
      title_hi: 'नवाचार',
      desc_en: 'Adopting latest medical technologies',
      desc_hi: 'नवीनतम चिकित्सा प्रौद्योगिकियों को अपनाना',
    },
  ];

  const achievements = [
    { number: '100+', label_en: 'Expert Doctors', label_hi: 'विशेषज्ञ डॉक्टर' },
    { number: '200+', label_en: 'Beds', label_hi: 'बिस्तर' },
    { number: '50,000+', label_en: 'Patients Treated', label_hi: 'रोगियों का इलाज' },
    { number: '24/7', label_en: 'Emergency Care', label_hi: 'आपातकालीन देखभाल' },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-20 text-white">
        <div className="container text-center">
          <h1 className="mb-4 text-5xl font-bold">
            {t('About Aarambh Hospital', 'आरंभ अस्पताल के बारे में')}
          </h1>
          <p className="mx-auto max-w-2xl text-xl">
            {t(
              'Leading the way in cardiac and multi-speciality healthcare in Lucknow',
              'लखनऊ में कार्डियक और मल्टी-स्पेशलिटी स्वास्थ्य सेवा में अग्रणी'
            )}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid gap-12 xl:grid-cols-2">
            <div>
              <h2 className="mb-6 text-4xl font-bold text-primary">
                {t('Our Story', 'हमारी कहानी')}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {t(
                    'Aarambh Heart & Multi-Speciality Hospital was established with a vision to provide world-class healthcare services to the people of Lucknow and surrounding regions. Our state-of-the-art facility combines advanced medical technology with compassionate care.',
                    'आरंभ हार्ट एंड मल्टी-स्पेशलिटी अस्पताल की स्थापना लखनऊ और आसपास के क्षेत्रों के लोगों को विश्व स्तरीय स्वास्थ्य सेवाएं प्रदान करने के दृष्टिकोण के साथ की गई थी। हमारी अत्याधुनिक सुविधा उन्नत चिकित्सा प्रौद्योगिकी को दयालु देखभाल के साथ जोड़ती है।'
                  )}
                </p>
                <p>
                  {t(
                    'We specialize in cardiac care, neurology, orthopedics, and a wide range of other medical specialties. Our team of highly qualified doctors and healthcare professionals are dedicated to providing personalized care to each patient.',
                    'हम कार्डियक केयर, न्यूरोलॉजी, ऑर्थोपेडिक्स और अन्य चिकित्सा विशेषताओं की एक विस्तृत श्रृंखला में विशेषज्ञ हैं। हमारे उच्च योग्य डॉक्टरों और स्वास्थ्य पेशेवरों की टीम प्रत्येक रोगी को व्यक्तिगत देखभाल प्रदान करने के लिए समर्पित है।'
                  )}
                </p>
                <p>
                  {t(
                    'With NABH and ISO certifications, we maintain the highest standards of quality and patient safety. Our 24/7 emergency services ensure that critical care is always available when you need it most.',
                    'NABH और ISO प्रमाणपत्रों के साथ, हम गुणवत्ता और रोगी सुरक्षा के उच्चतम मानकों को बनाए रखते हैं। हमारी 24/7 आपातकालीन सेवाएं सुनिश्चित करती हैं कि जब आपको इसकी सबसे अधिक आवश्यकता हो तो महत्वपूर्ण देखभाल हमेशा उपलब्ध हो।'
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-6">
                {achievements.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <div className="mb-2 text-4xl font-bold text-primary">
                        {item.number}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t(item.label_en, item.label_hi)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <div className="mb-4 flex justify-center">
              <Target className="h-16 w-16 text-primary" />
            </div>
            <h2 className="mb-4 text-4xl font-bold text-primary">
              {t('Our Mission', 'हमारा मिशन')}
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              {t(
                'To provide accessible, affordable, and high-quality healthcare services with a patient-centric approach, utilizing advanced medical technology and a team of dedicated healthcare professionals.',
                'उन्नत चिकित्सा प्रौद्योगिकी और समर्पित स्वास्थ्य पेशेवरों की एक टीम का उपयोग करते हुए, रोगी-केंद्रित दृष्टिकोण के साथ सुलभ, किफायती और उच्च गुणवत्ता वाली स्वास्थ्य सेवाएं प्रदान करना।'
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <div className="mb-4 flex justify-center">
              <Eye className="h-16 w-16 text-primary" />
            </div>
            <h2 className="mb-4 text-4xl font-bold text-primary">
              {t('Our Vision', 'हमारी दृष्टि')}
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              {t(
                'To be the most trusted and preferred healthcare provider in North India, recognized for clinical excellence, patient satisfaction, and innovative medical practices.',
                'उत्तर भारत में सबसे विश्वसनीय और पसंदीदा स्वास्थ्य सेवा प्रदाता बनना, जो नैदानिक उत्कृष्टता, रोगी संतुष्टि और नवीन चिकित्सा प्रथाओं के लिए मान्यता प्राप्त हो।'
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-primary">
              {t('Our Values', 'हमारे मूल्य')}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{value.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {t(value.title_en, value.title_hi)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(value.desc_en, value.desc_hi)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-primary">
              {t('Accreditations & Certifications', 'मान्यताएं और प्रमाणपत्र')}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="p-8 text-center">
                <Award className="mx-auto mb-4 h-16 w-16 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">NABH</h3>
                <p className="text-sm text-muted-foreground">
                  {t(
                    'National Accreditation Board for Hospitals & Healthcare Providers',
                    'राष्ट्रीय अस्पताल और स्वास्थ्य सेवा प्रदाता मान्यता बोर्ड'
                  )}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8 text-center">
                <Award className="mx-auto mb-4 h-16 w-16 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">ISO 9001:2015</h3>
                <p className="text-sm text-muted-foreground">
                  {t(
                    'Quality Management System Certification',
                    'गुणवत्ता प्रबंधन प्रणाली प्रमाणन'
                  )}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8 text-center">
                <Award className="mx-auto mb-4 h-16 w-16 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">NABL</h3>
                <p className="text-sm text-muted-foreground">
                  {t(
                    'National Accreditation Board for Testing and Calibration Laboratories',
                    'राष्ट्रीय परीक्षण और अंशांकन प्रयोगशाला मान्यता बोर्ड'
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

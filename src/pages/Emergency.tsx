import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Ambulance, Clock, AlertCircle, Heart, Activity } from 'lucide-react';

export default function Emergency() {
  const { t } = useLanguage();

  const emergencyNumbers = [
    { label_en: 'Emergency Helpline', label_hi: 'आपातकालीन हेल्पलाइन', number: '+91-123-456-7890' },
    { label_en: 'Ambulance Service', label_hi: 'एम्बुलेंस सेवा', number: '+91-123-456-7891' },
    { label_en: 'Cardiac Emergency', label_hi: 'कार्डियक आपातकाल', number: '+91-123-456-7892' },
  ];

  const emergencyServices = [
    {
      icon: <Ambulance className="h-12 w-12 text-primary" />,
      title_en: '24/7 Ambulance',
      title_hi: '24/7 एम्बुलेंस',
      desc_en: 'Advanced life support ambulances available round the clock',
      desc_hi: 'उन्नत जीवन समर्थन एम्बुलेंस चौबीसों घंटे उपलब्ध',
    },
    {
      icon: <Heart className="h-12 w-12 text-primary" />,
      title_en: 'Cardiac Emergency',
      title_hi: 'कार्डियक आपातकाल',
      desc_en: 'Specialized cardiac emergency care with CathLab facility',
      desc_hi: 'कैथलैब सुविधा के साथ विशेष कार्डियक आपातकालीन देखभाल',
    },
    {
      icon: <Activity className="h-12 w-12 text-primary" />,
      title_en: 'Trauma Care',
      title_hi: 'ट्रॉमा केयर',
      desc_en: 'Immediate trauma and accident care',
      desc_hi: 'तत्काल ट्रॉमा और दुर्घटना देखभाल',
    },
    {
      icon: <Clock className="h-12 w-12 text-primary" />,
      title_en: 'ICU Services',
      title_hi: 'आईसीयू सेवाएं',
      desc_en: 'State-of-the-art intensive care units',
      desc_hi: 'अत्याधुनिक गहन देखभाल इकाइयां',
    },
  ];

  const whenToCall = [
    {
      title_en: 'Chest Pain',
      title_hi: 'सीने में दर्द',
      desc_en: 'Severe chest pain or pressure',
      desc_hi: 'गंभीर सीने में दर्द या दबाव',
    },
    {
      title_en: 'Breathing Difficulty',
      title_hi: 'सांस लेने में कठिनाई',
      desc_en: 'Shortness of breath or difficulty breathing',
      desc_hi: 'सांस की तकलीफ या सांस लेने में कठिनाई',
    },
    {
      title_en: 'Severe Bleeding',
      title_hi: 'गंभीर रक्तस्राव',
      desc_en: 'Uncontrolled bleeding from any injury',
      desc_hi: 'किसी भी चोट से अनियंत्रित रक्तस्राव',
    },
    {
      title_en: 'Unconsciousness',
      title_hi: 'बेहोशी',
      desc_en: 'Loss of consciousness or fainting',
      desc_hi: 'चेतना की हानि या बेहोशी',
    },
    {
      title_en: 'Stroke Symptoms',
      title_hi: 'स्ट्रोक के लक्षण',
      desc_en: 'Sudden weakness, numbness, or speech difficulty',
      desc_hi: 'अचानक कमजोरी, सुन्नता, या बोलने में कठिनाई',
    },
    {
      title_en: 'Severe Injuries',
      title_hi: 'गंभीर चोटें',
      desc_en: 'Major accidents or trauma',
      desc_hi: 'बड़ी दुर्घटनाएं या ट्रॉमा',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-destructive py-20 text-white">
        <div className="container text-center">
          <AlertCircle className="mx-auto mb-6 h-20 w-20" />
          <h1 className="mb-4 text-5xl font-bold">
            {t('Emergency Services', 'आपातकालीन सेवाएं')}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl">
            {t(
              '24/7 Emergency care available for all critical situations',
              'सभी गंभीर स्थितियों के लिए 24/7 आपातकालीन देखभाल उपलब्ध'
            )}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {emergencyNumbers.map((item, index) => (
              <a key={index} href={`tel:${item.number}`}>
                <Button size="lg" variant="secondary" className="min-w-[200px]">
                  <Phone className="mr-2 h-5 w-5" />
                  {item.number}
                </Button>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-primary">
              {t('Our Emergency Services', 'हमारी आपातकालीन सेवाएं')}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {emergencyServices.map((service, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{service.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {t(service.title_en, service.title_hi)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(service.desc_en, service.desc_hi)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-primary">
              {t('When to Call Emergency', 'आपातकाल कब कॉल करें')}
            </h2>
            <p className="text-muted-foreground">
              {t(
                'Call our emergency number immediately if you experience any of these symptoms',
                'यदि आप इनमें से कोई भी लक्षण अनुभव करते हैं तो तुरंत हमारे आपातकालीन नंबर पर कॉल करें'
              )}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {whenToCall.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <h3 className="text-lg font-semibold">
                      {t(item.title_en, item.title_hi)}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t(item.desc_en, item.desc_hi)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <Card className="border-destructive">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="mb-4 text-3xl font-bold text-destructive">
                  {t('Emergency Contact Information', 'आपातकालीन संपर्क जानकारी')}
                </h2>
                <div className="mb-6 space-y-2">
                  {emergencyNumbers.map((item, index) => (
                    <div key={index} className="text-lg">
                      <span className="font-semibold">{t(item.label_en, item.label_hi)}:</span>{' '}
                      <a href={`tel:${item.number}`} className="text-destructive hover:underline">
                        {item.number}
                      </a>
                    </div>
                  ))}
                </div>
                <p className="mb-6 text-muted-foreground">
                  {t(
                    'Our emergency department is open 24 hours a day, 7 days a week. We are always ready to provide immediate medical care.',
                    'हमारा आपातकालीन विभाग दिन में 24 घंटे, सप्ताह में 7 दिन खुला रहता है। हम हमेशा तत्काल चिकित्सा देखभाल प्रदान करने के लिए तैयार हैं।'
                  )}
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <a href="tel:+911234567890">
                    <Button size="lg" variant="destructive">
                      <Phone className="mr-2 h-5 w-5" />
                      {t('Call Emergency', 'आपातकाल कॉल करें')}
                    </Button>
                  </a>
                  <a href="tel:+911234567891">
                    <Button size="lg" variant="outline">
                      <Ambulance className="mr-2 h-5 w-5" />
                      {t('Call Ambulance', 'एम्बुलेंस कॉल करें')}
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

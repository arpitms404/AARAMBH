import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/db/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: t('Error', 'त्रुटि'),
        description: t('Please fill in all required fields', 'कृपया सभी आवश्यक फ़ील्ड भरें'),
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      await api.contactMessages.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.subject || null,
        message: formData.message,
      });

      toast({
        title: t('Success', 'सफलता'),
        description: t(
          'Your message has been sent successfully. We will get back to you soon.',
          'आपका संदेश सफलतापूर्वक भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।'
        ),
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: t('Error', 'त्रुटि'),
        description: t('Failed to send message. Please try again.', 'संदेश भेजने में विफल। कृपया पुनः प्रयास करें।'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-20 text-white">
        <div className="container text-center">
          <h1 className="mb-4 text-5xl font-bold">
            {t('Contact Us', 'संपर्क करें')}
          </h1>
          <p className="mx-auto max-w-2xl text-xl">
            {t(
              'Get in touch with us for any queries or assistance',
              'किसी भी प्रश्न या सहायता के लिए हमसे संपर्क करें'
            )}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid gap-8 xl:grid-cols-3">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    {t('Address', 'पता')}
                  </h3>
                  <p className="text-muted-foreground">
                    4/93, Vineet Khand-4, Gomti Nagar<br />
                    Lucknow (U.P.) - 226010
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    {t('Phone', 'फ़ोन')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('General:', 'सामान्य:')} +91-123-456-7890<br />
                    {t('Emergency:', 'आपातकाल:')} +91-123-456-7890
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    {t('Email', 'ईमेल')}
                  </h3>
                  <p className="text-muted-foreground">
                    info@aarambhhospital.com<br />
                    emergency@aarambhhospital.com
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    {t('Hours', 'समय')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('OPD:', 'ओपीडी:')} 9:00 AM - 6:00 PM<br />
                    {t('Emergency:', 'आपातकाल:')} 24/7
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="xl:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {t('Send us a Message', 'हमें संदेश भेजें')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          {t('Name', 'नाम')} *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">
                          {t('Email', 'ईमेल')} *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          {t('Phone', 'फ़ोन')}
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">
                          {t('Subject', 'विषय')}
                        </Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        {t('Message', 'संदेश')} *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                      {loading
                        ? t('Sending...', 'भेजा जा रहा है...')
                        : t('Send Message', 'संदेश भेजें')}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">
                    {t('Location Map', 'स्थान मानचित्र')}
                  </h3>
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.0!2d80.9!3d26.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUxJzAwLjAiTiA4MMKwNTQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Hospital Location"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

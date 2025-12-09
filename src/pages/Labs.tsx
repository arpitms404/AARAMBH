import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/db/api';
import type { LabTest } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Search, TestTube, Calendar, MapPin } from 'lucide-react';

export default function Labs() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [tests, setTests] = useState<LabTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingForm, setBookingForm] = useState({
    patient_name: '',
    phone: '',
    email: '',
    address: '',
    pickup_date: '',
    pickup_time: '',
  });

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      const data = await api.labTests.getAll();
      setTests(data);
    } catch (error) {
      console.error('Error loading tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTests = tests.filter((test) =>
    searchQuery
      ? test.test_name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.test_name_hi.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingForm.patient_name || !bookingForm.phone || !bookingForm.address || !bookingForm.pickup_date || !bookingForm.pickup_time) {
      toast({
        title: t('Error', 'त्रुटि'),
        description: t('Please fill in all required fields', 'कृपया सभी आवश्यक फ़ील्ड भरें'),
        variant: 'destructive',
      });
      return;
    }

    try {
      await api.labBookings.create({
        patient_name: bookingForm.patient_name,
        phone: bookingForm.phone,
        email: bookingForm.email || null,
        address: bookingForm.address,
        test_ids: null,
        pickup_date: bookingForm.pickup_date,
        pickup_time: bookingForm.pickup_time,
        prescription_url: null,
      });

      toast({
        title: t('Success', 'सफलता'),
        description: t(
          'Your sample pickup has been scheduled. We will contact you shortly.',
          'आपका नमूना पिकअप निर्धारित कर दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।'
        ),
      });

      setBookingForm({
        patient_name: '',
        phone: '',
        email: '',
        address: '',
        pickup_date: '',
        pickup_time: '',
      });
    } catch (error) {
      toast({
        title: t('Error', 'त्रुटि'),
        description: t('Failed to schedule pickup. Please try again.', 'पिकअप शेड्यूल करने में विफल। कृपया पुनः प्रयास करें।'),
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen">
      <section className="bg-secondary py-20 text-white">
        <div className="container text-center">
          <h1 className="mb-4 text-5xl font-bold">
            {t('Aarambh Labs', 'आरंभ लैब्स')}
          </h1>
          <p className="mx-auto max-w-2xl text-xl">
            {t(
              'NABL accredited laboratory services with home sample collection',
              'होम सैंपल कलेक्शन के साथ NABL मान्यता प्राप्त प्रयोगशाला सेवाएं'
            )}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid gap-8 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder={t('Search tests...', 'टेस्ट खोजें...')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>

              {loading ? (
                <div className="grid gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="h-6 bg-muted mb-2" />
                        <div className="h-4 bg-muted" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredTests.map((test) => (
                    <Card key={test.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary/10">
                              <TestTube className="h-6 w-6 text-secondary" />
                            </div>
                            <div>
                              <h3 className="mb-1 text-lg font-semibold">
                                {t(test.test_name_en, test.test_name_hi)}
                              </h3>
                              {test.description_en && (
                                <p className="mb-2 text-sm text-muted-foreground">
                                  {t(test.description_en, test.description_hi || '')}
                                </p>
                              )}
                              {test.category && (
                                <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs">
                                  {test.category}
                                </span>
                              )}
                            </div>
                          </div>
                          {test.price && (
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">
                                ₹{test.price}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {t('Book Sample Pickup', 'सैंपल पिकअप बुक करें')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBooking} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient_name">
                        {t('Patient Name', 'रोगी का नाम')} *
                      </Label>
                      <Input
                        id="patient_name"
                        value={bookingForm.patient_name}
                        onChange={(e) =>
                          setBookingForm({ ...bookingForm, patient_name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        {t('Phone', 'फ़ोन')} *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={bookingForm.phone}
                        onChange={(e) =>
                          setBookingForm({ ...bookingForm, phone: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">{t('Email', 'ईमेल')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={bookingForm.email}
                        onChange={(e) =>
                          setBookingForm({ ...bookingForm, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">
                        {t('Address', 'पता')} *
                      </Label>
                      <Textarea
                        id="address"
                        value={bookingForm.address}
                        onChange={(e) =>
                          setBookingForm({ ...bookingForm, address: e.target.value })
                        }
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pickup_date">
                        {t('Pickup Date', 'पिकअप तिथि')} *
                      </Label>
                      <Input
                        id="pickup_date"
                        type="date"
                        value={bookingForm.pickup_date}
                        onChange={(e) =>
                          setBookingForm({ ...bookingForm, pickup_date: e.target.value })
                        }
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pickup_time">
                        {t('Pickup Time', 'पिकअप समय')} *
                      </Label>
                      <Input
                        id="pickup_time"
                        type="time"
                        value={bookingForm.pickup_time}
                        onChange={(e) =>
                          setBookingForm({ ...bookingForm, pickup_time: e.target.value })
                        }
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      {t('Schedule Pickup', 'पिकअप शेड्यूल करें')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/db/api';
import type { Department, Doctor } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, User, Phone, Mail } from 'lucide-react';

export default function BookAppointment() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patient_name: '',
    phone: '',
    email: '',
    department_id: searchParams.get('department') || '',
    doctor_id: searchParams.get('doctor') || '',
    appointment_date: '',
    appointment_time: '',
    notes: '',
  });

  useEffect(() => {
    loadDepartments();
  }, []);

  useEffect(() => {
    if (formData.department_id) {
      loadDoctors(formData.department_id);
    }
  }, [formData.department_id]);

  const loadDepartments = async () => {
    try {
      const data = await api.departments.getAll();
      setDepartments(data);
    } catch (error) {
      console.error('Error loading departments:', error);
    }
  };

  const loadDoctors = async (departmentId: string) => {
    try {
      const data = await api.doctors.getByDepartment(departmentId);
      setDoctors(data);
    } catch (error) {
      console.error('Error loading doctors:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patient_name || !formData.phone || !formData.department_id || !formData.appointment_date || !formData.appointment_time) {
      toast({
        title: t('Error', 'त्रुटि'),
        description: t('Please fill in all required fields', 'कृपया सभी आवश्यक फ़ील्ड भरें'),
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      await api.appointments.create({
        patient_name: formData.patient_name,
        phone: formData.phone,
        email: formData.email || null,
        department_id: formData.department_id,
        doctor_id: formData.doctor_id || null,
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        notes: formData.notes || null,
      });

      toast({
        title: t('Success', 'सफलता'),
        description: t(
          'Your appointment has been booked successfully. We will contact you shortly.',
          'आपका अपॉइंटमेंट सफलतापूर्वक बुक हो गया है। हम जल्द ही आपसे संपर्क करेंगे।'
        ),
      });

      setFormData({
        patient_name: '',
        phone: '',
        email: '',
        department_id: '',
        doctor_id: '',
        appointment_date: '',
        appointment_time: '',
        notes: '',
      });
    } catch (error) {
      toast({
        title: t('Error', 'त्रुटि'),
        description: t('Failed to book appointment. Please try again.', 'अपॉइंटमेंट बुक करने में विफल। कृपया पुनः प्रयास करें।'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
    '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM',
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-20 text-white">
        <div className="container text-center">
          <h1 className="mb-4 text-5xl font-bold">
            {t('Book Appointment', 'अपॉइंटमेंट बुक करें')}
          </h1>
          <p className="mx-auto max-w-2xl text-xl">
            {t(
              'Schedule your visit with our expert doctors',
              'हमारे विशेषज्ञ डॉक्टरों के साथ अपनी यात्रा निर्धारित करें'
            )}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {t('Appointment Details', 'अपॉइंटमेंट विवरण')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="patient_name">
                      {t('Patient Name', 'रोगी का नाम')} *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="patient_name"
                        value={formData.patient_name}
                        onChange={(e) =>
                          setFormData({ ...formData, patient_name: e.target.value })
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {t('Phone Number', 'फ़ोन नंबर')} *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('Email', 'ईमेल')}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="department">
                      {t('Department', 'विभाग')} *
                    </Label>
                    <Select
                      value={formData.department_id}
                      onValueChange={(value) =>
                        setFormData({ ...formData, department_id: value, doctor_id: '' })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('Select Department', 'विभाग चुनें')} />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {t(dept.name_en, dept.name_hi)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor">{t('Doctor (Optional)', 'डॉक्टर (वैकल्पिक)')}</Label>
                    <Select
                      value={formData.doctor_id}
                      onValueChange={(value) =>
                        setFormData({ ...formData, doctor_id: value })
                      }
                      disabled={!formData.department_id}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('Select Doctor', 'डॉक्टर चुनें')} />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            {doctor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="appointment_date">
                      {t('Appointment Date', 'अपॉइंटमेंट तिथि')} *
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="appointment_date"
                        type="date"
                        value={formData.appointment_date}
                        onChange={(e) =>
                          setFormData({ ...formData, appointment_date: e.target.value })
                        }
                        min={new Date().toISOString().split('T')[0]}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="appointment_time">
                      {t('Appointment Time', 'अपॉइंटमेंट समय')} *
                    </Label>
                    <Select
                      value={formData.appointment_time}
                      onValueChange={(value) =>
                        setFormData({ ...formData, appointment_time: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('Select Time', 'समय चुनें')} />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">{t('Additional Notes', 'अतिरिक्त नोट्स')}</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    rows={4}
                    placeholder={t(
                      'Any specific concerns or requirements...',
                      'कोई विशिष्ट चिंता या आवश्यकताएं...'
                    )}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading
                    ? t('Booking...', 'बुकिंग...')
                    : t('Book Appointment', 'अपॉइंटमेंट बुक करें')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

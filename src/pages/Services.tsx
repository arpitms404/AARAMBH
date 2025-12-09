import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/db/api';
import type { Service } from '@/types/types';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Activity } from 'lucide-react';

export default function Services() {
  const { t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await api.services.getAll();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="bg-secondary py-20 text-white">
        <div className="container text-center">
          <h1 className="mb-4 text-5xl font-bold">
            {t('Our Services', 'हमारी सेवाएं')}
          </h1>
          <p className="mx-auto max-w-2xl text-xl">
            {t(
              'Comprehensive support services for complete patient care',
              'पूर्ण रोगी देखभाल के लिए व्यापक सहायता सेवाएं'
            )}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="mb-4 h-16 w-16 rounded-full bg-muted" />
                    <div className="h-6 bg-muted mb-2" />
                    <div className="h-4 bg-muted" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <Card key={service.id} className="group transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 flex justify-center">
                      <div className="rounded-full bg-secondary/10 p-4 transition-colors group-hover:bg-secondary/20">
                        <Activity className="h-8 w-8 text-secondary" />
                      </div>
                    </div>
                    <h3 className="mb-2 text-center text-xl font-semibold group-hover:text-secondary">
                      {t(service.name_en, service.name_hi)}
                    </h3>
                    {service.description_en && (
                      <p className="mb-4 text-center text-sm text-muted-foreground">
                        {t(service.description_en, service.description_hi || '')}
                      </p>
                    )}
                    {service.operating_hours && (
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{service.operating_hours}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

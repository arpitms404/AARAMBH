import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/db/api';
import type { Department } from '@/types/types';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ArrowRight } from 'lucide-react';

export default function OurSpecialities() {
  const { t } = useLanguage();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const data = await api.departments.getAll();
      setDepartments(data);
    } catch (error) {
      console.error('Error loading departments:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-20 text-white">
        <div className="container text-center">
          <h1 className="mb-4 text-5xl font-bold">
            {t('Our Specialities', 'हमारी विशेषताएं')}
          </h1>
          <p className="mx-auto max-w-2xl text-xl">
            {t(
              'Comprehensive medical care across multiple specialties',
              'कई विशेषताओं में व्यापक चिकित्सा देखभाल'
            )}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {departments.map((dept) => (
                <Link key={dept.id} to={`/our-specialities/${dept.slug}`}>
                  <Card className="group h-full cursor-pointer transition-all hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="mb-4 flex justify-center">
                        <div className="rounded-full bg-primary/10 p-4 transition-colors group-hover:bg-primary/20">
                          <Heart className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="mb-2 text-center text-xl font-semibold group-hover:text-primary">
                        {t(dept.name_en, dept.name_hi)}
                      </h3>
                      {dept.description_en && (
                        <p className="mb-4 text-center text-sm text-muted-foreground line-clamp-2">
                          {t(dept.description_en, dept.description_hi || '')}
                        </p>
                      )}
                      <div className="flex justify-center">
                        <span className="flex items-center text-sm font-medium text-primary">
                          {t('Learn More', 'और जानें')}
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

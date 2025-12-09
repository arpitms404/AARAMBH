import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/db/api';
import type { DoctorWithDepartment, Department } from '@/types/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Calendar } from 'lucide-react';

export default function FindDoctor() {
  const { t } = useLanguage();
  const [doctors, setDoctors] = useState<DoctorWithDepartment[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterGender, setFilterGender] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [doctorsData, deptData] = await Promise.all([
        api.doctors.getAll(),
        api.departments.getAll(),
      ]);
      setDoctors(doctorsData);
      setDepartments(deptData);
    } catch (error) {
      console.error('Error loading doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesName = searchName
      ? doctor.name.toLowerCase().includes(searchName.toLowerCase())
      : true;
    const matchesDepartment = filterDepartment
      ? doctor.department_id === filterDepartment
      : true;
    const matchesGender = filterGender ? doctor.gender === filterGender : true;
    return matchesName && matchesDepartment && matchesGender;
  });

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-20 text-white">
        <div className="container text-center">
          <h1 className="mb-4 text-5xl font-bold">
            {t('Find a Doctor', 'डॉक्टर खोजें')}
          </h1>
          <p className="mx-auto max-w-2xl text-xl">
            {t(
              'Search our expert doctors by name, specialty, or gender',
              'नाम, विशेषता या लिंग के आधार पर हमारे विशेषज्ञ डॉक्टरों को खोजें'
            )}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder={t('Search by name...', 'नाम से खोजें...')}
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('All Departments', 'सभी विभाग')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('All Departments', 'सभी विभाग')}</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {t(dept.name_en, dept.name_hi)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterGender} onValueChange={setFilterGender}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('All Genders', 'सभी लिंग')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('All Genders', 'सभी लिंग')}</SelectItem>
                    <SelectItem value="male">{t('Male', 'पुरुष')}</SelectItem>
                    <SelectItem value="female">{t('Female', 'महिला')}</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchName('');
                    setFilterDepartment('');
                    setFilterGender('');
                  }}
                >
                  {t('Clear Filters', 'फ़िल्टर साफ़ करें')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="mb-4 h-32 w-32 rounded-full bg-muted" />
                    <div className="h-6 bg-muted mb-2" />
                    <div className="h-4 bg-muted" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredDoctors.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">
                  {t('No doctors found matching your criteria', 'आपके मानदंडों से मेल खाने वाले कोई डॉक्टर नहीं मिले')}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="group overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 flex justify-center">
                      <div className="h-32 w-32 overflow-hidden rounded-full bg-muted">
                        {doctor.photo_url ? (
                          <img
                            src={doctor.photo_url}
                            alt={doctor.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-4xl font-bold text-primary">
                            {doctor.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>
                    <h3 className="mb-1 text-center text-xl font-semibold group-hover:text-primary">
                      {doctor.name}
                    </h3>
                    <p className="mb-2 text-center text-sm text-muted-foreground">
                      {t(doctor.designation_en, doctor.designation_hi)}
                    </p>
                    {doctor.department && (
                      <p className="mb-4 text-center text-sm font-medium text-primary">
                        {t(doctor.department.name_en, doctor.department.name_hi)}
                      </p>
                    )}
                    {doctor.languages && doctor.languages.length > 0 && (
                      <p className="mb-4 text-center text-xs text-muted-foreground">
                        {t('Languages:', 'भाषाएं:')} {doctor.languages.join(', ')}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link to={`/doctor/${doctor.slug}`}>
                          {t('View Profile', 'प्रोफ़ाइल देखें')}
                        </Link>
                      </Button>
                      <Button size="sm" className="flex-1" asChild>
                        <Link to={`/book-appointment?doctor=${doctor.id}`}>
                          <Calendar className="mr-2 h-4 w-4" />
                          {t('Book', 'बुक करें')}
                        </Link>
                      </Button>
                    </div>
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

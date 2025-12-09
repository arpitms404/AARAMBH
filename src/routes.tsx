import Home from './pages/Home';
import About from './pages/About';
import OurSpecialities from './pages/OurSpecialities';
import Services from './pages/Services';
import FindDoctor from './pages/FindDoctor';
import BookAppointment from './pages/BookAppointment';
import Labs from './pages/Labs';
import Emergency from './pages/Emergency';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />,
  },
  {
    name: 'About',
    path: '/about',
    element: <About />,
  },
  {
    name: 'Our Specialities',
    path: '/our-specialities',
    element: <OurSpecialities />,
  },
  {
    name: 'Services',
    path: '/services',
    element: <Services />,
  },
  {
    name: 'Find Doctor',
    path: '/find-a-doctor',
    element: <FindDoctor />,
  },
  {
    name: 'Book Appointment',
    path: '/book-appointment',
    element: <BookAppointment />,
  },
  {
    name: 'Labs',
    path: '/labs',
    element: <Labs />,
  },
  {
    name: 'Emergency',
    path: '/emergency',
    element: <Emergency />,
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <Contact />,
  },
  {
    name: 'Not Found',
    path: '*',
    element: <NotFound />,
    visible: false,
  },
];

export default routes;

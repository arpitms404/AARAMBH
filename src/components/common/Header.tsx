import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Specialities", path: "/our-specialities" },
    { name: "Services", path: "/services" },
    { name: "Find Doctor", path: "/find-a-doctor" },
    { name: "Labs", path: "/labs" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* 🔹 Top Bar */}
      <div className="bg-primary py-2 text-white">
        <div className="container flex items-center justify-between text-sm">
          <span>4/93, Vineet Khand-4, Gomti Nagar, Lucknow</span>

          <a href="tel:+911234567890" className="flex items-center gap-2 hover:underline">
            <Phone className="h-4 w-4" />
            <span>Emergency: +91-123-456-7890</span>
          </a>
        </div>
      </div>

      {/* 🔹 Main Header */}
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="container flex h-20 items-center justify-between">

          {/* Logo + Title */}
          <Link to="/" className="flex items-center gap-3">
            <div className="h-14 w-14 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500">
              Logo
            </div>

            <div>
              <h1 className="text-xl font-bold text-primary">Aarambh</h1>
              <p className="text-xs text-muted-foreground">
                Heart & Multi-Speciality Hospital
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 xl:flex">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path ? "text-primary" : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Buttons */}
          <div className="flex items-center gap-4">

            {/* Appointment Button */}
            <Button asChild className="hidden md:flex">
              <Link to="/book-appointment">Book Appointment</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="xl:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-4 py-4">
                  
                  {/* Mobile Links */}
                  {navigation.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        location.pathname === item.path ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}

                  <Button asChild>
                    <Link to="/book-appointment" onClick={() => setIsOpen(false)}>
                      Book Appointment
                    </Link>
                  </Button>

                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </header>
    </>
  );
}

import { Link } from "react-router-dom";
import { Map, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Map className="w-8 h-8 text-secondary" />
              <span className="text-2xl font-display font-bold">
                Travel<span className="text-secondary">Lens</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70">
              Discover Nepal through immersive virtual experiences. 
              Explore, learn, and connect with the heart of the Himalayas.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-lg font-display font-bold mb-4">Explore</h4>
            <ul className="space-y-2">
              {["All Destinations", "Virtual Tours", "AI Guide", "Educational Modules", "AR Experience"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-lg font-display font-bold mb-4">Top Destinations</h4>
            <ul className="space-y-2">
              {["Kathmandu", "Pokhara", "Lumbini", "Chitwan", "Annapurna"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-display font-bold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-secondary" />
                <span className="text-primary-foreground/70">Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary" />
                <span className="text-primary-foreground/70">hello@travellens.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary" />
                <span className="text-primary-foreground/70">+977 1 4123456</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 TravelLens. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/60">
            <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-secondary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

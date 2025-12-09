import { Link } from "react-router-dom";
import { Map, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube, ExternalLink } from "lucide-react";

const socialLinks = [
  { icon: Facebook, url: "https://www.facebook.com/senku.khadka", label: "Facebook" },
  { icon: Twitter, url: "https://x.com/kira_desu0?t=Jri0wORghD96jYbAKw_JNw&s=099", label: "Twitter" },
  { icon: Instagram, url: "https://www.instagram.com/ma_naav?igsh=czl0MDhianAwOXo2", label: "Instagram" },
  { icon: Youtube, url: "https://youtube.com/@manavjungkhadka3040?si=_2-EH9uM6_YKEsLZ", label: "YouTube" },
];

const destinationLinks = [
  { name: "Kathmandu", id: "kathmandu", mapUrl: "https://maps.google.com/?q=27.7172,85.3240" },
  { name: "Pokhara", id: "pokhara", mapUrl: "https://maps.google.com/?q=28.2096,83.9856" },
  { name: "Lumbini", id: "lumbini", mapUrl: "https://maps.google.com/?q=27.4833,83.2767" },
  { name: "Chitwan", id: "chitwan", mapUrl: "https://maps.google.com/?q=27.5291,84.3542" },
  { name: "Annapurna", id: "annapurna", mapUrl: "https://maps.google.com/?q=28.5960,83.8203" },
];

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
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-lg font-display font-bold mb-4">Explore</h4>
            <ul className="space-y-2">
              {[
                { name: "All Destinations", to: "/explore" },
                { name: "Virtual Tours", to: "/explore" },
                { name: "AI Guide", to: "/guide" },
                { name: "Educational Modules", to: "/learn" },
                { name: "VR Experience", to: "/explore" },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.to} 
                    className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-lg font-display font-bold mb-4">Top Destinations</h4>
            <ul className="space-y-2">
              {destinationLinks.map((dest) => (
                <li key={dest.name} className="flex items-center gap-2">
                  <Link 
                    to={`/destination/${dest.id}`}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {dest.name}
                  </Link>
                  <a
                    href={dest.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground/50 hover:text-secondary transition-colors"
                    title={`View ${dest.name} on Map`}
                  >
                    <ExternalLink className="w-3 h-3" />
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
                <MapPin className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-primary-foreground/70">Dharan, Nepal</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <a 
                  href="mailto:manavjungkhadka@gmail.com"
                  className="text-primary-foreground/70 hover:text-secondary transition-colors break-all"
                >
                  manavjungkhadka@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <a 
                  href="tel:+9779825037255"
                  className="text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  +977 9825037255
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} TravelLens. All rights reserved.
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

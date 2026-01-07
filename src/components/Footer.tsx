import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-chocolate text-chocolate-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🎂</span>
              <span className="font-display text-2xl font-semibold">Sweet Delights</span>
            </Link>
            <p className="text-cream-dark/80 text-sm leading-relaxed">
              Crafting moments of joy with freshly baked cakes and beautiful decorations for your special celebrations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Shop All', path: '/shop' },
                { label: 'Cakes', path: '/shop?category=cakes' },
                { label: 'Decorations', path: '/shop?category=decoration' },
                { label: 'About Us', path: '/about' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-cream-dark/70 hover:text-cream-dark transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Occasions */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Occasions</h4>
            <ul className="space-y-2">
              {[
                { label: 'Birthday', path: '/shop?occasion=birthday', icon: '🎉' },
                { label: 'Anniversary', path: '/shop?occasion=anniversary', icon: '💕' },
                { label: 'Wedding', path: '/shop?occasion=wedding', icon: '💒' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-cream-dark/70 hover:text-cream-dark transition-colors text-sm flex items-center gap-2"
                  >
                    <span>{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-cream-dark/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>123 Baker Street, Sweet Town, ST 12345</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-cream-dark/70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-cream-dark/70">
                <Mail className="h-4 w-4 shrink-0" />
                <span>hello@sweetdelights.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-cream-dark/70">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <p>Mon - Sat: 9AM - 8PM</p>
                  <p>Sunday: 10AM - 6PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream-dark/20 mt-12 pt-8 text-center">
          <p className="text-cream-dark/60 text-sm">
            © {new Date().getFullYear()} Sweet Delights Bakery. All rights reserved. Made with 💕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

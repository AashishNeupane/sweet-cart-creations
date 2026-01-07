import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">🎂</div>
      <div className="absolute top-40 right-20 text-5xl opacity-15 animate-float animation-delay-200">🧁</div>
      <div className="absolute bottom-20 left-1/4 text-4xl opacity-10 animate-float animation-delay-400">🎈</div>
      
      <div className="container-custom section-padding">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-6 animate-fade-in">
            <span className="text-lg">✨</span>
            <span className="text-sm font-medium text-secondary-foreground">
              Freshly Baked with Love
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-chocolate mb-6 animate-fade-in-up">
            Make Every Celebration
            <span className="block text-gradient-warm mt-2">Sweetly Memorable</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Handcrafted cakes and stunning decorations for birthdays, anniversaries, and weddings. 
            Order now and make your moments unforgettable.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8 animate-fade-in-up animation-delay-400">
            <SearchBar placeholder="Search for cakes, decorations..." />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
            <Button asChild size="lg" className="gradient-warm text-primary-foreground px-8 h-12 rounded-full shadow-lg hover:shadow-xl transition-shadow">
              <Link to="/shop?category=cakes">
                Shop Cakes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-full border-2">
              <Link to="/shop?category=decoration">
                Browse Decorations
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-border/50">
            {[
              { icon: '🎂', label: 'Fresh Daily' },
              { icon: '🚚', label: 'Fast Delivery' },
              { icon: '💯', label: '100% Quality' },
              { icon: '💬', label: 'WhatsApp Order' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2">
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-sm font-medium text-muted-foreground">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

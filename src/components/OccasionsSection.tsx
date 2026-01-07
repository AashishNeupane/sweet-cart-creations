import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const occasions = [
  {
    id: 'birthday',
    name: 'Birthday',
    icon: '🎉',
    description: 'Make birthdays extra special',
    link: '/shop?occasion=birthday',
    gradient: 'from-pink-100 to-rose-100',
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    icon: '💕',
    description: 'Celebrate your love story',
    link: '/shop?occasion=anniversary',
    gradient: 'from-rose-100 to-red-100',
  },
  {
    id: 'wedding',
    name: 'Wedding',
    icon: '💒',
    description: 'Perfect for the big day',
    link: '/shop?occasion=wedding',
    gradient: 'from-amber-50 to-orange-100',
  },
];

const OccasionsSection = () => {
  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Occasion
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect cake and decorations for your special moments
          </p>
        </div>

        {/* Occasion Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {occasions.map((occasion, index) => (
            <Link 
              key={occasion.id} 
              to={occasion.link}
              className="group"
            >
              <div 
                className={`relative overflow-hidden rounded-2xl p-8 text-center bg-gradient-to-br ${occasion.gradient} card-hover`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {occasion.icon}
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {occasion.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {occasion.description}
                </p>

                {/* Link */}
                <div className="flex items-center justify-center text-primary font-medium text-sm group-hover:gap-2 gap-1 transition-all">
                  <span>Explore</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OccasionsSection;

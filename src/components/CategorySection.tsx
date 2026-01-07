import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

const categories = [
  {
    id: 'cakes',
    name: 'Delicious Cakes',
    description: 'Freshly baked cakes for every celebration',
    icon: '🎂',
    image: '/placeholder.svg',
    link: '/shop?category=cakes',
    color: 'from-rose/20 to-primary/20',
  },
  {
    id: 'decoration',
    name: 'Party Decorations',
    description: 'Beautiful decorations to set the mood',
    icon: '🎈',
    image: '/placeholder.svg',
    link: '/shop?category=decoration',
    color: 'from-accent/20 to-rose/20',
  },
];

const CategorySection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to make your celebration perfect
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <Link key={category.id} to={category.link}>
              <Card 
                className={`group relative overflow-hidden h-64 md:h-80 border-0 shadow-card card-hover bg-gradient-to-br ${category.color}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-4 right-4 text-7xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                    {category.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all">
                    <span>Shop Now</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

import { Link } from 'react-router-dom';
import { ArrowRight, Award, Heart, Leaf, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const values = [
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Every cake is crafted with passion and care by our experienced bakers.',
  },
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    description: 'We use only the freshest, highest quality ingredients in all our products.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'We maintain strict quality standards to ensure every order is perfect.',
  },
  {
    icon: Clock,
    title: 'Baked Fresh Daily',
    description: 'All our cakes are baked fresh daily, never frozen or pre-made.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative gradient-hero">
          <div className="container-custom section-padding text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in-up">
              Our Sweet Story
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              A journey of passion, creativity, and the perfect blend of flavors
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="container-custom section-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                From a Home Kitchen to Your Heart
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Sweet Delights began as a passion project in our grandmother's kitchen, 
                  where the aroma of freshly baked cakes filled the air and every celebration 
                  called for something special.
                </p>
                <p>
                  What started as baking for family gatherings soon grew into a beloved 
                  neighborhood bakery. Today, we continue that tradition of making every 
                  occasion memorable with our handcrafted cakes and beautiful decorations.
                </p>
                <p>
                  We believe that every celebration deserves something extraordinary. 
                  That's why we pour our heart into every creation, using time-tested 
                  recipes and the finest ingredients to bring joy to your special moments.
                </p>
              </div>
              <Button asChild className="gradient-warm text-primary-foreground rounded-full">
                <Link to="/shop">
                  Explore Our Creations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-cream">
                <img
                  src="/placeholder.svg"
                  alt="Our bakery"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-elevated">
                <p className="font-display text-4xl font-bold">10+</p>
                <p className="text-sm opacity-90">Years of Sweetness</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-cream section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Sets Us Apart
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our commitment to quality and customer happiness drives everything we do
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card 
                  key={value.title} 
                  className="text-center border-0 shadow-card animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Hygiene Promise */}
        <section className="container-custom section-padding">
          <div className="bg-secondary rounded-3xl p-8 md:p-12 text-center">
            <div className="text-5xl mb-6">✨</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Our Hygiene & Freshness Promise
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              We maintain the highest standards of cleanliness and food safety in our kitchen. 
              All our products are prepared in a sanitized environment with fresh ingredients. 
              We never use preservatives, and every cake is baked to order to ensure maximum freshness.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {['100% Hygienic', 'No Preservatives', 'Fresh Daily', 'Premium Ingredients'].map(badge => (
                <span 
                  key={badge}
                  className="px-4 py-2 bg-card rounded-full text-sm font-medium"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="gradient-warm text-primary-foreground section-padding">
          <div className="container-custom text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Ready to Taste the Difference?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Order now and experience the magic of freshly baked goodness
            </p>
            <Button asChild size="lg" className="bg-card text-primary hover:bg-card/90 rounded-full px-8">
              <Link to="/shop">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default About;

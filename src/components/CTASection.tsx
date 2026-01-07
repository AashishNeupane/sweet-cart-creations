import { Link } from 'react-router-dom';
import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WHATSAPP_NUMBER } from '@/data/products';

const CTASection = () => {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to place an order.")}`;

  return (
    <section className="relative overflow-hidden gradient-warm text-primary-foreground">
      {/* Decorative */}
      <div className="absolute top-10 left-10 text-6xl opacity-20">🎂</div>
      <div className="absolute bottom-10 right-10 text-5xl opacity-15">🎈</div>

      <div className="container-custom section-padding relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Order?
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Order now via WhatsApp for quick and easy delivery. 
            We're here to make your celebration sweet!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-card text-primary hover:bg-card/90 h-12 px-8 rounded-full shadow-lg"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Order on WhatsApp
              </a>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground/10 h-12 px-8 rounded-full"
            >
              <Link to="/contact">
                <Phone className="mr-2 h-5 w-5" />
                Call Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

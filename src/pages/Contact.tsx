import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { WHATSAPP_NUMBER } from '@/data/products';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['123 Baker Street', 'Sweet Town, ST 12345'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+1 234 567 8900', '+1 234 567 8901'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['hello@sweetdelights.com', 'orders@sweetdelights.com'],
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    details: ['Mon - Sat: 9AM - 8PM', 'Sunday: 10AM - 6PM'],
  },
];

const Contact = () => {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to know more about your products.")}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="gradient-hero section-padding text-center">
          <div className="container-custom">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in-up">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              We'd love to hear from you. Reach out for orders, inquiries, or just to say hello!
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="container-custom section-padding !py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card 
                key={info.title}
                className="text-center border-0 shadow-card animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-3">
                    {info.title}
                  </h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-sm text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section className="bg-cream section-padding !py-12">
          <div className="container-custom">
            <Card className="border-0 shadow-elevated overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="text-5xl mb-6">💬</div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                      Quick Order via WhatsApp
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      The fastest way to place your order! Send us a message on WhatsApp 
                      and we'll help you with your order right away.
                    </p>
                    <Button 
                      asChild 
                      size="lg" 
                      className="gradient-warm text-primary-foreground rounded-full w-fit"
                    >
                      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Message on WhatsApp
                      </a>
                    </Button>
                  </div>
                  <div className="bg-secondary p-8 md:p-12">
                    <h3 className="font-display text-xl font-semibold mb-6">
                      Why Order via WhatsApp?
                    </h3>
                    <ul className="space-y-4">
                      {[
                        'Instant response and order confirmation',
                        'Share photos for custom cake designs',
                        'Real-time updates on your order',
                        'Easy to share delivery details',
                        'Direct communication with our team',
                      ].map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-primary mt-1">✓</span>
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Map Section */}
        <section className="container-custom section-padding !pt-0">
          <div className="bg-muted rounded-2xl h-[400px] flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Map integration placeholder
              </p>
              <p className="text-sm text-muted-foreground">
                123 Baker Street, Sweet Town, ST 12345
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="bg-cream section-padding">
          <div className="container-custom text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Have Questions?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Check out our frequently asked questions or contact us directly for any inquiries.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
              {[
                { q: 'How far in advance should I order?', a: 'We recommend ordering at least 24-48 hours in advance.' },
                { q: 'Do you offer delivery?', a: 'Yes! We deliver within a 15km radius of our store.' },
                { q: 'Can I customize my cake?', a: 'Absolutely! Contact us to discuss your custom design.' },
              ].map((faq, i) => (
                <Card key={i} className="border-0 shadow-soft">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-foreground mb-2">{faq.q}</h4>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

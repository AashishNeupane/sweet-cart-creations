import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    avatar: '',
    rating: 5,
    text: 'The black forest cake was absolutely divine! Fresh cream, perfect sweetness. Made my anniversary so special. Will definitely order again!',
    occasion: 'Anniversary',
  },
  {
    id: 2,
    name: 'Rahul Patel',
    avatar: '',
    rating: 5,
    text: "Ordered a birthday cake for my daughter. The decorations were stunning and the cake was delicious. Everyone loved it!",
    occasion: 'Birthday',
  },
  {
    id: 3,
    name: 'Anita Gupta',
    avatar: '',
    rating: 5,
    text: 'The wedding decoration package was perfect. Everything was elegant and beautifully arranged. Thank you for making our day memorable!',
    occasion: 'Wedding',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real stories from our happy customers
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="border-0 shadow-card bg-card animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.occasion}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

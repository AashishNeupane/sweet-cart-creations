import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import PopularProducts from '@/components/PopularProducts';
import OccasionsSection from '@/components/OccasionsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <HeroSection />
        <CategorySection />
        <PopularProducts />
        <OccasionsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Index;

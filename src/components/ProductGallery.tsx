import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ProductGalleryProps {
  mainImage: string;
  galleryImages?: string[];
  productName: string;
}

const ProductGallery = ({ mainImage, galleryImages = [], productName }: ProductGalleryProps) => {
  const allImages = [mainImage, ...galleryImages];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const selectedImage = allImages[selectedIndex];

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream group">
        <img
          src={selectedImage}
          alt={productName}
          className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-105"
          onClick={() => setIsLightboxOpen(true)}
        />
        
        {/* Zoom indicator */}
        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="h-5 w-5 text-foreground" />
        </div>

        {/* Navigation arrows for multiple images */}
        {allImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedIndex === index
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-transparent hover:border-muted-foreground/30'
              }`}
            >
              <img
                src={image}
                alt={`${productName} - View ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-4xl p-2 bg-background/95 backdrop-blur-md">
          <div className="relative">
            <img
              src={selectedImage}
              alt={productName}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            
            {allImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>

          {/* Lightbox thumbnails */}
          {allImages.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                    selectedIndex === index
                      ? 'border-primary'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductGallery;

import { useState, useRef } from 'react';
import { MessageCircle, Upload, X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateCustomOrderMessage, openWhatsApp } from '@/lib/whatsapp';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().min(10, 'Phone must be at least 10 digits').max(15),
  message: z.string().min(10, 'Please describe your cake requirements').max(1000),
  preferredDate: z.string().optional(),
});

const CustomOrderForm = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    preferredDate: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Image too large',
          description: 'Please select an image under 5MB.',
          variant: 'destructive',
        });
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    const message = generateCustomOrderMessage({
      name: formData.name,
      phone: formData.phone,
      message: formData.message,
      preferredDate: formData.preferredDate || undefined,
      hasImage: !!selectedImage,
    });

    openWhatsApp(message);

    toast({
      title: 'Opening WhatsApp',
      description: selectedImage
        ? 'Please send your reference image after the message.'
        : 'Your inquiry has been prepared.',
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="border-0 shadow-elevated">
      <CardHeader>
        <CardTitle className="font-display text-2xl flex items-center gap-2">
          🎨 Customize Your Cake
        </CardTitle>
        <p className="text-muted-foreground">
          Have a specific design in mind? Send us your requirements!
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+977 98XXXXXXXX"
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredDate" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Preferred Date (Optional)
            </Label>
            <Input
              id="preferredDate"
              name="preferredDate"
              type="date"
              min={today}
              value={formData.preferredDate}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Cake Details *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your cake requirements: flavor, size, design, message to write, etc."
              rows={4}
              className={errors.message ? 'border-destructive' : ''}
            />
            {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Reference Image (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-32 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Upload className="h-8 w-8" />
                    <span className="text-sm">Click to upload a reference image</span>
                    <span className="text-xs">PNG, JPG up to 5MB</span>
                  </label>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              * If you upload an image, please send it in WhatsApp after the initial message
            </p>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full gradient-warm text-primary-foreground"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Send Inquiry via WhatsApp
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomOrderForm;

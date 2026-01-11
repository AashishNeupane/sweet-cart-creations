import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export const ImageUpload = ({ value, onChange, label, className }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string>(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        onChange(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <p className="text-sm font-medium">{label}</p>}
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {preview ? (
        <div className="relative inline-block">
          <img 
            src={preview} 
            alt="Preview" 
            className="h-24 w-24 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6"
            onClick={handleRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          className="h-24 w-24 flex flex-col items-center justify-center gap-1 border-dashed"
        >
          <Upload className="h-6 w-6 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Upload</span>
        </Button>
      )}
    </div>
  );
};

interface MultiImageUploadProps {
  values: string[];
  onChange: (values: string[]) => void;
  label?: string;
  maxImages?: number;
  className?: string;
}

export const MultiImageUpload = ({ values, onChange, label, maxImages = 5, className }: MultiImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const remaining = maxImages - values.length;
      const filesToProcess = Array.from(files).slice(0, remaining);
      
      filesToProcess.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          onChange([...values, base64]);
        };
        reader.readAsDataURL(file);
      });
    }
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleRemove = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <p className="text-sm font-medium">{label}</p>}
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div className="flex flex-wrap gap-2">
        {values.map((src, index) => (
          <div key={index} className="relative inline-block">
            <img 
              src={src} 
              alt={`Gallery ${index + 1}`} 
              className="h-20 w-20 object-cover rounded-lg border"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-5 w-5"
              onClick={() => handleRemove(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        
        {values.length < maxImages && (
          <Button
            type="button"
            variant="outline"
            onClick={() => inputRef.current?.click()}
            className="h-20 w-20 flex flex-col items-center justify-center gap-1 border-dashed"
          >
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Add</span>
          </Button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{values.length}/{maxImages} images</p>
    </div>
  );
};

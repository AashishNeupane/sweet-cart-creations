import vanillaCake from '@/assets/vanilla-cake.jpg';
import blackforestCake from '@/assets/blackforest-cake.jpg';
import chocolateCake from '@/assets/chocolate-cake.jpg';
import whiteforestCake from '@/assets/whiteforest-cake.jpg';
import birthdayDecor from '@/assets/birthday-decor.jpg';
import anniversaryDecor from '@/assets/anniversary-decor.jpg';
import weddingDecor from '@/assets/wedding-decor.jpg';

export interface Product {
  id: string;
  name: string;
  category: 'cakes' | 'decoration';
  subcategory?: string;
  occasion: ('birthday' | 'anniversary' | 'wedding')[];
  price: number;
  pricePerLb?: boolean;
  image: string;
  description: string;
  tags: string[];
  available: boolean;
  popular?: boolean;
  sizes?: number[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: number;
}

// WhatsApp configuration - Update this with your number
export const WHATSAPP_NUMBER = "1234567890"; // Include country code without +

export const products: Product[] = [
  // Cakes
  {
    id: "vanilla-cake",
    name: "Vanilla Dream Cake",
    category: "cakes",
    subcategory: "vanilla",
    occasion: ["birthday", "anniversary"],
    price: 450,
    pricePerLb: true,
    image: vanillaCake,
    description: "Light and fluffy vanilla sponge layered with fresh cream and vanilla buttercream. A timeless classic for all celebrations.",
    tags: ["fresh cream", "custom message", "bestseller"],
    available: true,
    popular: true,
    sizes: [0.5, 1, 2, 3, 5]
  },
  {
    id: "blackforest-cake",
    name: "Black Forest Delight",
    category: "cakes",
    subcategory: "blackforest",
    occasion: ["birthday", "anniversary"],
    price: 550,
    pricePerLb: true,
    image: blackforestCake,
    description: "Rich chocolate layers with cherry filling, whipped cream, and chocolate shavings. A German classic loved by all.",
    tags: ["chocolate", "cherry", "fresh cream", "custom message"],
    available: true,
    popular: true,
    sizes: [0.5, 1, 2, 3, 5]
  },
  {
    id: "chocolate-cake",
    name: "Belgian Chocolate Cake",
    category: "cakes",
    subcategory: "chocolate",
    occasion: ["birthday", "anniversary", "wedding"],
    price: 600,
    pricePerLb: true,
    image: chocolateCake,
    description: "Decadent Belgian chocolate cake with dark chocolate ganache. For true chocolate lovers.",
    tags: ["dark chocolate", "ganache", "premium", "custom message"],
    available: true,
    popular: true,
    sizes: [0.5, 1, 2, 3, 5]
  },
  {
    id: "whiteforest-cake",
    name: "White Forest Elegance",
    category: "cakes",
    subcategory: "whiteforest",
    occasion: ["wedding", "anniversary"],
    price: 580,
    pricePerLb: true,
    image: whiteforestCake,
    description: "Delicate white chocolate sponge with cream cheese frosting and white chocolate curls. Pure elegance.",
    tags: ["white chocolate", "cream cheese", "elegant", "custom message"],
    available: true,
    popular: false,
    sizes: [0.5, 1, 2, 3, 5]
  },
  {
    id: "eggless-vanilla",
    name: "Eggless Vanilla Cake",
    category: "cakes",
    subcategory: "vanilla",
    occasion: ["birthday", "anniversary"],
    price: 480,
    pricePerLb: true,
    image: vanillaCake,
    description: "Our signature eggless vanilla cake, just as soft and delicious. Perfect for vegetarian celebrations.",
    tags: ["eggless", "vegetarian", "fresh cream", "custom message"],
    available: true,
    popular: true,
    sizes: [0.5, 1, 2, 3, 5]
  },
  {
    id: "truffle-chocolate",
    name: "Chocolate Truffle Cake",
    category: "cakes",
    subcategory: "chocolate",
    occasion: ["birthday", "anniversary"],
    price: 650,
    pricePerLb: true,
    image: chocolateCake,
    description: "Intensely chocolatey truffle cake with a smooth, melt-in-mouth texture. A chocolate lover's dream.",
    tags: ["truffle", "premium", "rich", "custom message"],
    available: true,
    popular: true,
    sizes: [0.5, 1, 2, 3, 5]
  },
  // Decoration Items
  {
    id: "birthday-balloon-set",
    name: "Birthday Balloon Set",
    category: "decoration",
    occasion: ["birthday"],
    price: 299,
    image: birthdayDecor,
    description: "Colorful balloon set with 'Happy Birthday' foil balloon, 20 latex balloons, and ribbon.",
    tags: ["balloons", "colorful", "party"],
    available: true,
    popular: true
  },
  {
    id: "birthday-banner-candles",
    name: "Birthday Banner & Candles Kit",
    category: "decoration",
    occasion: ["birthday"],
    price: 199,
    image: birthdayDecor,
    description: "Golden 'Happy Birthday' banner with matching number candles and sparkler candles.",
    tags: ["banner", "candles", "golden"],
    available: true,
    popular: false
  },
  {
    id: "anniversary-banner",
    name: "Anniversary Banner & Candles",
    category: "decoration",
    occasion: ["anniversary"],
    price: 349,
    image: anniversaryDecor,
    description: "Elegant rose gold 'Happy Anniversary' banner with heart-shaped balloons and romantic candles.",
    tags: ["rose gold", "romantic", "hearts"],
    available: true,
    popular: true
  },
  {
    id: "anniversary-table-decor",
    name: "Anniversary Table Decoration",
    category: "decoration",
    occasion: ["anniversary"],
    price: 499,
    image: anniversaryDecor,
    description: "Complete table decoration set with rose petals, tea lights, and photo frame centerpiece.",
    tags: ["romantic", "roses", "premium"],
    available: true,
    popular: false
  },
  {
    id: "wedding-table-decor",
    name: "Wedding Table Decor Pack",
    category: "decoration",
    occasion: ["wedding"],
    price: 899,
    image: weddingDecor,
    description: "Elegant wedding table decoration with white flowers, crystal votive holders, and satin runners.",
    tags: ["elegant", "white", "premium", "crystals"],
    available: true,
    popular: true
  },
  {
    id: "wedding-backdrop",
    name: "Wedding Photo Backdrop",
    category: "decoration",
    occasion: ["wedding"],
    price: 1299,
    image: weddingDecor,
    description: "Stunning floral backdrop for wedding photos with fairy lights and draped fabric.",
    tags: ["backdrop", "flowers", "fairy lights", "premium"],
    available: true,
    popular: false
  }
];

export const categories = [
  { id: 'cakes', name: 'Cakes', icon: '🎂' },
  { id: 'decoration', name: 'Decorations', icon: '🎈' }
];

export const cakeFlavors = [
  { id: 'vanilla', name: 'Vanilla' },
  { id: 'blackforest', name: 'Black Forest' },
  { id: 'chocolate', name: 'Chocolate' },
  { id: 'whiteforest', name: 'White Forest' }
];

export const occasions = [
  { id: 'birthday', name: 'Birthday', icon: '🎉' },
  { id: 'anniversary', name: 'Anniversary', icon: '💕' },
  { id: 'wedding', name: 'Wedding', icon: '💒' }
];

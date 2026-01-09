// Mock data for admin panel UI

import { Order, CustomOrder, AdminProduct, DashboardStats } from '../types';
import vanillaCake from '@/assets/vanilla-cake.jpg';
import chocolateCake from '@/assets/chocolate-cake.jpg';
import birthdayDecor from '@/assets/birthday-decor.jpg';

export const mockProducts: AdminProduct[] = [
  {
    id: '1',
    name: 'Vanilla Dream Cake',
    category: 'cakes',
    subcategory: 'vanilla',
    occasion: ['birthday', 'anniversary'],
    price: 450,
    pricePerLb: true,
    image: vanillaCake,
    description: 'Light and fluffy vanilla sponge with fresh cream',
    tags: ['fresh cream', 'custom message', 'bestseller'],
    available: true,
    popular: true,
    sizes: [1, 2, 3, 5],
    sku: 'CAKE-VAN-001',
    stock: 50,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    name: 'Belgian Chocolate Cake',
    category: 'cakes',
    subcategory: 'chocolate',
    occasion: ['birthday', 'anniversary', 'wedding'],
    price: 600,
    pricePerLb: true,
    image: chocolateCake,
    description: 'Decadent Belgian chocolate cake with dark chocolate ganache',
    tags: ['dark chocolate', 'ganache', 'premium'],
    available: true,
    popular: true,
    sizes: [1, 2, 3, 5],
    sku: 'CAKE-CHO-001',
    stock: 30,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    name: 'Birthday Balloon Set',
    category: 'decoration',
    occasion: ['birthday'],
    price: 299,
    image: birthdayDecor,
    description: 'Colorful balloon set with Happy Birthday foil balloon',
    tags: ['balloons', 'colorful', 'party'],
    available: true,
    popular: true,
    sku: 'DEC-BAL-001',
    stock: 100,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
  },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customerName: 'Ram Sharma',
    phone: '+977 9841234567',
    email: 'ram@example.com',
    address: 'Kathmandu, Nepal',
    deliveryType: 'delivery',
    deliveryDate: new Date('2024-01-25'),
    deliveryTime: '2:00 PM',
    items: [
      {
        id: '1',
        productId: '1',
        productName: 'Vanilla Dream Cake',
        productImage: vanillaCake,
        quantity: 1,
        size: 2,
        price: 900,
        notes: 'Write "Happy Birthday Sita"',
      },
      {
        id: '2',
        productId: '3',
        productName: 'Birthday Balloon Set',
        productImage: birthdayDecor,
        quantity: 1,
        price: 299,
      },
    ],
    subtotal: 1199,
    deliveryFee: 100,
    total: 1299,
    status: 'pending',
    notes: 'Please deliver before 2 PM',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customerName: 'Sita Devi',
    phone: '+977 9851234567',
    deliveryType: 'pickup',
    deliveryDate: new Date('2024-01-26'),
    deliveryTime: '10:00 AM',
    items: [
      {
        id: '3',
        productId: '2',
        productName: 'Belgian Chocolate Cake',
        productImage: chocolateCake,
        quantity: 1,
        size: 3,
        price: 1800,
      },
    ],
    subtotal: 1800,
    deliveryFee: 0,
    total: 1800,
    status: 'confirmed',
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-21'),
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customerName: 'Krishna Bahadur',
    phone: '+977 9861234567',
    email: 'krishna@example.com',
    address: 'Lalitpur, Nepal',
    deliveryType: 'delivery',
    deliveryDate: new Date('2024-01-27'),
    items: [
      {
        id: '4',
        productId: '1',
        productName: 'Vanilla Dream Cake',
        productImage: vanillaCake,
        quantity: 2,
        size: 1,
        price: 900,
      },
    ],
    subtotal: 900,
    deliveryFee: 150,
    total: 1050,
    status: 'delivered',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-27'),
  },
];

export const mockCustomOrders: CustomOrder[] = [
  {
    id: '1',
    customerName: 'Gita Kumari',
    phone: '+977 9871234567',
    email: 'gita@example.com',
    cakeDetails: 'I want a 3-tier wedding cake with white fondant and fresh flowers decoration. The cake should be vanilla with strawberry filling. Need it for 200 guests.',
    preferredDate: new Date('2024-02-14'),
    status: 'new',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
  },
  {
    id: '2',
    customerName: 'Hari Prasad',
    phone: '+977 9881234567',
    cakeDetails: 'Custom photo cake with my daughters photo for her 5th birthday. 2 lb chocolate cake.',
    preferredDate: new Date('2024-01-30'),
    referenceImage: chocolateCake,
    status: 'contacted',
    adminNotes: 'Called customer, confirmed design requirements',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-21'),
  },
  {
    id: '3',
    customerName: 'Maya Tamang',
    phone: '+977 9891234567',
    email: 'maya@example.com',
    cakeDetails: 'Need a eggless black forest cake for office party. Around 5 lbs with company logo on top.',
    preferredDate: new Date('2024-02-01'),
    status: 'quoted',
    quotedPrice: 3500,
    adminNotes: 'Quoted Rs 3500 for 5lb eggless with edible logo print',
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-22'),
  },
];

export const mockDashboardStats: DashboardStats = {
  totalOrders: 156,
  totalRevenue: 287500,
  pendingOrders: 12,
  completedOrders: 138,
  customOrderRequests: 8,
};

export const getFilteredOrders = (
  orders: Order[],
  dateRange?: { from: Date; to: Date },
  status?: string
): Order[] => {
  let filtered = [...orders];
  
  if (dateRange) {
    filtered = filtered.filter(
      (order) =>
        order.createdAt >= dateRange.from && order.createdAt <= dateRange.to
    );
  }
  
  if (status && status !== 'all') {
    filtered = filtered.filter((order) => order.status === status);
  }
  
  return filtered;
};

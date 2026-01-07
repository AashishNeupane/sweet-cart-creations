import { CartItem } from '@/stores/useCartStore';

export const WHATSAPP_NUMBER = '9779867403894'; // Nepal number with country code

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/blackberrycakes.np',
  instagram: 'https://www.instagram.com/blackberrycakes.np/',
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  maps: 'https://share.google/r6aIBzGF1ScS51N6a',
  mapsDirections: 'https://www.google.com/maps/dir/?api=1&destination=27.7172,85.3240',
};

interface OrderDetails {
  fullName: string;
  phone: string;
  secondaryPhone?: string;
  deliveryOption: 'delivery' | 'pickup';
  address?: string;
  deliveryLocation?: string;
  landmark?: string;
  deliveryDate: string;
  deliveryTime: string;
  notes?: string;
}

export function generateOrderMessage(items: CartItem[], details: OrderDetails, total: number): string {
  let message = `🎂 *Blackberry Cakes - New Order*\n\n`;
  
  message += `*Customer Details:*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Customer Name: ${details.fullName}\n`;
  message += `Primary Phone: ${details.phone}\n`;
  
  if (details.deliveryOption === 'delivery') {
    if (details.secondaryPhone) {
      message += `Secondary Phone: ${details.secondaryPhone}\n`;
    }
    message += `Delivery: Yes\n`;
    if (details.address) {
      message += `Delivery Address: ${details.address}\n`;
    }
    if (details.deliveryLocation) {
      message += `Delivery Location: ${details.deliveryLocation}\n`;
    }
    if (details.landmark) {
      message += `Landmark: ${details.landmark}\n`;
    }
  } else {
    message += `Delivery: No (Store Pickup)\n`;
  }
  
  message += `Date: ${details.deliveryDate}\n`;
  message += `Time: ${details.deliveryTime}\n`;
  
  if (details.notes) {
    message += `\nNotes: ${details.notes}\n`;
  }

  message += `\n*Order Items:*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n`;

  items.forEach((item, index) => {
    const itemPrice = item.product.pricePerLb && item.selectedSize
      ? item.product.price * item.selectedSize
      : item.product.price;
    const totalItemPrice = itemPrice * item.quantity;

    message += `\n${index + 1}. *${item.product.name}*\n`;
    message += `   SKU: ${item.product.id}\n`;
    message += `   Category: ${item.product.category === 'cakes' ? 'Cake' : 'Decoration'}\n`;
    
    if (item.product.category === 'cakes') {
      message += `   Eggless: ${item.isEggless ? 'Yes' : 'No'}\n`;
      if (item.selectedSize) {
        message += `   Size: ${item.selectedSize} Pound\n`;
      }
    }
    
    message += `   Qty: ${item.quantity}\n`;
    message += `   Price: ₹${totalItemPrice}\n`;
  });

  message += `\n━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Subtotal: ₹${total}*\n`;
  message += `*Delivery Fee: Calculated separately*\n`;
  message += `*Total: ₹${total}*\n`;

  return encodeURIComponent(message);
}

export function generateCustomOrderMessage(data: {
  name: string;
  phone: string;
  message: string;
  preferredDate?: string;
  hasImage: boolean;
}): string {
  let message = `🎂 *Blackberry Cakes - Custom Order Inquiry*\n\n`;
  message += `*Customer Details:*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Name: ${data.name}\n`;
  message += `Phone: ${data.phone}\n`;
  
  if (data.preferredDate) {
    message += `Preferred Date: ${data.preferredDate}\n`;
  }
  
  message += `\n*Cake Details/Message:*\n`;
  message += `${data.message}\n`;
  
  if (data.hasImage) {
    message += `\n📷 *Note: Customer will send reference image in the next message*\n`;
  }

  return encodeURIComponent(message);
}

export function openWhatsApp(message: string): void {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, '_blank');
}

import { CartItem } from '@/stores/useCartStore';

export const WHATSAPP_NUMBER = '9779867403894'; // Nepal number with country code

export const SOCIAL_LINKS = {
  tiktok: 'https://www.tiktok.com/@blackberrycakes.np',
  facebook: 'https://www.facebook.com/blackberrycakes.np',
  instagram: 'https://www.instagram.com/blackberrycakes.np/',
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667!2d84.1264329!3d27.6454557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994519044c8c6bb%3A0x2c1b6d667e034031!2zSjRXRys1SEYsIFVubmFtZWQgUm9hZCwgS2F3YXNvdGk!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp',
  mapsDirections: 'https://www.google.com/maps/dir//J4WG%2B5HF,+Unnamed+Road,+Kawasoti+33000/@27.716028,85.3474687,3667m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x3994519044c8c6bb:0x2c1b6d667e034031!2m2!1d84.1264329!2d27.6454557?entry=ttu',
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
    message += `   Price: Rs ${totalItemPrice}\n`;
  });

  message += `\n━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Subtotal: Rs ${total}*\n`;
  message += `*Delivery Fee: Calculated separately*\n`;
  message += `*Total: Rs ${total}*\n`;

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

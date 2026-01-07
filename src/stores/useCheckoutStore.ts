import { create } from 'zustand';

interface DeliveryDetails {
  secondaryPhone: string;
  deliveryLocation: string;
  landmark: string;
}

interface CheckoutFormData {
  fullName: string;
  phone: string;
  deliveryOption: 'delivery' | 'pickup';
  address: string;
  deliveryDate: string;
  deliveryTime: string;
  notes: string;
  deliveryDetails: DeliveryDetails;
}

interface CheckoutState {
  formData: CheckoutFormData;
  setFormField: <K extends keyof CheckoutFormData>(field: K, value: CheckoutFormData[K]) => void;
  setDeliveryDetail: <K extends keyof DeliveryDetails>(field: K, value: string) => void;
  resetForm: () => void;
}

const initialFormData: CheckoutFormData = {
  fullName: '',
  phone: '',
  deliveryOption: 'delivery',
  address: '',
  deliveryDate: '',
  deliveryTime: '',
  notes: '',
  deliveryDetails: {
    secondaryPhone: '',
    deliveryLocation: '',
    landmark: '',
  },
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  formData: initialFormData,
  
  setFormField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),

  setDeliveryDetail: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        deliveryDetails: {
          ...state.formData.deliveryDetails,
          [field]: value,
        },
      },
    })),

  resetForm: () => set({ formData: initialFormData }),
}));

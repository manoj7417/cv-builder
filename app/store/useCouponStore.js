import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const COUPON_EXPIRY_DAYS = 90; // 3 months

export const useCouponStore = create(
  persist(
    (set, get) => ({
      coupon: null,
      expiry: null,
      applyCoupon: (code) => {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + COUPON_EXPIRY_DAYS);
        set({ coupon: code, expiry: expiryDate.toISOString() });
      },
      clearCoupon: () => set({ coupon: null, expiry: null }),
      isValid: () => {
        const { expiry } = get();
        return expiry && new Date(expiry) > new Date();
      },
    }),
    {
      name: 'coupon-storage', // Key for localStorage
      getStorage: () => localStorage, // Use localStorage
    }
  )
);
export type DiscountType = 'PERCENTAGE' | 'FIXED_AMOUNT';
export type PromoStatus = 'SCHEDULED' | 'ACTIVE' | 'FINISHED';

export interface Promotion {
  id?: string;
  name: string;
  productCategory: string;
  discountType: DiscountType;
  discountValue: number;
  startDate: string;
  endDate: string;
  status?: PromoStatus;
}

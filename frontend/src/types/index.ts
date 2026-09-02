export type EMIPlan = {
  id: number;
  variantId: number;
  months: number;
  interestRate: string | number;
  monthlyPayment: number;
  cashback: number;
  provider: string;
};

export type Variant = {
  id: number;
  productId: number;
  color: string;
  storage: string;
  imageUrl: string;
  mrp: number;
  price: number;
  availableStock: number;
  emiPlans: EMIPlan[];
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  brand: string;
  category: string;
  description: string;
  variants: Variant[];
};

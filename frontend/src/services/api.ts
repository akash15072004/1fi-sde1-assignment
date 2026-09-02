import type { Product } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};

export async function getProduct(slug: string): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${slug}`);
  const body = (await response.json()) as ApiResponse<Product>;

  if (!response.ok || !body.success) {
    throw new Error(body.error || "Unable to load product");
  }

  return body.data;
}

export async function proceedWithPlan(
  planId: number,
  variantId: number
): Promise<{
  applicationReference: string;
  message: string;
  months: number;
  monthlyPayment: number;
}> {
  const response = await fetch(`${API_URL}/products/emi-plans/${planId}/proceed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ variantId })
  });

  const body = await response.json();

  if (!response.ok || !body.success) {
    throw new Error(body.error || "Unable to proceed");
  }

  return body.data;
}

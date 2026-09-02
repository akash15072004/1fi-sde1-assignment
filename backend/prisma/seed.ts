import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const plans = [
  { months: 3, interestRate: 0, cashback: 7500 },
  { months: 6, interestRate: 0, cashback: 7500 },
  { months: 12, interestRate: 0, cashback: 7500 },
  { months: 24, interestRate: 0, cashback: 7500 },
  { months: 36, interestRate: 10.5, cashback: 7500 },
  { months: 48, interestRate: 10.5, cashback: 7500 },
  { months: 60, interestRate: 10.5, cashback: 7500 }
];

function monthlyPayment(price: number, months: number, annualRate: number) {
  if (annualRate === 0) return Math.round(price / months);
  const monthlyRate = annualRate / 100 / 12;
  return Math.round(
    (price * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
  );
}

const products = [
  {
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    brand: "Apple",
    category: "Smartphone",
    description:
      "A premium smartphone with a pro camera system, high-performance processor and all-day battery.",
    variants: [
      {
        color: "Cosmic Orange",
        storage: "256GB",
        imageUrl:
          "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=85",
        mrp: 134900,
        price: 127400
      },
      {
        color: "Silver",
        storage: "256GB",
        imageUrl:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85",
        mrp: 134900,
        price: 127400
      }
    ]
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-s24-ultra",
    brand: "Samsung",
    category: "Smartphone",
    description:
      "A flagship Android smartphone with a high-resolution camera, S Pen and premium titanium design.",
    variants: [
      {
        color: "Titanium Gray",
        storage: "256GB",
        imageUrl:
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=85",
        mrp: 129999,
        price: 119999
      },
      {
        color: "Titanium Violet",
        storage: "512GB",
        imageUrl:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85",
        mrp: 149999,
        price: 139999
      }
    ]
  },
  {
    name: "Google Pixel 9 Pro",
    slug: "google-pixel-9-pro",
    brand: "Google",
    category: "Smartphone",
    description:
      "A premium Pixel phone focused on computational photography, AI features and a clean Android experience.",
    variants: [
      {
        color: "Obsidian",
        storage: "256GB",
        imageUrl:
          "https://images.unsplash.com/photo-1598327106026-d9521da673d1?auto=format&fit=crop&w=900&q=85",
        mrp: 109999,
        price: 99999
      },
      {
        color: "Porcelain",
        storage: "512GB",
        imageUrl:
          "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=85",
        mrp: 129999,
        price: 114999
      }
    ]
  }
];

async function main() {
  await prisma.eMIPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  for (const product of products) {
    const created = await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        category: product.category,
        description: product.description,
        variants: {
          create: product.variants.map((variant) => ({
            ...variant,
            emiPlans: {
              create: plans.map((plan) => ({
                months: plan.months,
                interestRate: plan.interestRate,
                monthlyPayment: monthlyPayment(
                  variant.price,
                  plan.months,
                  plan.interestRate
                ),
                cashback: plan.cashback
              }))
            }
          }))
        }
      },
      include: { variants: { include: { emiPlans: true } } }
    });

    console.log(`Seeded ${created.name} (${created.variants.length} variants)`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

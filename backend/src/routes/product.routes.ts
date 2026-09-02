import { Router } from "express";
import { z } from "zod";
import { prisma } from "../prisma";
import { isValidSlug } from "../utils/slug";

const router = Router();

const productSelect = {
  id: true,
  name: true,
  slug: true,
  brand: true,
  category: true,
  description: true,
  variants: {
    orderBy: { id: "asc" as const },
    include: {
      emiPlans: {
        orderBy: { months: "asc" as const }
      }
    }
  }
};

router.get("/", async (_req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        brand: true,
        category: true,
        variants: {
          select: {
            id: true,
            color: true,
            storage: true,
            price: true,
            mrp: true,
            imageUrl: true
          },
          orderBy: { id: "asc" }
        }
      }
    });

    res.json({ success: true, data: products });
  } catch {
    res.status(500).json({
      success: false,
      error: "Unable to fetch products"
    });
  }
});

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  if (!isValidSlug(slug)) {
    return res.status(400).json({
      success: false,
      error: "Invalid product slug"
    });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      select: productSelect
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found"
      });
    }

    res.json({ success: true, data: product });
  } catch {
    res.status(500).json({
      success: false,
      error: "Unable to fetch product"
    });
  }
});

router.get("/:slug/variants/:variantId", async (req, res) => {
  const variantId = Number(req.params.variantId);

  if (!Number.isInteger(variantId)) {
    return res.status(400).json({
      success: false,
      error: "Invalid variant ID"
    });
  }

  try {
    const variant = await prisma.variant.findFirst({
      where: {
        id: variantId,
        product: { slug: req.params.slug }
      },
      include: {
        emiPlans: { orderBy: { months: "asc" } }
      }
    });

    if (!variant) {
      return res.status(404).json({
        success: false,
        error: "Variant not found"
      });
    }

    res.json({ success: true, data: variant });
  } catch {
    res.status(500).json({
      success: false,
      error: "Unable to fetch variant"
    });
  }
});

const proceedSchema = z.object({
  variantId: z.number().int().positive()
});

router.post("/emi-plans/:planId/proceed", async (req, res) => {
  const planId = Number(req.params.planId);

  if (!Number.isInteger(planId)) {
    return res.status(400).json({
      success: false,
      error: "Invalid EMI plan ID"
    });
  }

  const parsed = proceedSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: "variantId must be a positive integer"
    });
  }

  try {
    const plan = await prisma.eMIPlan.findFirst({
      where: {
        id: planId,
        variantId: parsed.data.variantId
      }
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        error: "EMI plan not found for the selected variant"
      });
    }

    const reference = `1FI-${Math.random()
      .toString(36)
      .slice(2, 10)
      .toUpperCase()}`;

    res.json({
      success: true,
      data: {
        applicationReference: reference,
        message: "Plan selected successfully",
        planId: plan.id,
        months: plan.months,
        monthlyPayment: plan.monthlyPayment
      }
    });
  } catch {
    res.status(500).json({
      success: false,
      error: "Unable to proceed with EMI plan"
    });
  }
});

export default router;

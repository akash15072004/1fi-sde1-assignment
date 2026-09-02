import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { ProductHero } from "../components/ProductHero";
import { EmiPlans } from "../components/EmiPlans";
import { SuccessModal } from "../components/SuccessModal";
import { getProduct, proceedWithPlan } from "../services/api";
import type { EMIPlan, Product, Variant } from "../types";

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [variant, setVariant] = useState<Variant | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<EMIPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [proceeding, setProceeding] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!slug) return;
      setLoading(true);
      setError("");

      try {
        const data = await getProduct(slug);
        if (cancelled) return;

        setProduct(data);
        const firstVariant = data.variants[0] ?? null;
        setVariant(firstVariant);
        setSelectedPlan(firstVariant?.emiPlans[0] ?? null);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to load product");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const planSummary = useMemo(() => {
    if (!selectedPlan) return "";
    return `₹${selectedPlan.monthlyPayment.toLocaleString("en-IN")} × ${selectedPlan.months} months`;
  }, [selectedPlan]);

  function handleVariantChange(variantId: number) {
    const next = product?.variants.find((item) => item.id === variantId) ?? null;
    setVariant(next);
    setSelectedPlan(next?.emiPlans[0] ?? null);
  }

  async function handleProceed() {
    if (!selectedPlan || !variant) return;
    setProceeding(true);
    setError("");

    try {
      const result = await proceedWithPlan(selectedPlan.id, variant.id);
      setReference(result.applicationReference);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to proceed");
    } finally {
      setProceeding(false);
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="container">
          <div className="loading-card">
            <div className="spinner" />
            Loading product from database…
          </div>
        </main>
      </>
    );
  }

  if (error && !product) {
    return (
      <>
        <Header />
        <main className="container">
          <div className="error-card">
            <h1>Product unavailable</h1>
            <p>{error}</p>
            <a href="/products/iphone-17-pro">Open demo product</a>
          </div>
        </main>
      </>
    );
  }

  if (!product || !variant) return null;

  return (
    <>
      <Header />
      <main className="container">
        <div className="breadcrumb">Home / Smartphones / {product.name}</div>

        <ProductHero
          product={product}
          variant={variant}
          onVariantChange={handleVariantChange}
        />

        {error && (
          <div className="inline-error" role="alert">
            {error}
          </div>
        )}

        <EmiPlans
          plans={variant.emiPlans}
          selectedPlanId={selectedPlan?.id ?? 0}
          onSelect={setSelectedPlan}
          onProceed={handleProceed}
          loading={proceeding}
        />

        <div className="trust-row">
          <div>
            <span className="trust-icon">✓</span>
            <span><strong>No hidden charges</strong><small>Transparent EMI details</small></span>
          </div>
          <div>
            <span className="trust-icon">₹</span>
            <span><strong>Mutual fund backed</strong><small>Flexible repayment options</small></span>
          </div>
          <div>
            <span className="trust-icon">🔒</span>
            <span><strong>Secure application</strong><small>Your data stays protected</small></span>
          </div>
        </div>

        {selectedPlan && (
          <p className="selected-summary">
            Selected: <strong>{planSummary}</strong>
          </p>
        )}
      </main>

      {reference && (
        <SuccessModal reference={reference} onClose={() => setReference("")} />
      )}
    </>
  );
}

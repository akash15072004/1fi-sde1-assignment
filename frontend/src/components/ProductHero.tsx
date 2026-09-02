import type { Product, Variant } from "../types";

type Props = {
  product: Product;
  variant: Variant;
  onVariantChange: (variantId: number) => void;
};

export function ProductHero({ product, variant, onVariantChange }: Props) {
  const discount = Math.round(((variant.mrp - variant.price) / variant.mrp) * 100);

  return (
    <section className="product-hero">
      <div className="image-card">
        <div className="new-pill">NEW</div>
        <img
          className="product-image"
          src={variant.imageUrl}
          alt={`${product.name} ${variant.color} ${variant.storage}`}
        />
        <div className="image-footer">
          <span>{product.variants.length} finishes available</span>
          <div className="swatches" aria-label="Product variants">
            {product.variants.map((item) => (
              <button
                key={item.id}
                className={`swatch ${item.id === variant.id ? "selected" : ""}`}
                title={`${item.color} ${item.storage}`}
                aria-label={`Select ${item.color} ${item.storage}`}
                onClick={() => onVariantChange(item.id)}
              >
                <span
                  className="swatch-dot"
                  style={{
                    background:
                      item.color.toLowerCase().includes("orange")
                        ? "#f48a3d"
                        : item.color.toLowerCase().includes("violet")
                          ? "#79638c"
                          : item.color.toLowerCase().includes("gray")
                            ? "#777b80"
                            : "#dedede"
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="product-info">
        <div className="eyebrow">{product.brand} · {product.category}</div>
        <h1>{product.name}</h1>
        <p className="variant-title">
          {variant.storage} · {variant.color}
        </p>

        <div className="price-row">
          <span className="current-price">₹{variant.price.toLocaleString("en-IN")}</span>
          <span className="mrp">₹{variant.mrp.toLocaleString("en-IN")}</span>
          <span className="discount">{discount}% off</span>
        </div>

        <p className="description">{product.description}</p>

        <div className="selector">
          <div className="selector-label">Choose variant</div>
          <div className="variant-options">
            {product.variants.map((item) => (
              <button
                key={item.id}
                className={`variant-option ${item.id === variant.id ? "active" : ""}`}
                onClick={() => onVariantChange(item.id)}
              >
                <strong>{item.storage}</strong>
                <span>{item.color}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

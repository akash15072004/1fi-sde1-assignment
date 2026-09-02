import { useState } from "react";
import type { EMIPlan } from "../types";

type Props = {
  plans: EMIPlan[];
  selectedPlanId: number;
  onSelect: (plan: EMIPlan) => void;
  onProceed: () => Promise<void>;
  loading: boolean;
};

export function EmiPlans({
  plans,
  selectedPlanId,
  onSelect,
  onProceed,
  loading
}: Props) {
  const [showAll, setShowAll] = useState(false);
  const visiblePlans = showAll ? plans : plans.slice(0, 7);

  return (
    <section className="emi-section">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Flexible financing</p>
          <h2>EMI plans backed by mutual funds</h2>
        </div>
        <span className="plan-count">{plans.length} plans</span>
      </div>

      <div className="plans">
        {visiblePlans.map((plan) => {
          const interest = Number(plan.interestRate);
          const selected = plan.id === selectedPlanId;

          return (
            <button
              key={plan.id}
              className={`plan-card ${selected ? "selected" : ""}`}
              onClick={() => onSelect(plan)}
            >
              <span className="radio">
                <span className={selected ? "radio-dot" : ""} />
              </span>

              <span className="plan-main">
                <span className="monthly">
                  ₹{plan.monthlyPayment.toLocaleString("en-IN")}
                </span>
                <span className="tenure">× {plan.months} months</span>
              </span>

              <span className="plan-side">
                <span className={interest === 0 ? "interest zero" : "interest"}>
                  {interest}% interest
                </span>
                {plan.cashback > 0 && (
                  <span className="cashback">
                    Additional cashback of ₹{plan.cashback.toLocaleString("en-IN")}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {plans.length > 7 && (
        <button className="view-more" onClick={() => setShowAll((value) => !value)}>
          {showAll ? "Show fewer plans" : "View all EMI plans"}
        </button>
      )}

      <button className="proceed-button" disabled={loading} onClick={onProceed}>
        {loading ? "Processing…" : "Proceed with selected plan"}
        {!loading && <span>→</span>}
      </button>
    </section>
  );
}

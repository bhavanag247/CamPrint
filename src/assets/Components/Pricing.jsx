import React from "react";

export default function Pricing() {
  const plans = [
    {
      title: "Basic",
      price: "Free",
      text: "Simple printing with basic limits."
    },
    {
      title: "Student Plan",
      price: "Price based on your college Stationary",
      text: "Best value for college users."
    },
    {
      title: "Business",
      price: "Contact",
      text: "Bulk and shop printing with custom rates."
    }
  ];

  return (
    <div id="pricing" className="container section">
      <h2>Pricing</h2>

      <div className="pricing-grid" style={{ marginTop: 12 }}>
        {plans.map((p, i) => (
          <div key={i} className="plan glass-shadow">
            <div style={{ color: "var(--muted)", fontSize: 13 }}>
              {p.title}
            </div>

            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                marginTop: 6
              }}
            >
              {p.price}
            </div>

            <p
              style={{
                color: "var(--muted)",
                marginTop: 8,
                fontSize: 14
              }}
            >
              {p.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

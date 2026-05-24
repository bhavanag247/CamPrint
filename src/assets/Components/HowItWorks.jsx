import React from "react";

export default function HowItWorks() {

  const steps = [
    {
      title: "Upload Your Document",
      text: " Select or drag-and-drop your files into the upload area ."
    },
    {
        title:"Choose the Time slot",
        text: "Pick a time slot to collect your documents"
    },
    {
      title: "Pickup After Confirmation",
      text: "Receive a message when printing is done."
    },
  ];

  return (
    <div id="features" className="container section">
      <h2>How It Works</h2>

      <div className="steps" style={{ marginTop: 12 }}>
        {steps.map((s, i) => (
          <div className="step glass-shadow" key={i}>
            <h3>{i + 1}. {s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

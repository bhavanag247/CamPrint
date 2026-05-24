import React from "react";

export default function Hero() {
  return (
    <section id="home" className="hero container">
      <div className="hero-left">
        <h1>
          Print Documents.
          <br />
          Pickup Anytime
        </h1>

        <p>
          Upload PDFs, Docs, or images and send them directly to your nearest
          print shop.
        </p>

        <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
          <a className="btn btn-primary" href="#upload">
            Upload Your File
          </a>
          <a
            href="#features"
            style={{
              alignSelf: "center",
              color: "var(--accent)",
              fontWeight: 600
            }}
          >
            Learn more →
          </a>
        </div>
      </div>
    </section>
  );
}

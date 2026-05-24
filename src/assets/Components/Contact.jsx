import React from "react";

export default function Contact() {
  return (
    <div id="contact" className="container section">
      <h2>Contact</h2>

      <div style={{ marginTop: 12, maxWidth: 720 }}>
        <form
          className="contact-form glass-shadow"
          onSubmit={(e) => e.preventDefault()}
          style={{
            padding: "22px",
            borderRadius: "var(--radius)",
            background: "var(--card)",
            border: "1px solid rgba(13,148,136,0.25)",
            backdropFilter: "blur(16px)"
          }}
        >
          <input
            placeholder="Your Name"
            required
          />
          <input
            placeholder="Email"
            type="email"
            required
            style={{ marginTop: 10 }}
          />
          <textarea
            placeholder="Message"
            rows="5"
            style={{ marginTop: 10 }}
            required
          />

          <div style={{ textAlign: "right", marginTop: 12 }}>
            <button className="btn btn-primary" type="submit">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

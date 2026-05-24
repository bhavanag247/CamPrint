import React, { useState } from "react";

export default function Uploadbox({
  inputRef,
  onFiles,
  files = [],
  onRemoveFile,
  onClearAll
}) {
  const [dragActive, setDragActive] = useState(false);

  const [printDetails, setPrintDetails] = useState({
    documentType: "Assignment",
    priority: "Normal",
    pageType: "Black & White",
    numberOfPages: 1
  });

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer?.files?.length) {
      onFiles(e.dataTransfer.files);
    }
  }

  function handleInput(e) {
    if (e.target.files?.length) onFiles(e.target.files);
    e.target.value = "";
  }

  function browse() {
    inputRef?.current?.click();
  }

  function handleChange(e) {
    setPrintDetails({
      ...printDetails,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div id="upload" style={{ marginTop: 14 }}>
      <h3 style={{ marginTop: 0 }}>Upload Your File</h3>

      <input
        ref={inputRef}
        type="file"
        multiple
        onChange={handleInput}
        style={{ display: "none" }}
      />

      <div
        className="upload-preview glass-shadow"
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div
          className="drag-card"
          style={{
            background: dragActive
              ? "rgba(13,148,136,0.08)"
              : "rgba(255,255,255,0.1)"
          }}
        >
          <p style={{ fontSize: 18, fontWeight: 600, margin: 6 }}>
            Drag & Drop Files Here
          </p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={browse}
            style={{ marginTop: 10 }}
          >
            Browse
          </button>

          <div style={{ marginTop: 10, color: "var(--muted)" }}>
            Supported: PDF, DOCX, JPG
          </div>
        </div>
      </div>

      <div
        className="glass-shadow"
        style={{
          marginTop: 20,
          padding: 20,
          borderRadius: 16,
          background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(13,148,136,0.25)"
        }}
      >
        <h4 style={{ marginTop: 0 }}>Print Details</h4>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 16
          }}
        >
          <div>
            <label style={{ display: "block", marginBottom: 8 }}>
              Type of Document
            </label>

            <select
              name="documentType"
              value={printDetails.documentType}
              onChange={handleChange}
              className="input"
              style={{ width: "100%", padding: 12, borderRadius: 10 }}
            >
              <option>Assignment</option>
              <option>Resume</option>
              <option>Project Report</option>
              <option>Notes</option>
              <option>Presentation</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 8 }}>
              Priority
            </label>

            <select
              name="priority"
              value={printDetails.priority}
              onChange={handleChange}
              className="input"
              style={{ width: "100%", padding: 12, borderRadius: 10 }}
            >
              <option>Normal</option>
              <option>Urgent</option>
              <option>Express</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 8 }}>
              Type of Pages
            </label>

            <select
              name="pageType"
              value={printDetails.pageType}
              onChange={handleChange}
              className="input"
              style={{ width: "100%", padding: 12, borderRadius: 10 }}
            >
              <option>Black & White</option>
              <option>Colour</option>
              <option>Single Side</option>
              <option>Double Side</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 8 }}>
              No. of Pages
            </label>

            <input
              type="number"
              min="1"
              name="numberOfPages"
              value={printDetails.numberOfPages}
              onChange={handleChange}
              placeholder="Enter number of pages"
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 10
              }}
            />
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div className="kicker">Selected files</div>

          {files.map((f, i) => (
            <div
              key={i}
              className="glass-shadow"
              style={{
                padding: 12,
                background: "rgba(255,255,255,0.20)",
                borderRadius: 12,
                border: "1px solid rgba(13,148,136,0.25)",
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12
              }}
            >
              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: 500
                }}
              >
                {f.name}
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>
                  {Math.round(f.size / 1024)} KB
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveFile(i)}
                  className="btn btn-ghost"
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={{ textAlign: "right", marginTop: 6 }}>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClearAll}
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

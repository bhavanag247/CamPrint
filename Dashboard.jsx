import { useState } from "react";
import "./Dashboard.css";
import PrintPopup from "./PrintPopup";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // 🔥 popup state

  function handleFileChange(e) {
    const selectedFiles = Array.from(e.target.files);

    setFiles((prevFiles) => {
      const combined = [...prevFiles, ...selectedFiles];
      return combined.slice(0, 5); // max 5 files
    });

    e.target.value = ""; // allow reselecting same file
  }

  function removeFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Print Dashboard</h1>

      <div className="dashboard-grid">
        {/* 📄 Upload */}
        <div className="dash-card">
          <h3>📄 Upload Document</h3>
          <p>Upload PDFs or images (max 5 files)</p>

          {files.length < 5 && (
            <label className="btn btn-primary">
              Choose Files
              <input
                type="file"
                accept=".pdf,image/*"
                multiple
                onChange={handleFileChange}
                hidden
              />
            </label>
          )}

          {files.length > 0 && (
            <div className="file-list">
              {files.map((file, index) => (
                <div className="file-item" key={index}>
                  <span title={file.name}>{file.name}</span>
                  <button
                    className="btn btn-ghost"
                    onClick={() => removeFile(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 🎨 YOUR TASK: Print Styling */}
        <div className="dash-card">
          <h3>🎨 Print Styling</h3>
          <p>Choose color, copies, and paper size</p>

          <button
            className="btn btn-primary"
            onClick={() => setShowPopup(true)} // 🔥 OPEN POPUP
          >
            Customize
          </button>
        </div>

        {/* ⏳ Status */}
        <div className="dash-card">
          <h3>⏳ Print Status</h3>
          <p>Status: Pending</p>
          <button className="btn btn-primary">View Status</button>
        </div>

        {/* 💰 Summary */}
        <div className="dash-card">
          <h3>💰 Print Summary</h3>
          <p>Pages, cost & pickup slot</p>
          <button className="btn btn-primary">View Summary</button>
        </div>
      </div>

      {/* 🔥 YOUR POPUP LIVES HERE */}
      <PrintPopup
        open={showPopup}
        onClose={() => setShowPopup(false)}
        files={files}   // optional: pass files later if needed
      />
    </div>
  );
}

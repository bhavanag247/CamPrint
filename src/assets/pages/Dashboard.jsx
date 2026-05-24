import { useState } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [showPrintStyling, setShowPrintStyling] = useState(false);
  const [showPrintStatus, setShowPrintStatus] = useState(false);
  const [showPrintSummary, setShowPrintSummary] = useState(false);

  /* ======================
     FILE UPLOAD LOGIC
     ====================== */
  function handleFileChange(e) {
  const selectedFiles = Array.from(e.target.files);

  // Save first file for admin download
  if (selectedFiles[0]) {
    localStorage.setItem(
      "fileURL",
      URL.createObjectURL(selectedFiles[0])
    );
  }

  setFiles((prevFiles) => {
    const combined = [...prevFiles, ...selectedFiles];


    // ===============================
// SUBMIT PRINT JOB TO ADMIN PANEL
// ===============================
function submitPrintJob() {
  if (!files.length) {
    alert("Please upload a file");
    return;
  }

  const job = {
    id: "job_" + Date.now(),
    fileName: files[0].name,
    fileURL: URL.createObjectURL(files[0]),
    user: "Student",
    printType,
    paperSize,
    copies,
    pickupTime,
    status: "Pending",
  };

  const existingJobs =
    JSON.parse(localStorage.getItem("printJobs")) || [];

  localStorage.setItem(
    "printJobs",
    JSON.stringify([...existingJobs, job])
  );

  alert("Print job submitted!");
  setShowPrintStyling(false);
}


function saveOrderToLocalStorage(files) {
  const existingOrders =
    JSON.parse(localStorage.getItem("camprint_orders")) || [];

  const newOrder = {
    id: "CP-" + Date.now(),
    files: files.map((file) => ({
      name: file.name,
      size: file.size
    })),
    uploadedAt: new Date().toLocaleString(),
    status: "Pending"
  };

  existingOrders.push(newOrder);

  localStorage.setItem(
    "camprint_orders",
    JSON.stringify(existingOrders)
  );
}




    return combined.slice(0, 5); // max 5 files
  });

  e.target.value = "";
}

  function removeFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  /* ======================
     TIME SLOT GENERATOR
     ====================== */
  function generateTimeSlots() {
    const slots = [];
    let hour = 10;
    let minute = 0;

    while (hour < 16 || (hour === 16 && minute <= 30)) {
      const h = hour % 12 === 0 ? 12 : hour % 12;
      const ampm = hour < 12 ? "AM" : "PM";
      const m = minute.toString().padStart(2, "0");

      slots.push(`${h}:${m} ${ampm}`);

      minute += 15;
      if (minute === 60) {
        minute = 0;
        hour++;
      }
    }

    return slots;
  }

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Print Dashboard</h1>

      <div className="dashboard-grid">
        {/* ======================
           UPLOAD DOCUMENT
           ====================== */}
        <div className="dash-card">
          <h3>📁 Upload Document</h3>
          <p>Upload PDFs or images (max 5 files)</p>

          {files.length < 5 && (
            <label className="btn btn-primary">
              Choose Files
              <input
                type="file"
                accept=".pdf,image/*"
                multiple
                hidden
                onChange={handleFileChange}
              />
            </label>
          )}

          {files.length > 0 && (
            <div className="file-list">
              {files.map((file, index) => (
                <div className="file-item" key={index}>
                  <span title={file.name}>{file.name}</span>
                  <button onClick={() => removeFile(index)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ======================
           PRINT STYLING
           ====================== */}
        <div className="dash-card">
          <h3>🎨 Print Styling</h3>
          <p>Choose color, copies, and paper size</p>

          <button
            className="btn btn-primary"
            onClick={() => setShowPrintStyling(true)}
          >
            Customize
          </button>
        </div>

        {/* ======================
           PRINT STATUS
           ====================== */}
        <div className="dash-card">
          <h3>⏳ Print Status</h3>
          <p>Status: Pending</p>
          <button
          className="btn btn-primary"
          onClick={() => setShowPrintStatus(true)}
          >
          View Status
        </button>

        </div>
        {showPrintStatus && (
  <div
    className="popup-overlay"
    onClick={() => setShowPrintStatus(false)}
  >
    <div
      className="popup-box"
      onClick={(e) => e.stopPropagation()}
    >
      <h3>Print Status</h3>

      <div className="popup-row">
        <label>Status</label>
        <p>
  🟡 {JSON.parse(localStorage.getItem("printJob"))?.status || "Pending"}
</p>

      </div>

      <div className="popup-row">
        <label>File</label>
        <p>{files[0]?.name || "No file selected"}</p>
      </div>

      <div className="popup-row">
        <label>Print Type</label>
        <p>Color</p>
      </div>

      <div className="popup-row">
        <label>Paper Size</label>
        <p>A4</p>
      </div>

      <div className="popup-row">
        <label>Copies</label>
        <p>1</p>
      </div>

      <div className="popup-row">
        <label>Pickup Time</label>
        <p>10:00 AM</p>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => setShowPrintStatus(false)}
      >
        Close
      </button>
    </div>
  </div>
)}


        {/* ======================
           PRINT SUMMARY
           ====================== */}
        <div className="dash-card">
          <h3>💰 Print Summary</h3>
          <p>Pages, cost & pickup slot</p>
          <button
        className="btn btn-primary"
          onClick={() => setShowPrintSummary(true)}
          >
          View Summary
        </button>

        </div>
      </div>
      {showPrintSummary && (
  <div
    className="popup-overlay"
    onClick={() => setShowPrintSummary(false)}
  >
    <div
      className="popup-box"
      onClick={(e) => e.stopPropagation()}
    >
      <h3>Print Summary</h3>

      <div className="popup-row">
        <label>File</label>
        <p>{files[0]?.name || "No file selected"}</p>
      </div>

      <div className="popup-row">
        <label>Print Type</label>
        <p>Color</p>
      </div>

      <div className="popup-row">
        <label>Paper Size</label>
        <p>A4</p>
      </div>

      <div className="popup-row">
        <label>Copies</label>
        <p>1</p>
      </div>

      <div className="popup-row">
        <label>Pages</label>
        <p>10</p>
      </div>

      <div className="popup-row">
        <label>Total Cost</label>
        <p>₹30</p>
      </div>

      <div className="popup-row">
        <label>Pickup Time</label>
        <p>10:00 AM</p>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => setShowPrintSummary(false)}
      >
        Close
      </button>
    </div>
  </div>
)}


      {/* ======================
         PRINT STYLING POPUP
         ====================== */}
      {showPrintStyling && (
        <div
          className="popup-overlay"
          onClick={() => {
  const job = {
    file: files[0]?.name || "Unknown",
    type: "Color",
    size: "A4",
    copies: 1,
    time: "10:00 AM",
    status: "Pending",
  };

  localStorage.setItem("printJob", JSON.stringify(job));
  setShowPrintStyling(false);
}}

        >
          <div
            className="popup-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Print Styling</h3>

            <div className="popup-row">
              <label>File</label>
              <p>{files[0]?.name || "No file selected"}</p>
            </div>

            <div className="popup-row">
              <label>Print Type</label>
              <select>
                <option>Color</option>
                <option>Black & White</option>
              </select>
            </div>

            <div className="popup-row">
              <label>Paper Size</label>
              <select>
                <option>A4</option>
                <option>A3</option>
                <option>A2</option>
                <option>A1</option>
              </select>
            </div>

            <div className="popup-row">
              <label>Copies</label>
              <input type="number" min="1" defaultValue="1" />
            </div>

            <div className="popup-row">
              <label>Pickup Time</label>
              <select>
                {generateTimeSlots().map((slot) => (
                  <option key={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setShowPrintStyling(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

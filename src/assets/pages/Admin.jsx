import "./Admin.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Admin() {
    const navigate = useNavigate();

useEffect(() => {
  if (localStorage.getItem("adminAuth") !== "true") {
    navigate("/admin-login");
  }
}, []);

  const printJobs = [
    {
      id: 1,
      file: "assignment.pdf",
      user: "Student A",
      type: "Color",
      size: "A4",
      copies: 1,
      time: "10:15 AM",
      status: "Pending",
    },
    {
      id: 2,
      file: "notes.jpg",
      user: "Student B",
      type: "Black & White",
      size: "A3",
      copies: 2,
      time: "11:00 AM",
      status: "Printing",
    },
  ];

  return (
    <div className="admin-wrapper">
      <h1 className="admin-title">Admin Print Panel</h1>

      <div className="admin-grid">
        {printJobs.map((job) => (
          <div className="admin-card" key={job.id}>
            <h3>{job.file}</h3>
            <p><strong>User:</strong> {job.user}</p>
            <p><strong>Type:</strong> {job.type}</p>
            <p><strong>Paper:</strong> {job.size}</p>
            <p><strong>Copies:</strong> {job.copies}</p>
            <p><strong>Pickup:</strong> {job.time}</p>

            <select defaultValue={job.status}>
              <option>Pending</option>
              <option>Printing</option>
              <option>Ready</option>
            </select>

            <button
  className="btn btn-primary"
  onClick={() => {
    const url = localStorage.getItem("fileURL");
    if (url) {
      const a = document.createElement("a");
      a.href = url;
      a.download = "print-file";
      a.click();
    } else {
      alert("No file available");
    }
  }}
>
  Download File
</button>

          </div>
        ))}
      </div>
    </div>
  );
}

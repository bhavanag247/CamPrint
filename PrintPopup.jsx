import { useState, useEffect } from "react";
import "./PrintPopup.css";

export default function PrintPopup({ show, onClose }) {
  const [copies, setCopies] = useState(1);
  const [color, setColor] = useState("bw");
  const [size, setSize] = useState("A4");
  const [timeSlot, setTimeSlot] = useState("");
  const [price, setPrice] = useState(0);
  const [timeSlots, setTimeSlots] = useState([]);

  // Generate 15-min interval time slots
  useEffect(() => {
    const slots = [];
    const startHour = 9; // 9:00 AM
    const endHour = 18; // 6:00 PM
    for (let h = startHour; h < endHour; h++) {
      for (let m = 0; m < 60; m += 15) {
        const hourStr = h.toString().padStart(2, "0");
        const minStr = m.toString().padStart(2, "0");
        slots.push(`${hourStr}:${minStr}`);
      }
    }
    setTimeSlots(slots);
    setTimeSlot(slots[0]);
  }, []);

  // Price calculation logic
  useEffect(() => {
    let base = size === "A4" ? 5 : 10; // Rs/page
    base *= copies;
    if (color === "color") base += 10 * copies;
    setPrice(base);
  }, [copies, color, size]);

  if (!show) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Print Styling & Time Slot</h2>

        <div className="popup-row">
          <label>
            Copies:
            <input
              type="number"
              min="1"
              value={copies}
              onChange={(e) => setCopies(Number(e.target.value))}
            />
          </label>

          <label>
            Color:
            <select value={color} onChange={(e) => setColor(e.target.value)}>
              <option value="bw">Black & White</option>
              <option value="color">Color</option>
            </select>
          </label>

          <label>
            Paper Size:
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="A4">A4</option>
              <option value="A3">A3</option>
            </select>
          </label>
        </div>

        <label>
          Time Slot:
          <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>

        <div className="price-display">Total Price: Rs {price}</div>

        <div className="popup-buttons">
          <button className="btn btn-primary" onClick={onClose}>
            Confirm
          </button>
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PrintPopup({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>✕</button>
        {/* your content */}
      </div>
    </div>
  );
}

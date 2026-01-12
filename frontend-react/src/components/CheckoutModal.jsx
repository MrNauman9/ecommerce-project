import { useState } from "react";

export default function CheckoutModal({ open, onClose, onPay, loading, total }) {
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");

  if (!open) return null;

  const canPay =
    name.trim() && card.trim().length >= 8 && exp.trim() && cvc.trim().length >= 3;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="row">
          <div style={{ fontWeight: 900, fontSize: 18 }}>Demo Card Payment</div>
          <button className="btn btnSecondary" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="muted">
          This is a <b>demo</b>. No real credit card is charged.
        </div>

        <div className="field">
          <label className="muted">Cardholder name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
        </div>

        <div className="field">
          <label className="muted">Card number (dummy)</label>
          <input
            value={card}
            onChange={(e) => setCard(e.target.value)}
            placeholder="4111 1111 1111 1111"
          />
        </div>

        <div className="row" style={{ gap: 12 }}>
          <div className="field" style={{ flex: 1 }}>
            <label className="muted">Expiry</label>
            <input value={exp} onChange={(e) => setExp(e.target.value)} placeholder="12/29" />
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label className="muted">CVC</label>
            <input value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" />
          </div>
        </div>

        <button className="btn" disabled={!canPay || loading} onClick={onPay}>
          {loading ? "Processing..." : `Pay $${Number(total || 0).toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}

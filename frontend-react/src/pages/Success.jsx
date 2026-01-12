import { Link } from "react-router-dom";

export default function Success({ receipt }) {
  return (
    <div className="container" style={{ padding: "30px 0" }}>
      <div className="successBox">
        <h2 style={{ margin: 0 }}>✅ Payment Successful (Demo)</h2>
        <p className="muted">
          Your order is confirmed. This is a demo flow (dummy card), so no real card was charged.
        </p>

        <div className="hr" />

        <div style={{ display: "grid", gap: 8 }}>
          <div><b>Order ID:</b> {receipt?.orderId ?? "-"}</div>
          <div><b>Payment ID:</b> {receipt?.paymentId ?? "-"}</div>
          <div><b>Total:</b> ${Number(receipt?.total || 0).toFixed(2)}</div>
        </div>

        <div className="hr" />

        <Link to="/" className="btn" style={{ display: "inline-block" }}>
          Back to shop
        </Link>
      </div>
    </div>
  );
}

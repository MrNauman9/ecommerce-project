export default function CartDrawer({
    open,
    cart,
    onClose,
    onInc,
    onDec,
    onRemove,
    onClear,
    onCheckout,
  }) {
    if (!open) return null;
  
    const items = cart?.items ?? [];
    const total = Number(cart?.total ?? 0);
  
    return (
      <div className="drawerOverlay" onClick={onClose}>
        <div className="drawer" onClick={(e) => e.stopPropagation()}>
          <div className="drawerHeader">
            <div style={{ fontWeight: 900 }}>Your Cart</div>
            <button className="btn btnSecondary" onClick={onClose}>
              Close
            </button>
          </div>
  
          <div style={{ overflow: "auto", display: "grid", gap: 10 }}>
            {items.length === 0 ? (
              <div className="muted">Cart is empty. Add some gadgets 😄</div>
            ) : (
              items.map((it) => {
                const pid = it?.productId ?? it?.id;
                const name = it?.name ?? "Item";
                const unit = Number(it?.unitPrice ?? 0);
                const qty = Number(it?.quantity ?? 0);
  
                return (
                  <div className="item" key={pid ?? name}>
                    <div className="row">
                      <div style={{ fontWeight: 900 }}>{name}</div>
                      <button
                        className="btn btnSecondary"
                        onClick={() => onRemove(pid)}
                        disabled={!pid}
                      >
                        Remove
                      </button>
                    </div>
  
                    <div className="row">
                      <div className="muted">
                        ${unit.toFixed(2)} × {qty} ={" "}
                        <b>${(unit * qty).toFixed(2)}</b>
                      </div>
  
                      <div className="qty">
                        <button
                          className="iconBtn"
                          onClick={() => onDec(pid, qty)}
                          disabled={!pid}
                        >
                          −
                        </button>
                        <span style={{ minWidth: 22, textAlign: "center", fontWeight: 800 }}>
                          {qty}
                        </span>
                        <button
                          className="iconBtn"
                          onClick={() => onInc(pid, qty)}
                          disabled={!pid}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
  
          <div>
            <div className="hr" />
            <div className="row">
              <div style={{ fontWeight: 900 }}>Total</div>
              <div style={{ fontWeight: 900 }}>${total.toFixed(2)}</div>
            </div>
  
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button className="btn btnSecondary" onClick={onClear} style={{ flex: 1 }}>
                Clear
              </button>
              <button
                className="btn"
                onClick={onCheckout}
                style={{ flex: 1 }}
                disabled={items.length === 0}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
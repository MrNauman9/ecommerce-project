export default function Navbar({ cartCount, onOpenCart }) {
    return (
      <div className="nav">
        <div className="container navInner">
          <div className="brand">
            <span style={{ fontSize: 18 }}>⚡</span>
            <span>ElectroMart</span>
            <span className="badge">Electronics Shop</span>
          </div>
  
          <button className="btn" onClick={onOpenCart}>
            Cart ({cartCount})
          </button>
        </div>
      </div>
    );
  }
  
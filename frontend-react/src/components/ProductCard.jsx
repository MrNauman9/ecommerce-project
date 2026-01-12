export default function ProductCard({ product, imageUrl, onAdd }) {
    const name = product?.name ?? product?.title ?? "Unknown product";
    const description =
      product?.description ?? "High-quality electronics for your daily needs.";
    const id = product?.id ?? product?.productId ?? 0;
  
    const priceNumber = Number(product?.price ?? 0);
    const priceText = Number.isFinite(priceNumber) ? priceNumber.toFixed(2) : "0.00";
  
    return (
      <div className="card">
        <img className="cardImg" src={imageUrl} alt={name} />
        <div className="cardBody">
          <div className="cardTitle">
            <span>{name}</span>
            <span className="price">${priceText}</span>
          </div>
  
          <div className="muted">{description}</div>
  
          <div className="row">
            <button className="btn" onClick={() => onAdd(id)} disabled={!id}>
              Add to cart
            </button>
            <span className="badge">Electronics</span>
          </div>
        </div>
      </div>
    );
  }
  
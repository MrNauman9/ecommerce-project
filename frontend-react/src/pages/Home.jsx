import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import CartDrawer from "../components/CartDrawer";
import CheckoutModal from "../components/CheckoutModal";

const imageFor = (product) => {
  const picks = [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=60",
    "https://images.unsplash.com/photo-1518441902117-f0a3d1a2b8ad?auto=format&fit=crop&w=1200&q=60",
    "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=1200&q=60",
    "https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=1200&q=60",
    "https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=1200&q=60",
    "https://images.unsplash.com/photo-1585298723682-7115561c51b7?auto=format&fit=crop&w=1200&q=60",
  ];

  const id = Number(product?.id ?? product?.productId ?? 1);
  return picks[id % picks.length];
};

export default function Home({ onSuccess = () => {} }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);
  const [error, setError] = useState("");

  const cartCount = useMemo(
    () => (cart?.items || []).reduce((a, i) => a + Number(i?.quantity ?? 0), 0),
    [cart]
  );

  const loadProducts = async () => {
    const res = await api.get("/api/products");
    const list = Array.isArray(res.data) ? res.data : [];
    setProducts(list.filter((p) => p && (p.id || p.productId)));
  };

  const loadCart = async () => {
    const res = await api.get("/api/cart");
    setCart(res.data);
  };

  useEffect(() => {
    (async () => {
      try {
        await loadProducts();
        await loadCart();
      } catch (e) {
        setError("Backend not reachable. Make sure Spring Boot is running on http://localhost:8080");
      }
    })();
  }, []);

  const addToCart = async (productId) => {
    if (!productId) return;
    setError("");
    try {
      const res = await api.post("/api/cart/items", { productId, quantity: 1 });
      setCart(res.data);
      setCartOpen(true);
    } catch {
      setError("Failed to add to cart. Check backend and product id.");
    }
  };

  const removeItem = async (productId) => {
    if (!productId) return;
    const res = await api.delete(`/api/cart/items/${productId}`);
    setCart(res.data);
  };

  const clearCart = async () => {
    await api.delete("/api/cart/clear");
    await loadCart();
  };

  const inc = async (productId, currentQty) => {
    if (!productId) return;
    const res = await api.patch(`/api/cart/items/${productId}`, {
      quantity: Number(currentQty ?? 0) + 1,
    });
    setCart(res.data);
  };

  const dec = async (productId, currentQty) => {
    if (!productId) return;
    const newQty = Number(currentQty ?? 0) - 1;
    if (newQty <= 0) {
      await removeItem(productId);
      return;
    }
    const res = await api.patch(`/api/cart/items/${productId}`, { quantity: newQty });
    setCart(res.data);
  };

  const startCheckout = async () => {
    setError("");
    try {
      await loadCart();
      const items = cart?.items ?? [];
      if (!items.length) {
        setError("Cart is empty.");
        return;
      }
      setPayOpen(true);
    } catch {
      setError("Could not open checkout.");
    }
  };

  const payDemo = async () => {
    setLoadingPay(true);
    setError("");

    try {
      const orderRes = await api.post("/api/checkout");
      const order = orderRes.data;

      const payRes = await api.post(`/api/payments/nets/create-session?orderId=${order.id}`);
      const paymentId = payRes.data?.paymentId ?? "demo-payment";

      await api.delete("/api/cart/clear");
      await loadCart();

      onSuccess({ orderId: order.id, total: order.total, paymentId });
    } catch {
      setError("Payment failed (demo). Please try again.");
    } finally {
      setLoadingPay(false);
      setPayOpen(false);
      setCartOpen(false);
    }
  };

  return (
    <>
      <Navbar cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

      <div className="container">
        <div className="hero">
          <h1>Electronics that feel premium.</h1>
          <p>
            Welcome to <b>ElectroMart</b> — a simple demo electronics shop. Browse products, add to cart, checkout,
            and pay with a <b>dummy card</b>.
          </p>

          {error && (
            <div className="successBox" style={{ borderColor: "rgba(255,80,80,0.35)" }}>
              {error}
            </div>
          )}
        </div>

        <div className="grid">
          {products.map((p) => (
            <ProductCard
              key={p.id ?? p.productId}
              product={p}
              imageUrl={imageFor(p)}
              onAdd={addToCart}
            />
          ))}
        </div>
      </div>

      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onInc={inc}
        onDec={dec}
        onRemove={removeItem}
        onClear={clearCart}
        onCheckout={startCheckout}
      />

      <CheckoutModal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        onPay={payDemo}
        loading={loadingPay}
        total={cart?.total ?? 0}
      />
    </>
  );
}

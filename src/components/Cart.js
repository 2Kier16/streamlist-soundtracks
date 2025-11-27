import { useContext } from "react";
import { CartContext } from "../context/CartContext";

import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  console.log("Cart contents:", cart); // Debugging

  return (
    <div className="title-page">
      <h2 className="page-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.cover || "https://via.placeholder.com/80x80?text=No+Cover"}
                alt={item.title}
                className="cart-cover"
              />
              <div className="cart-meta">
                <h3>{item.title}</h3>
                <p>{item.artist}</p>
                {item.album && <p>Album: {item.album}</p>}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <p className="cart-summary">Total items: {cart.length}</p>
        </>
      )}
    </div>
  );
};

export default Cart;

import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from 'react-router-dom';
import "../css/Cart.css";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0);

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
                src={item.artwork || "https://via.placeholder.com/80x80?text=No+Cover"}
                alt={item.title}
                className="cart-cover"
              />
              <div className="cart-meta">
                <h3>{item.title}</h3>
                <p>{item.artist}</p>
                <p className="cart-price">${item.price?.toFixed(2)}</p>

                {/* Show Spotify link if available */}
                {item.spotifyUrl && (
                  <a
                    href={item.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spotify-link"
                  >
                    Listen on Spotify
                  </a>
                )}

                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <p className="cart-summary">
            Total items: {cart.length} | Total price: ${totalPrice.toFixed(2)}
          </p>
        </>
      )}
      <div style={{ marginTop: 20 }}>
  <Link to="/checkout">
    <button>Checkout</button>
  </Link>
</div>

    </div>
  );
};

export default Cart;

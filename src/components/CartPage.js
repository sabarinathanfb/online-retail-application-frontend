import React from 'react';
import '../styles/CartPage.css';

function CartPage({ cart, setCart }) {
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId)); // Remove product from cart
  };

  console.log('Cart Items:', cart);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default CartPage;

import React, { useState , useEffect } from 'react';
import '../styles/CartPage.css';

function CartPage({ cart, setCart }) {
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId)); // Remove product from cart
  };

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate total price whenever cart changes
    const newTotalPrice = cart.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);
    setTotalPrice(newTotalPrice);
  }, [cart]);

  return (
    <div className="cart-page">
      
      {cart.length === 0 ? (
        <p className='container'>Your Cart is Empty.</p>
      ): <div className='container'>
      <div>
        <div className='address'>
          <p>D.NO:80,Anandur P.O, Krishnagiri</p>
          <button >Change Address</button>
        </div>
        <div className='cart-item'>
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
          </div>
        <div className='place-order'><button> Place Order </button></div></div>
      <div className='price-detail'>
        <h6>Price Deatils</h6>
        <div>
          <p>Price{cart.length} {totalPrice}</p>
          <p>Discount </p>
          <p>Coupon</p>
          <p>Delivery Charge</p>
        </div>
        <p>Total Amount</p>
      </div>
    </div>}
    </div>
  );
}


export default CartPage;

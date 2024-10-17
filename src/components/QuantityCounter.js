import { useState, useEffect } from "react";

const QuantityCounter = ({ inCart, handleAddToCart }) => {
  const [quantity, setQuantity] = useState(inCart ? inCart.quantity : 0);

  const handleIncreaseQuantity = (event) => {
    event.stopPropagation(); // To prevent navigation when increasing quantity
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = (event) => {
    event.stopPropagation(); // To prevent navigation when decreasing quantity
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  // If quantity is 0, show the "Add to Cart" button
  if (quantity === 0) {
    return (
      <button onClick={(event) => { event.stopPropagation(); handleAddToCart(); }}>
        Add to Cart
      </button>
    );
  }

  return (
    <div>
      <button onClick={handleDecreaseQuantity}>-</button>
      <span>{quantity}</span>
      <button onClick={handleIncreaseQuantity}>+</button>
    </div>
  );
};

export default QuantityCounter;

import { useState, useEffect } from "react";

const QuantityCounter = ({ inCart, handleAddToCart, handleUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(inCart ? inCart.quantity : 0);

  const handleIncreaseQuantity = (event) => {
    event.stopPropagation(); // To prevent navigation when increasing quantity
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    handleUpdateQuantity(newQuantity); // Update quantity in parent
  };

  const handleDecreaseQuantity = (event) => {
    event.stopPropagation(); // To prevent navigation when decreasing quantity
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      handleUpdateQuantity(newQuantity); // Update quantity in parent
    } else {
      // If quantity is 1 and decrement is pressed, remove from cart
      setQuantity(0); // Reset quantity to 0
      handleUpdateQuantity(0); // Remove item from cart in parent
    }
  };

  useEffect(() => {
    if (quantity === 0 && inCart) {
      setQuantity(inCart.quantity);
    }
  }, [inCart]);

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

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuantityCounter from '../components/QuantityCounter';
import '../styles/HomePage.css'; // Ensure you style this CSS

function HomePage({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleAddToCart = (product) => {
    const isProductInCart = cart.some(item => item.id === product.id);
    if (!isProductInCart) {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      // Remove the item from the cart when quantity is 0
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    } else {
      // Update the item quantity in the cart
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };


  return (
    <div className="home-page">
      <div className="product-grid">
        {products.map((product) => {
          const inCart = cart.find((item) => item.id === product.id); // Check if product is in the cart
          return (
            <div 
              key={product.id} 
              className="product-card" 
              onClick={() => navigate(`/product/${product.id}`)} // Navigate on click
            >
              <img src={product.image} alt={product.title} className="product-image" />
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              {/* Pass the correct props to QuantityCounter */}
              <QuantityCounter
                inCart={inCart} // inCart will either be the item from the cart or undefined
                handleAddToCart={() => handleAddToCart(product)} // Adds item to the cart
                handleUpdateQuantity={(newQuantity) => handleUpdateQuantity(product.id, newQuantity)} // Updates quantity
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;

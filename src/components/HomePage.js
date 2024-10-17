import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuantityCounter from '../components/QuantityCounter';
import '../styles/HomePage.css'; // Ensure you style this CSS

function HomePage({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  // const [cart, setCart] = useState([]); // Initialize cart as an array
  const navigate = useNavigate(); // For navigation

  const count = 0;

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleAddToCart = (product, event) => {
    event.stopPropagation(); 
    const isProductInCart = cart.some(item => item.id === product.id);

    if (!isProductInCart) {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const handleIncreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };
  

  

  return (
    <div className="home-page">
      <div className="product-grid">
        {products.map((product) => {
          const inCart = cart.find((item) => item.id === product.id);
          return (
            <div 
              key={product.id} 
              className="product-card" 
              onClick={() => handleProductClick(product.id)} // Navigate on click
            >
              <img src={product.image} alt={product.title} className="product-image" />
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              {inCart ? (
                <div className="quantity-controls">
                  <button onClick={(event) => { event.stopPropagation(); handleDecreaseQuantity(product.id); }}>
                    -
                  </button>
                  <span>{inCart.quantity}</span> {/* Display current quantity */}
                  <button onClick={(event) => { event.stopPropagation(); handleIncreaseQuantity(product.id); }}>
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={(event) => handleAddToCart(product, event)} // Pass event to prevent propagation
                >
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;

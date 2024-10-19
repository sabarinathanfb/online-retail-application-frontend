import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuantityCounter from '../components/QuantityCounter';
import '../styles/HomePage.css';

const HomePage = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products/getAllProduct');
      if (!response.ok) {
        throw new Error(`Error fetching products: ${response.statusText}`);
      }

      const productData = await response.json();
      setProducts(productData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const isProductInCart = cart.some((item) => item.id === product.id);
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

  if (products.length === 0) {
    return <div>Loading...</div>; // Show loading state if products are not yet fetched
  }

  return (
    <div className="home-page">
      <div className="product-grid">
        {products.map((product) => {
          const inCart = cart.find((item) => item.id === product.id); // Check if the product is in the cart
          const base64Image = `data:image/jpeg;base64,${product.image}`; // Assuming image is in Base64

          return (
            <div
              key={product.id}
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)} // Navigate on click
            >
              <img src={base64Image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
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
};

export default HomePage;

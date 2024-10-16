import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css'; // Ensure you style this CSS

function HomePage({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  // const [cart, setCart] = useState([]); // Initialize cart as an array
  const navigate = useNavigate(); // For navigation

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
      setCart((prevCart) => {
        const updatedCart = [...prevCart, { ...product, quantity: 1 }];
        // console.log('Cart after addition:', updatedCart); // Log after adding
        return updatedCart;
      });
    }
  };
  

  

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to ProductDetail page
  };

  return (
    <div className="home-page">
      <div className="product-grid">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="product-card" 
            onClick={() => handleProductClick(product.id)} // Navigate on click
          >
            <img src={product.image} alt={product.title} className="product-image" />
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <button
              onClick={(event) => handleAddToCart(product, event)} // Pass event to prevent propagation
              // disabled={cart.some(item => item.id === product.id)} // Disable if in cart
            >
              {cart.some(item => item.id === product.id) ? 'In Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

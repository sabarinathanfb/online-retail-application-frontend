import React, { useEffect, useState } from 'react';
import '../styles/HomePage.css'; // Ensure you style this CSS

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the products from the API
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data)) // Save the products in state
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="home-page">
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p> {/* Display price */}
            <p>Category: {product.category}</p> {/* Display category */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

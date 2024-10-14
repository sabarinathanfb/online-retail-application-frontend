import React from 'react';
import '../styles/HomePage.css'; // You can create and style this CSS file

function HomePage() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome to Our Online Retail Shop!</h1>
        <p>Find the best products at unbeatable prices!</p>
      </header>
      
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {/* You can replace these with dynamic product components */}
          <div className="product-card">
            <img src="/path-to-product1.jpg" alt="Product 1" />
            <h3>Product 1</h3>
            <p>$10.00</p>
          </div>
          <div className="product-card">
            <img src="/path-to-product2.jpg" alt="Product 2" />
            <h3>Product 2</h3>
            <p>$20.00</p>
          </div>
          <div className="product-card">
            <img src="/path-to-product3.jpg" alt="Product 3" />
            <h3>Product 3</h3>
            <p>$30.00</p>
          </div>
        </div>
      </section>
      
      <footer className="home-footer">
        <p>© 2024 Online Retail Shop. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;

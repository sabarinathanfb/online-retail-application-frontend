import React from 'react';
import '../styles/GetAllStock.css';

function GetAllStock({ products }) {
  // Ensure products is an array to avoid errors
  const productList = Array.isArray(products) ? products : [];

  return (
    <div>
      <h2>All Stock</h2>
      {productList.length === 0 ? ( // Conditional rendering for empty state
        <p>No products available.</p>
      ) : (
        <ul>
          {productList.map(product => (
            <li key={product.id}>
    
              {product.name} - Quantity: {product.quantity}
              {}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GetAllStock;

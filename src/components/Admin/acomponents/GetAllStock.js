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
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Brand</th>
              <th>sku</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {productList.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.sku}</td>
                <td>{product.quantity}</td>
            
              
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GetAllStock;

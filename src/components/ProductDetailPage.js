import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductDetailPage.css';

function ProductDetail() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null); // New state for errors

  useEffect(() => {
    // Fetch the details for the specific product
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error fetching product details: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        if (Object.keys(data).length === 0) {
          throw new Error("No product found");
        }
        setProduct(data); // Set the product data
      })
      .catch(err => {
        console.error(err);
        setError(err.message); // Capture the error message
      });
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>; // Display error message if error exists
  }

  if (!product) {
    return <div>Loading...</div>; // Show loading state if product is not yet fetched
  }

  return (
    <div className="product-details">
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
    </div>
  );
}

export default ProductDetail;

import React, { useState } from 'react';
import '../styles/AddProduct.css';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(''); // State for storing the message

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // For previewing the image
    }
  };

  // Handle product submission
  const handleProductSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:8080/api/products/addNewProduct', {
        method: 'POST',
        body: formData, // Send FormData object with product details and image
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // Return the JSON response
      console.log('Product added:', data);
      return data; // Return the data to the caller
    } catch (error) {
      console.error('Error adding product:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a form data object to submit product details including the image
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);

    // Call the handleProductSubmit function to submit the form data
    try {
      const response = await handleProductSubmit(formData);
      setMessage(response.message); // Set success message
    } catch (error) {
      setMessage("Error adding product: " + error.message); // Set error message
    }
  };

  return (
    <div className='add-product'>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input 
            id="product-name" 
            type="text" 
            value={productName} 
            onChange={(e) => setProductName(e.target.value)} 
            placeholder="Enter product name" 
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="price">Price</label>
          <input 
            id="price" 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            placeholder="Enter price" 
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="image">Choose Image</label>
          <input 
            id="image" 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            required
          />
        </div>
        {preview && (
          <div className="image-preview">
            <p>Image Preview:</p>
            <img src={preview} alt="Preview" />
          </div>
        )}
        <button type="submit" className="submit-btn">Add Product</button>
      </form>
      {message && <div className="message">{message}</div>} {/* Display the message */}
    </div>
  );
}

export default AddProduct;

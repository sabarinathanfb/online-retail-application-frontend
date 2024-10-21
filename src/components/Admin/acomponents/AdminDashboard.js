import React, { useState } from 'react';
import '../styles/AdminDashboard.css';
import { Link } from 'react-router-dom';
import AddProduct from './AddProduct';
import GetAllStock from './GetAllStock';

function AdminDashboard({ products }) {
  const [showProductMenu, setShowProductMenu] = useState(false);
  const [showInventoryMenu, setShowInventoryMenu] = useState(false);
  const [activeContent, setActiveContent] = useState(null); // State to manage active content

  // Toggle the product management dropdown
  const toggleProductMenu = () => {
    setShowProductMenu(!showProductMenu);
  };

  // Toggle the inventory management dropdown
  const toggleInventoryMenu = () => {
    setShowInventoryMenu(!showInventoryMenu);
  };

  // Function to handle sidebar item clicks
  const handleSidebarClick = (content) => {
    setActiveContent(content); // Set the active content based on the clicked item
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <ul>
          <li>
            <span className="logo">AdminDashboard</span>
          </li>
          <li>
            <button onClick={toggleProductMenu}>
              <span>Product Management</span>
            </button>
            {showProductMenu && (
              <div className="product-menu">
                <li>
                  <Link to="#" onClick={() => handleSidebarClick('add')}>Add New Product</Link>
                </li>
                <li>
                  <Link to="#" onClick={() => handleSidebarClick('delete')}>Delete Product</Link>
                </li>
                <li>
                  <Link to="#" onClick={() => handleSidebarClick('update')}>Update Product</Link>
                </li>
                <li>
                  <Link to="#" onClick={() => handleSidebarClick('addMultiple')}>Add Multiple Products</Link>
                </li>
              </div>
            )}
          </li>
          <li>
            <span>User Management</span>
          </li>
          <li>
            <span>Order Management</span>
          </li>
          <li>
            <button onClick={toggleInventoryMenu}>
              <span>Inventory Management</span>
            </button>
            {showInventoryMenu && (
              <ul className="inventory-menu">
                <li>
                  <Link to="#" onClick={() => handleSidebarClick('stocks')}>Get All Product Stocks</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <span>Category Management</span>
          </li>
          <li>
            <span>Payment and Transaction</span>
          </li>
        </ul>
      </div>
      <div className="main-content">
        {/* Render the active content based on the state */}
        {activeContent === 'add' && <AddProduct />}
        {activeContent === 'stocks' && <GetAllStock products={products} />}
        {activeContent === null && <h1>Welcome to Admin Dashboard</h1>}
      </div>
    </div>
  );
}

export default AdminDashboard;

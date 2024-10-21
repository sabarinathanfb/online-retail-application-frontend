import React, {useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import AddProduct from './components/Admin/acomponents/AddProduct'
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import ProductDetailPage from './components/ProductDetailPage';
import CartPage from './components/CartPage';
import AdminDashboard from './components/Admin/acomponents/AdminDashboard';
import GetAllStock from './components/Admin/acomponents/GetAllStock';

function App() {
  const [username, setUsername] = useState(null); // State for username
  const [cart, setCart] = useState([]); // State for the cart
  const [products, setProducts] = useState([]);

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
  

  return (
    <Router>
      <div>
        <NavBar username={username} setUsername={setUsername} cart={cart}/>
        
        <div>
          <Routes>
            <Route path="/" element={<HomePage products={products} cart={cart} setCart={setCart} />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path='/addproduct' element={<AddProduct /> } />
            <Route path='/admin' element={<AdminDashboard products={products}/>} />
            <Route path="/login" element={<LoginPage setUsername={setUsername} />} />
            <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/stocks" element={<GetAllStock products={products}/>} />
          </Routes>
        </div>
      </div>  
    </Router>
  );
}

export default App;

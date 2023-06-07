import React from 'react';
import './App.css';
import Books from './components/Books';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import BookDetail from './components/BookDetail';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import BookItem from './components/BookItem';
import ShoppingCart from './components/ShopingCart';
import { useSelector } from 'react-redux';
import RegisterPage from './components/RegisterPage';
import PaymentPage from './components/PaymentPage';

function App() {
  const { userRole, isLoggedIn } = useSelector(state => state.authReducer);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/books"
          element={
            isLoggedIn && userRole === 'ADMIN' ? (
              <Books />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/logout" element={<LogoutForm />} />
        <Route path="/dang-ky" element={<RegisterPage />} />
        <Route path="/book-item/:id" element={<BookItem />} />
        <Route path="/pay" element={<PaymentPage />} />
        <Route path="/shoping-cart" element={<ShoppingCart />} />
        <Route path="/trang-chu" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;

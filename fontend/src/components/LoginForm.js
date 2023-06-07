import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
import '../styles/Login.css'; // Import the CSS file for styling
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authReducer';
import { updateCartItems } from '../redux/cartSlice';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // New state variable for password visibility
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

  useEffect(() => {
    // If user is already logged in, redirect to home page
    if (isLoggedIn) {
      navigate('/trang-chu');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        userName: username,
        passWord: password,
      };
      const response = await UserService.login(data);

      console.log(response);

      // Check server response
      if (response.status === 200) {
        const { token, role, idUser, cart } = response.data;

        // Set local storage
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userRole', role);
        localStorage.setItem('idUser', idUser);
        localStorage.setItem('cartid', cart.id);
        localStorage.setItem('username', cart.user.userName);

        const cartItems = cart && cart.items
          ? cart.items
            .filter((item) => item.book) // Lọc bỏ các phần tử với item.book là null hoặc undefined
            .map((item) => ({
              bookId: item.book.id,
              quantity: item.quantity,
            }))
          : [];

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        dispatch(updateCartItems(cartItems));
        // Dispatch login action
        dispatch(login(role));

        // Redirect to home page after login
        navigate('/trang-chu');
      } else {
        setErrorMessage('Đăng nhập không thành công.');
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
      setErrorMessage('Sai tài khoản hoặc mật khẩu');
    }
  };

  return (
    <div className="login-form-container">
      <h2>Đăng nhập</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Tên người dùng:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
              <input 
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
          </div>
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;    

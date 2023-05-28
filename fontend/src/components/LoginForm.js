import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
import '../styles/Login.css'; // Import the CSS file for styling
import { useDispatch } from 'react-redux';
import { login } from '../redux/authReducer';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
        const { token, role, idUser,cart} = response.data;
       // console(response.data)
       // const cartString = JSON.stringify(cart);

        //localStorage.setItem('cart', cartString); 
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userRole', role);
        localStorage.setItem('idUser', idUser);
        localStorage.setItem('cart', cart.id);
        console.log(role)
        console.log(token)
        console.log(idUser)
      //console.log(JSON.parse(cart))
        

        dispatch(login(role))

        //navigate('/home');

      } else {
        setErrorMessage('Đăng nhập không thành công.');
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
      setErrorMessage('Đã xảy ra lỗi.');
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

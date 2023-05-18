import React, { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();// Sử dụng hook useNavigate

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    //   const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //       const response = await fetch('http://localhost:8080/login', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //           username: username,
    //           password: password
    //         })
    //       });

    //       if (response.ok) {
    //         const token = await response.text();
    //         // Lưu mã token vào localStorage hoặc Redux store
    //         localStorage.setItem('accessToken', token);
    //         // Đăng nhập thành công, thực hiện các hành động khác
    //         navigate('/hello'); // Sử dụng navigate để chuyển hướng đến '/hello'
    //       } else {
    //         const errorData = await response.json();
    //         setErrorMessage(errorData.message);
    //       }
    //     } catch (error) {
    //       console.error('Đã xảy ra lỗi:', error);
    //     }
    //   };

    //   return (
    //     <div>
    //       <h2>Login</h2>
    //       {errorMessage && <div>{errorMessage}</div>}
    //       <form onSubmit={handleSubmit}>
    //         <div>
    //           <label htmlFor="username">Username:</label>
    //           <input
    //             type="text"
    //             id="username"
    //             value={username}
    //             onChange={(e) => setUsername(e.target.value)}
    //           />
    //         </div>
    //         <div>
    //           <label htmlFor="password">Password:</label>
    //           <input
    //             type="password"
    //             id="password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //           />
    //         </div>
    //         <button type="submit">Login</button>
    //       </form>
    //     </div>
    //   );
    return (
        <form action='http://localhost:8080/login' method='POST'>
            <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="text"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    )
};

export default LoginForm;

import React, { useState } from 'react';
import styles from "../styles/LoginForm.module.css";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div className={styles["login-form"]}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles["submit-button"]}>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

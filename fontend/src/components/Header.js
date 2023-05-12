import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Thay đổi đường dẫn liên kết CSS


const Header = ({ isLoggedIn }) => {
  const handleLogout = () => {
    // Xử lý đăng xuất tại đây
  };

  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/books" className="nav-link">Books</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <span className="welcome-message">Welcome, User!</span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

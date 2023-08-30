import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
    const [isLoading, setIsLoading] = useState(true);
    const { userRole, isLoggedIn } = useSelector(state => state.authReducer);
    const cartItems = useSelector(state => state.cart.cartItems);
    const cartItemCount = cartItems.length;

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('idUser');
        localStorage.removeItem('cartid');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('username');

    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-gradient" style={{ backgroundColor: "gainsboro" }}>
            <form className="d-flex">
                {userRole !== 'ADMIN' && isLoggedIn && (
                    <NavLink to="/shoping-cart" className="btn btn-outline-dark" activeClassName="active">
                        <i className="fa-solid fa-cart-shopping"></i>
                        Cart
                        <span className="badge bg-danger text-white ms-1 rounded-pill">{cartItemCount}</span>
                    </NavLink>
                )}
            </form>
            <div className="container">
                <Link className="navbar-brand" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                    Book Store
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/trang-chu">
                                Trang Chủ
                            </Link>
                        </li>
                        {isLoggedIn && userRole === 'ADMIN' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">
                                    Books
                                </Link>
                            </li>
                        )}
                        {!isLoading && (
                            <>
                                {isLoggedIn ? (
                                    <li className="nav-item">
                                        <div className={`nav-link ${userRole === 'ADMIN' ? 'text-danger' : ''}`}>
                                            Xin chào {localStorage.getItem('username')}
                                        </div>
                                    </li>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login">
                                                Đăng Nhập
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/dang-ky">
                                                Đăng Ký
                                            </NavLink>
                                        </li>
                                    </>

                                )}
                                {isLoggedIn && (
                                    <div>
                                        <li className="nav-item">
                                            <a className="nav-link btn btn-link" href='http://localhost:8080/api/logout' onClick={handleLogout}>
                                                Thoát
                                            </a>
                                        </li>
                                    </div>
                                )}
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

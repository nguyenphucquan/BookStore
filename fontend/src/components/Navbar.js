import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isLoading, setIsLoading] = useState(true);
    const { userRole, isLoggedIn } = useSelector(state => state.authReducer)


    useEffect(() => {

        setIsLoading(false);
    }, []);

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-gradient">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Start Bootstrap
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
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/books">
                                Books
                            </Link>
                        </li>
                        {!isLoading && (
                            <>
                                {isLoggedIn ? (
                                    <li className="nav-item">
                                        <div className="nav-link">{userRole}</div>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                )}
                                {isLoggedIn && (
                                    <div>
                                        <li className="nav-item">
                                            <a className="nav-link btn btn-link" href='http://localhost:8080/logout' onClick={logout}>
                                                Logout
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

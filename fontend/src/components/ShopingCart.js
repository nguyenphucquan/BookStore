/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { removeFromCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
function ShoppingCart() {
    const [cart, setCart] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        // Gọi API để lấy thông tin giỏ hàng
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/carts/get', {
                params: {
                    id: localStorage.getItem("idUser") // Thay YOUR_CART_ID bằng ID giỏ hàng của bạn
                }
            });
            console.log(response.data)
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };
    const removeCartItem = async (itemId, bookId) => {

        try {
            const cartId = localStorage.getItem("cartid");
            await axios.delete('http://localhost:8080/carts/remove/items', {
                params: {
                    cartId: cartId, // Thay YOUR_CART_ID bằng ID giỏ hàng của bạn
                    itemId: itemId
                }
            });
            dispatch(removeFromCart({ bookId: bookId }));
            fetchCartItems();

        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };
    const calculateTotalPrice = () => {
        if (!cart.items) return 0;

        return cart.items.reduce((total, item) => total + item.book.price * item.quantity, 0);
    };

    const handleCheckout = () => {
        const total = calculateTotalPrice();
        const items = JSON.stringify(cart.items);
        navigate(`/pay?total=${total}&items=${items}`);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-10 col-md-offset-1">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                                <th className="text-center">Giá</th>
                                <th className="text-center">Tổng</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.items &&
                                cart.items.map((x) => (
                                    <tr key={x.book.id}>
                                        <td className="col-sm-8 col-md-6">
                                            <div className="media">
                                                <Link to={`/book-item/${x.book.id}`}>
                                                    <img
                                                        className="card-img-top mb-5 mb-md-0"
                                                        src={x.book.image && require(`../assets/images/${x.book.image}`)}
                                                        alt="book-cover"
                                                        style={{ maxWidth: '75px', maxHeight: '75px' }}
                                                    />
                                                </Link>
                                                <div className="media-body">
                                                    <h4 className="media-heading">
                                                        <a href="#">{x.book.title}</a>
                                                    </h4>
                                                    <h5 className="media-heading">
                                                        {' '}
                                                        by <a href="#">{x.book.author}</a>
                                                    </h5>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-sm-1 col-md-1 text-center">
                                            <input className="form-control" style={{ width: '50px' }} value={x.quantity} />
                                        </td>
                                        <td className="col-sm-1 col-md-1 text-center">
                                            <strong>{x.book.price} đ</strong>
                                        </td>
                                        <td className="col-sm-1 col-md-1 text-center">
                                            <strong>{x.book.price * x.quantity} đ</strong>
                                        </td>
                                        <td className="col-sm-1 col-md-1">
                                            <button type="button" className="btn btn-danger" onClick={() => removeCartItem(x.id, x.book.id)}>
                                                <span className="glyphicon glyphicon-remove"></span> Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            <tr>
                                <td className="col-sm-3 col-md-2"></td>
                                <td className="col-sm-3 col-md-2"></td>
                                <td className="col-sm-3 col-md-2"></td>
                                <td className="col-sm-3 col-md-2">
                                    <h5>Tổng tiền</h5>
                                </td>
                                <td className="col-sm-3 col-md-2 text-right">
                                    <h5>{cart.items && cart.items.reduce((total, x) => total + x.book.price * x.quantity, 0)} đ</h5>
                                </td>
                                <td className="col-sm-3 col-md-1"></td>
                            </tr>
                            <tr>
                                <td className="col-sm-3 col-md-2"></td>
                                <td className="col-sm-3 col-md-2"></td>
                                <td className="col-sm-3 col-md-2"></td>
                                <td>
                                    <Link to="/trang-chu" className="btn btn-default">
                                        <span className="glyphicon glyphicon-shopping-cart"></span> Continue Shopping
                                    </Link>

                                </td>
                                <td>
                                    <button className="btn btn-success" onClick={handleCheckout}>
                                        Checkout
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;

/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Gọi API để lấy thông tin giỏ hàng
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/carts/get/items', {
                params: {
                    id: 3 // Thay YOUR_CART_ID bằng ID giỏ hàng của bạn
                }
            });
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const removeCartItem = async (itemId) => {
        try {
            await axios.delete('/carts/remove/items', {
                params: {
                    cartId: 3, // Thay YOUR_CART_ID bằng ID giỏ hàng của bạn
                    itemId: 5
                }
            });
            fetchCartItems();
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    // Render giao diện của giỏ hàng với các dữ liệu đã lấy từ API và các hàm thêm/xóa mục trong giỏ hàng

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-10 col-md-offset-1">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Total</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.book.id}>
                                    <td className="col-sm-8 col-md-6">
                                        <div className="media">
                                            <a className="thumbnail pull-left" href="#">
                                                <img
                                                    className="card-img-top mb-5 mb-md-0"
                                                    src={item.book.image && require(`../assets/images/${item.book.image}`)}
                                                    alt="book-cover"
                                                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                                                />
                                            </a>
                                            <div className="media-body">
                                                <h4 className="media-heading">
                                                    <a href="#">{item.book.title}</a>
                                                </h4>
                                                <h5 className="media-heading">
                                                    {' '}
                                                    by <a href="#">{item.author}</a>
                                                </h5>
                                                <span>Status: </span>
                                                <span className="text-success">
                                                    <strong>In Stock</strong>
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="col-sm-1 col-md-1" style={{ textAlign: 'center' }}>
                                        <input type="email" className="form-control" id="exampleInputEmail1" value={item.quantity} />
                                    </td>
                                    <td className="col-sm-1 col-md-1 text-center">
                                        <strong>{item.price}</strong>
                                    </td>
                                    <td className="col-sm-1 col-md-1 text-center">
                                        <strong>{item.total}</strong>
                                    </td>
                                    <td className="col-sm-1 col-md-1">
                                        <button type="button" className="btn btn-danger">
                                            <span className="glyphicon glyphicon-remove"></span> Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>
                                    <h5>Subtotal</h5>
                                </td>
                                <td className="text-right">
                                    <h5>
                                        <strong>$24.59</strong>
                                    </h5>
                                </td>
                            </tr>
                            <tr>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>
                                    <h5>Estimated shipping</h5>
                                </td>
                                <td className="text-right">
                                    <h5>
                                        <strong>$6.94</strong>
                                    </h5>
                                </td>
                            </tr>
                            <tr>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>
                                    <h3>Total</h3>
                                </td>
                                <td className="text-right">
                                    <h3>
                                        <strong>$31.53</strong>
                                    </h3>
                                </td>
                            </tr>
                            <tr>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>
                                    <button type="button" className="btn btn-default">
                                        <span className="glyphicon glyphicon-shopping-cart"></span> Continue Shopping
                                    </button>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-success">
                                        Checkout <span className="glyphicon glyphicon-play"></span>
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

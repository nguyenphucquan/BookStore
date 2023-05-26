/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ShoppingCart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Gọi API để lấy thông tin giỏ hàng
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/carts/get', {
                params: {
                    id: 3 // Thay YOUR_CART_ID bằng ID giỏ hàng của bạn
                }
            });
            console.log(response.data)
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const removeCartItem = async (itemId) => {
        try {
            await axios.delete('http://localhost:8080/carts/remove/items', {
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
  //  const subtotal = cart.items.reduce((total, x) => total + x.book.price * x.quantity, 0);

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
                            {cart.items && cart.items.map((x) => (
                                <tr key={x.book.id}>
                                    <td className="col-sm-8 col-md-6">
                                        <div className="media">
                                            <a className="thumbnail pull-left" href="#">
                                                <img
                                                    className="card-img-top mb-5 mb-md-0"
                                                    src={x.book.image && require(`../assets/images/${x.book.image}`)}
                                                    alt="book-cover"
                                                    style={{ maxWidth: '50%', maxHeight: '50%' }}
                                                />
                                            </a>
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
                                    <td className="col-sm-1 col-md-1" style={{ textAlign: 'center' }}>
                                        <input type="email" className="form-control" id="exampleInputEmail1" value={x.quantity} />
                                    </td>
                                    <td className="col-sm-1 col-md-1 text-center">
                                        <strong>{x.book.price} VND</strong>
                                    </td>
                                    <td className="col-sm-1 col-md-1 text-center">
                                        <strong>
                                            {x.book.price * x.quantity}
                                        </strong>
                                    </td>
                                    <td className="col-sm-1 col-md-1">
                                        <button type="button" className="btn btn-danger" onClick={(removeCartItem)}>
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
                                        {cart.items&&cart.items.reduce((total, x) => total + x.book.price * x.quantity, 0)}
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

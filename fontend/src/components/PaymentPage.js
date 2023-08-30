/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import '../styles/Pay.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { removeFromCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';

const PaymentPage = () => {
    const [selectedPayment, setSelectedPayment] = useState('');
    const [address, setAddress] = useState('');
    const [hoTen, setHoTen] = useState('');
    const [sdt, setSdt] = useState('');
    const dispatch = useDispatch();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);



    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const total = queryParams.get('total');
    const items = JSON.parse(queryParams.get('items'));

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };
    const handlePlaceOrder = async (bookId) => {
        try {
            const id = localStorage.getItem("cartid")
            const order = {
                address: address,
                hovaten: hoTen,
                sdt: sdt
            };
            const response = await axios.post(`http://localhost:8080/orders/checkout?cartId=${id}`, order);
            localStorage.removeItem("cartItems")
            setShowSuccessMessage(true);

            console.log(response.data);

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-8 col-lg-6">
                    <div className="card">
                        <div className="card-header">Thông tin</div>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="fullName">Họ và tên:</label>
                                <input type="text" className="form-control" id="fullName" placeholder="Quân" value={hoTen} onChange={event => setHoTen(event.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Địa chỉ:</label>
                                <input type="text" className="form-control" id="address" placeholder="123 Ao Sen" value={address} onChange={event => setAddress(event.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Số điện thọai:</label>
                                <input type="text" className="form-control" id="phoneNumber" placeholder="+84" value={sdt} onChange={event => setSdt(event.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 col-lg-6">
                    <div className="card">
                        <div className="card-header">Đơn đặt hàng của bạn</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-6 col-md-4">
                                            <h5>Sản Phẩm</h5>
                                        </div>
                                        <div className="col-3 col-md-2">
                                            <h5>Số lượng</h5>
                                        </div>
                                        <div className="col-3 col-md-3">
                                            <h5>Giá</h5>
                                        </div>
                                        <div className="col-3 col-md-3">
                                            <h5>Tổng</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {items.map((item, index) => (
                                <div className="row" key={index}>
                                    <div className="col-6 col-md-4">
                                        <div className="media mb-3">
                                            <img
                                                className="card-img-top mb-5 mb-md-0"
                                                src={item.book.image && require(`../assets/images/${item.book.image}`)}
                                                alt="book-cover"
                                                style={{ maxWidth: '75px', maxHeight: '80px' }}
                                            />
                                            <div className="media-body">
                                                <h5 className="mt-0">{item.book.title}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-3 col-md-2">
                                        <p className="text-center">{item.quantity}</p>
                                    </div>
                                    <div className="col-3 col-md-3">
                                        <p className="text-center">{item.book.price}đ</p>
                                    </div>
                                    <div className="col-3 col-md-3">
                                        <p className="text-center">{item.book.price * item.quantity}đ</p>
                                    </div>
                                </div>
                            ))}
                            <hr />
                            <div className="row">
                                <div className="col-md-6">Tổng tiền:</div>
                                <div className="col-md-6 text-right">{total}</div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <div className="payment-method">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="paymentMethod"
                                            id="cardOnDelivery"
                                            value="cardOnDelivery"
                                            checked={selectedPayment === 'cardOnDelivery'}
                                            onChange={handlePaymentChange}
                                        />
                                        <label className="form-check-label" htmlFor="cardOnDelivery">Card on Delivery</label>
                                    </div>
                                    <div className="payment-method">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="paymentMethod"
                                            id="card"
                                            value="card"
                                            checked={selectedPayment === 'card'}
                                            onChange={handlePaymentChange}
                                        />
                                        <label className="form-check-label" htmlFor="card">Card</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12 text-center">
                            <a href="#" className="btn btn-primary" onClick={handlePlaceOrder}>Place Order</a>
                        </div>
                    </div>
                </div>
                {showSuccessMessage && (
                    <div className="success-message">Checkout thành công!</div>
                  )}
                  
            </div>
        </div>
    );
};

export default PaymentPage;

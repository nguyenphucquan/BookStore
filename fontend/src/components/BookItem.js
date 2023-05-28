import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

const BookItem = () => {
  const { id } = useParams();

  const [book, setBook] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [commentContent, setCommentContent] = useState('');


  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (id !== "-1") {
          const response = await fetch(`http://localhost:8080/api/book/${id}`);
          const data = await response.json();
          setBook({ ...data });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    setLoading(true);
    setMessage('');

    try {
      const cartId = localStorage.getItem('cart');
      const bookId = book.id;
      const response = await axios.post(`http://localhost:8080/carts/add/items?cartId=${cartId}&bookId=${bookId}&quantity=${quantity}`);

      setMessage(response.data);
    } catch (error) {
      setMessage('Error occurred while adding item to cart');
    }

    setLoading(false);
  };
  const handleCommentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleSendComment = async () => {
    try {
      const formData = {
        comment: commentContent
      };
  
      const encodedData = qs.stringify(formData);
  
      const response = await axios.post('http://localhost:8080/api/comments/1/1', encodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      console.log(response.data);
      // Xử lý response từ server (nếu cần)
    } catch (error) {
      console.error(error);
      // Xử lý lỗi (nếu cần)
    }
  };

  return (
    <>
      <div className="container card" style={{ maxWidth: '700px', background: '#9734' }}>
        <section className="py-5">
          <div className="container px-4 px-lg-5 my-5">
            <div className="row">
              <div className="col-md-4">
                <img
                  className="card-img-top mb-5 mb-md-0"
                  src={book.image && require(`../assets/images/${book.image}`)}
                  alt="book-cover"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
              <div className="col-md-8 d-flex flex-column">
                <div className="mb-auto">
                  <h1 className="display-6 mb-2 fw-bolder">{book.title}</h1>
                  <h3 className="fs-6 mb-4 fw-light">by {book.author}</h3>
                </div>
                <div className="row">
                  <div className="fs-5 mb-2">
                    <span>{book.price} VND</span>
                  </div>

                  <div className="input-group input-group-sm mb-3">
                    <button className="btn btn-outline-dark" type="button" onClick={handleDecrement}>
                      -
                    </button>
                    <div>
                      <input
                        type="text"
                        className="form-control text-center small-input"
                        style={{ width: '50px' }}
                        value={quantity}
                      />
                    </div>

                    <button className="btn btn-outline-dark" type="button" onClick={handleIncrement}>
                      +
                    </button>
                  </div>

                  <div className="mt-auto">
                    <button
                      className="btn btn-outline-dark"
                      type="button"
                      onClick={handleAddToCart}
                      disabled={loading}
                    >
                      {loading ? 'Adding...' : 'Add to cart'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <p
                  className="lead fs-6"
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {book.description}
                </p>
              </div>
            </div>
            {message && <div className="mt-4 text-center">{message}</div>}
          </div>
        </section>
      </div>
      <section>
        <div className="container my-5 py-5 text-dark">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="card">
                <div className="card-body p-4">
                  <div className="d-flex flex-start w-100">
                    <div className="w-100">
                      <>
                        <h5>You can post your comment here</h5>

                        <div className="form-outline">
                          <label className="form-label my-3" htmlFor="textAreaExample">What is your opinion?</label>
                          <textarea className="form-control" id="textAreaExample" rows="4" value={commentContent}  // Gán giá trị từ state `commentContent`
                          onChange={handleCommentChange}></textarea>
                        </div>
                        <div className="d-flex float-end mt-3">
                          <button type="button" className="btn btn-success" onClick={handleSendComment}>
                            Send <i className="fas fa-long-arrow-alt-right ms-1"></i>
                          </button>
                        </div>
                      </>) : <h4>Please login to comment.</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookItem;

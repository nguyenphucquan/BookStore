import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from 'react-rating-stars-component';

const BookItem = () => {
  const { id } = useParams();

  const [book, setBook] = useState({});
  const [quantity, setQuantity] = useState(1);

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
  return (
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
                  <button className="btn btn-outline-dark" type="button">
                    <i className="bi-cart-fill me-1"></i>
                    Add to cart
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
              <Rating
              count={3} // Number of stars
              size={24} // Size of each star
             value={5} // Initial rating value (you can modify this based on your logic)
              activeColor="#ffd700" // Color of active/filled stars
              edit={true} // Set to 'true' if you want to allow user interaction
            />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookItem;

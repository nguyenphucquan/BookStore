import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookItem = () => {
  const { id } = useParams(); // Lấy thông tin id từ URL parameters

  // Sử dụng id để lấy thông tin cuốn sách từ API hoặc state của trang
  const [book, setBook] = useState({});

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

  return (
    <div className="container card" style={{ maxWidth: '1000px', background: '#f8f9fa' }}>
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-4">
              <img className="card-img-top mb-5 mb-md-0" src={book.image && require(`../assets/images/${book.image}`)} alt="book-cover" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
            <div className="col-md-8">
              <h1 className="display-6 mb-2 fw-bolder" style={{ margin: '10 10' }}>
                {book.title}
              </h1>
              <h3 className="fs-6 mb-5 fw-light">by {book.author}</h3>
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
              <div className="fs-5 mb-2">
                <span className="text-decoration-line-through"></span>
                <span>20$</span>
              </div>
              <div className="d-flex">
                <button className="btn btn-outline-dark flex-shrink-0" type="button">
                  <i className="bi-cart-fill me-1"></i>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookItem;

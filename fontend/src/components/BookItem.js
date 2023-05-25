import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookItem = () => {
  const { id } = useParams(); // Lấy thông tin id từ URL parameters

  // Sử dụng id để lấy thông tin cuốn sách từ API hoặc state của trang
  const [book, setBook] = useState({});
  const [quantity, setQuantity] = useState(1); // Trạng thái số lượng mặc định là 1

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

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <div className="container card" style={{ maxWidth: '1000px', background: '#9734' }}>
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
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
              <div className="mt-auto">
                <div className="input-group input-group-sm mb-3"> {/* Thêm class input-group-sm để làm cho ô nhập nhỏ hơn */}
                  <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min={1}
                  />
                  <button className="btn btn-outline-dark" type="button">
                    <i className="bi-cart-fill me-1"></i>
                    Add to cart
                  </button>
                </div>
                <div className="fs-5 mb-2">
                  <span>{book.price} VND</span>
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
                  BoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {book.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default BookItem;

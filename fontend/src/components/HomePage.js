import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log('Error fetching books:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <style>
        {`
          .card {
            transition: transform 0.3s;
          }
          
          .card:hover {
            transform: translateY(-5px);
          }

          .search-input {
            max-width: 200px;
          }
        `}
      </style>

      <section className="product mt-3">
        <div className="container-sm">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search by title"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          <div className="row">
            {filteredBooks.map((book, index) => (
              <div
                className={`col-xl-3 col-lg-5 col-md-6 col-sm-12 product-item`}
                key={index}
              >
                <Link to={`/book-item/${book.id}`}>
                  <div className="card">
                    <img
                      className="card-img-top img-fluid"
                      src={
                        book.image &&
                        require(`../assets/images/${book.image}`)
                      }
                      alt="Book Cover"
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{book.title}</h5>
                      <p className="card-text">
                        {book.price.toLocaleString('vi-VN', {
                          minimumFractionDigits: 0,
                        })}{' '}
                        đ
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

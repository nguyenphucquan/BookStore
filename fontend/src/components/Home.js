import React, { useState, useEffect } from 'react';
import '../styles/Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);
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

  return (
    <div>
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            {books.map((book) => (
              <div key={book.id} className="col-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="upload-preview">
                      <img
                        id="image-preview"
                        className="card-img-top book-image"
                        src={require(`../assets/images/${book.image}`)}
                        alt='book-cover'
                      />
                    </div>
                  </div>
                  <div className="card-body p-1">
                    <div className="text-center">
                      <h5 className="fw-bolder">{book.title}</h5>
                      <span className="text-muted text-decoration-line-through">$20.00</span>
                    </div>
                  </div>
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                      <button className="btn btn-outline-dark mt-auto">Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

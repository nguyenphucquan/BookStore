/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import '../styles/Home.Ath.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
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

  const chunks = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  return (

    <div className="container">
      <form class="d-flex">
        <button class={'btn btn-outline-dark'} type="submit">
           <i class="fa-solid fa-cart-shopping"></i>
                  Cart
          <span class="badge bg-dark text-white ms-1 rounded-pill">0</span>
        </button>
      </form>
      <div className="row">

        <div className="col-lg-3">
          <h1 className="my-4">Shop Name</h1>
          <div className="list-group">
            <a href="#" className="list-group-item">Category 1</a>
            <a href="#" className="list-group-item">Category 2</a>
            <a href="#" className="list-group-item">Category 3</a>
          </div>
        </div>
        <div className="col-lg-9">
          <div id="carouselExampleIndicators" className="carousel slide my-4" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner" role="listbox">
              <div className="carousel-item active">
                <img className="d-block img-fluid" src="https://theme.hstatic.net/200000343865/1001052087/14/ms_banner_img5.jpg?v=45" alt="First slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block img-fluid" src="https://theme.hstatic.net/200000343865/1001052087/14/ms_banner_img3.jpg?v=45" alt="Second slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block img-fluid" src="https://cdn.egamebuy.com/images/info-direct-topup-games/one-piece-bounty-rush.jpg" alt="Third slide" />
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>

          {chunks(books, 3).map((row, index) => (
            <div className="row" key={index}>
              {row.map((book) => (
                <div className="col-lg-4 col-md-6 mb-4" key={book.id}>
                  <div className="card h-100">
                    <Link to={`/book-item/${book.id}`} >
                      <img id="image-preview" className="card-img" src={require(`../assets/images/${book.image}`)} alt='book-cover' />
                    </Link>
                    <div className="card-body">
                      <h4 className="card-title">
                        <p className="card-text">{book.title}</p>
                      </h4>
                      <h5>{book.price} VND</h5>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
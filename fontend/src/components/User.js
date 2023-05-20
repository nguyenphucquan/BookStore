import React from 'react';

function ProductCard(props) {
  return (
    <div className="col mb-5">
      <div className="card h-100">
        <img className="card-img-top" src={props.image} alt="Product" />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.price}</p>
        </div>
        <div className="card-footer">
          <a href="#" className="btn btn-primary">{props.buttonText}</a>
        </div>
      </div>
    </div>
  );
}

function ShopPage() {
  const products = [
    {
      id: 1,
      name: 'Fancy Product 1',
      price: '$40.00',
      image: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg',
      buttonText: 'View Details'
    },
    {
      id: 2,
      name: 'Fancy Product 2',
      price: '$50.00',
      image: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg',
      buttonText: 'View Details'
    },
    // Add more products as needed
  ];

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">My Shop</a>
        </div>
      </nav>

      <header className="py-5 bg-dark text-white text-center">
        <div className="container">
          <h1 className="display-4 fw-bolder">Shop in Style</h1>
          <p className="lead fw-normal text-white-50 mb-0">With Our Latest Products</p>
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                buttonText={product.buttonText}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="py-4 bg-light text-center">
        <div className="container">
          <p className="text-muted mb-0">© 2023 My Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ShopPage;

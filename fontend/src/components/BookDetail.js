import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function BookDetail() {
  const params = useParams();
  const [book, setBook] = useState({});
  const [image, setImage] = useState(null);
  const id = params.id;
  //const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/book/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="container">
      <h1>{id < 0 ? "New Book" : `Book ${id}`}</h1>
      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <div className="col">
              <label className="col-lg-10 form-label">Title:</label>
              <input type="text" className="col-lg-10  form-control" value={book.title} readOnly />
            </div>
            <div className="col">
              <label className="form-label">Author:</label>
              <input type="text" className="form-control" value={book.author} readOnly />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <label className="form-label">Description:</label>
              <input type="text" className="form-control" value={book.description} readOnly />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <label className="form-label">Date Established:</label>
              <input type="text" className="form-control" value={book.date} readOnly />
            </div>
            <div className="col">
              <label className="form-label">Page Count:</label>
              <input type="text" className="form-control" value={book.page} readOnly />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <label className="form-label">Category:</label>
              <input type="text" className="form-control" value={book.category} readOnly />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="col">
            <label className="form-label">Upload Image:</label>
            <div className="input-group">
              <input type="file" className="form-control" accept="image/*" onChange={handleImageUpload} />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">Upload</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {image && (
            <img className="img-fluid" src={URL.createObjectURL(image)} alt="Book Cover" />
          )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Link to="/books" className="btn btn-primary">Back to Books</Link>
        </div>
      </div>
    </div>
  );
}
export default BookDetail;
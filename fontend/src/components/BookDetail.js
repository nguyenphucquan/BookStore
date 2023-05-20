import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/book/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBook();
  }, [id]);

  return (
    <div className="container">
      <h1>{id < 0 ? "New Book" : `Book ${id}`}</h1>
      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <div className="col">
              <label className="col-lg-10 form-label">Title:</label>
              <input
                type="text"
                className="col-lg-10 form-control"
                value={book.title || ""}
                onChange={(e) => setBook({ ...book, title: e.target.value })}
              />
            </div>
            <div className="col">
              <label className="form-label">Author:</label>
              <input
                type="text"
                className="col-lg-10 form-control"
                value={book.author || ""}
                onChange={(e) => setBook({ ...book, author: e.target.value })}
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <label className="form-label">Description:</label>
              <input
                type="text"
                className="col-lg-10 form-control"
                value={book.description || ""}
                onChange={(e) => setBook({ ...book, description: e.target.value })}
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <label className="form-label">Date Established:</label>
              <input
                type="date"
                className="col-lg-10 form-control"
                value={book.date || ""}
                onChange={(e) => setBook({ ...book, date: e.target.value })}
              />
            </div>
            <div className="col">
              <label className="form-label">Page Count:</label>
              <input
                type="text"
                className="col-lg-10 form-control"
                value={book.page || ""}
                onChange={(e) => setBook({ ...book, page: e.target.value })}
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <label className="form-label">Category:</label>
              <input
                type="text"
                className="col-lg-10 form-control"
                value={book.category || ""}
                onChange={(e) => setBook({ ...book, category: e.target.value })}
              />
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
          <NavLink to="/books" className="btn btn-primary">Back to Books</NavLink>
        </div>
      </div>
    </div>
  );
}
export default BookDetail;

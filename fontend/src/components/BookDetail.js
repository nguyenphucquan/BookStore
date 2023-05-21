import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import BookAPI from "../service/bookAPI";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [image, setImage] = useState(null);
  const [isEditable, setIsEditable] = useState(id === "-1");

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleUpload = () => {
    document.getElementById("imageInput").click();
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (id !== "-1") {
          const response = await fetch(`http://localhost:8080/api/book/${id}`);
          const data = await response.json();

          const formattedDate = formatDate(data.date);
          setBook({ ...data, date: formattedDate });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBook();
  }, [id]);
  const handleEdit = () => {
    setIsEditable(true);
  };
  const handleSave = async (e) => {
    try {
      if (!isEditable) {
        e.preventDefault();
        setIsEditable(true);
        return;
      } else {
        const formData = new FormData();
        if (image !== null) formData.append('image', image);
        formData.append('book', JSON.stringify(book));
        console.log(formData)
        
        const response = await fetch(`http://localhost:8080/api/book/save/${id}`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("Book saved successfully.");
        } else {
          console.error("Failed to save book.");
        }
      }

      setIsEditable(false);
    } catch (error) {
      console.error("Error saving book:", error);
      alert("Failed to save book.");
    }
  };
  return (
    <div className="container">
      <h1>{id < 0 ? "New Book" : `Book ${id}`}</h1>
      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <div className="col">
              <label className="col-lg-10 form-label">Title:</label>
              <input type="text" className="col-lg-10 form-control" value={book.title || ""} readOnly={!isEditable} onChange={(e) => setBook({ ...book, title: e.target.value })} />
            </div>
            <div className="col">
              <label className="form-label">Author:</label>
              <input type="text" className="col-lg-10 form-control" value={book.author || ""} readOnly={!isEditable} onChange={(e) => setBook({ ...book, author: e.target.value })} />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <label className="form-label">Description:</label>
              <input type="text" className="col-lg-10 form-control" value={book.description || ""} readOnly={!isEditable} onChange={(e) => setBook({ ...book, description: e.target.value })} />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <label className="form-label">Date Established:</label>
              <input type="date" className="col-lg-10 form-control" value={book.date || ""} readOnly={!isEditable} onChange={(e) => setBook({ ...book, date: e.target.value })} />
            </div>
            <div className="col">
              <label className="form-label">Page Count:</label>
              <input type="text" className="col-lg-10 form-control" value={book.page || ""} readOnly={!isEditable} onChange={(e) => setBook({ ...book, page: e.target.value })} />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <label className="form-label">Category:</label>
              <input type="text" className="col-lg-10 form-control" value={book.category || ""} readOnly={!isEditable} onChange={(e) => setBook({ ...book, category: e.target.value })} />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="col">
            <div className="input-group">
              <button className="btn btn-primary" onClick={handleUpload}> Upload </button>
              <input type="file" id="imageInput" style={{ display: "none" }} accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="upload-preview">
                {image === null && book.image&& (
                  <img
                    id="image-preview"
                    className="card-img-top"
                    src={require(`../assets/images/${book.image}`)}
                    alt='book-cover'
                  />
                )}
                {image && (
                  <img
                    id="image-preview"
                    className="card-img-top"
                    src={URL.createObjectURL(image)}
                    alt='book-cover'
                  />
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="row">
        <div className="col">
          {id === "-1" ? (
            <button className="btn btn-primary" onClick={handleSave}>
              Add
            </button>
          ) : isEditable ? (
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleEdit}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
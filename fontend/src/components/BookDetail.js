import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookAPI from "../service/BookService";

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

        if (id === "-1") {
          // Tạo sách mới
          const response = await BookAPI.createBook(id, formData);
          console.log(response.status)
          if (response.status === 200) {
            console.log("Book created successfully.");
          } else {
            console.error("Failed to create book.");
          }
        } else {
          // Cập nhật sách đã tồn tại
          const response = await BookAPI.updateBook(id, formData);
          if (response.status === 200) {
            console.log("Book updated successfully.");
          } else {
            console.error("Failed to update book.");
          }
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
      <h1 className="mb-4">{id < 0 ? "New Book" : `Book ${id}`}</h1>
      <div className="row">
        <div className="col-lg-6">
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Title:</label>
              <input type="text" className="form-control" value={book.title || ""} readOnly={!isEditable} onChange={(e) => setBook({ ...book, title: e.target.value })} />
            </div>
            <div className="col">
              <label className="form-label">Author:</label>
              <input type="text" className="form-control" value={book.author || ""} readOnly={!isEditable} onChange={(e) => setBook({ ...book, author: e.target.value })} />
            </div>
          </div>
          <hr />
          <div className="mb-3">
            <label className="form-label">Description:</label>
            <textarea className="form-control" rows="4" value={book.description || ""} readOnly={!isEditable} onChange={(e) => setBook({ ...book, description: e.target.value })}></textarea>
          </div>
          <hr />
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Date Established:</label>
              <input type="date" className="form-control" value={book.date || ""} readOnly={!isEditable} onChange={(e) => setBook({ ...book, date: e.target.value })} />
            </div>
            <div className="col">
              <label className="form-label">Page Count:</label>
              <input type="text" className="form-control" value={book.page || ""} readOnly={!isEditable} onChange={(e) => setBook({ ...book, page: e.target.value })} />
            </div>
          </div>
          <hr />
          <div className='row'>
          <div className="col-4">
              <label className="form-label">Category</label>
              <select
                  className="border-1 form-select"
                  onChange={(e) => { setBook({ ...book, category: e.target.value }) }}
                  disabled={!isEditable}
                  defaultValue={book.category ? book.category : "default"}
              >
                  <option disabled value="default">Select a category</option>
                  <option value="Action" selected={book.category === "Action"}>Action</option>
                  <option value="Comedy" selected={book.category === "Comedy"}>Comedy</option>
                  <option value="Fantasy" selected={book.category === "Fantasy"}>Fantasy</option>
                  <option value="Historical" selected={book.category === "Historical"}>Historical</option>
              </select>
          </div>
         </div>
        </div>
        <div className="col-lg-6">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-3">
                  <button className="btn btn-primary" onClick={handleUpload}>Upload Image</button>
                  <input type="file" id="imageInput" style={{ display: "none" }} accept="image/*" onChange={handleImageUpload} />
                </div>
                <div className="upload-preview">
                  {image === null && book.image && (
                    <img
                      id="image-preview"
                      className="card-img-top"
                      src={require(`../assets/images/${book.image}`)}
                      alt="book-cover"
                    />
                  )}
                  {image && (
                    <img
                      id="image-preview"
                      className="card-img-top"
                      src={URL.createObjectURL(image)}
                      alt="book-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5" style={{ borderTop: "2px solid" }}>
        <div className="col"></div>
        <div className="col"></div>
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
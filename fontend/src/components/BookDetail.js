import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookAPI from "../service/BookService";
import '../styles/BookDetail.css';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [image, setImage] = useState(null);
  const [isEditable, setIsEditable] = useState(id === "-1");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Kiểm tra trường tiêu đề
    if (!book.title) {
      newErrors.title = "Vui lòng nhập tiêu đề sách.";
    }

    // Kiểm tra trường tác giả
    if (!book.author) {
      newErrors.author = "Vui lòng nhập tác giả sách.";
    }

    // Kiểm tra trường ngày sản xuất
    if (!book.date) {
      newErrors.date = "Vui lòng chọn ngày sản xuất sách.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleUpload = (e) => {
    e.preventDefault();
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
      const token = localStorage.getItem("accessToken")

      try {
        if (id !== "-1") {
          const response = await fetch(`http://localhost:8080/api/book/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              // 'Content-Type': 'multipart/formdata'
            }
          });

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
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      if (id !== "-1" && !isEditable) {
        e.preventDefault();
        setIsEditable(true);
        return;
      } else {
        const confirmed = window.confirm("Bạn có muốn lưu lại cuốn sách không?");
        if (!confirmed) {
          return;
        }

        const formData = new FormData();
        if (image !== null) {
          formData.append('image', image);
        } else {
          formData.append('image', null); // Hoặc giá trị mặc định khác tùy thuộc vào yêu cầu của server
        }
        formData.append('book', JSON.stringify(book));

        if (id === "-1") {
          // Tạo sách mới
          const response = await BookAPI.createBook(id, formData);
          if (response.status === 200) {
            console.log("Book created successfully.");
          }
        } else {
          // Cập nhật sách đã tồn tại
          const response = await BookAPI.updateBook(id, formData);
          if (response.status === 200) {
            console.log("Book updated successfully.");
          }
        }
      }
      setIsEditable(false);
    } catch (error) {

      alert("Đã tồn tại một quyển sách có cùng tiêu đề và tác giả.");

    }
  };

  return (
    <div className="container">
      <h1 className="mb-4">{id < 0 ? "New Book" : `Book ${id}`}</h1>
      <form onSubmit={handleSave}>
        <div className="row">
          <div className="col-lg-6">
            <div className="row mb-3">
              <div className="col">
                <label className="form-label required">Tên :</label>
                <input
                  type="text"
                  className="form-control"
                  value={book.title || ""}
                  disabled={!isEditable}
                  onChange={(e) => setBook({ ...book, title: e.target.value })}
                />
                {errors.title && <div className="text-danger">{errors.title}</div>}
              </div>
              <div className="col">
                <label className="form-label required">Tác giả:</label>
                <input type="text" className="form-control required" value={book.author || ""} disabled={!isEditable} onChange={(e) => setBook({ ...book, author: e.target.value })} required/>
                {errors.author && <div className="text-danger">{errors.author}</div>}
                </div>
            </div>
            <hr />
            <div className="mb-3">
              <label className="form-label">Mô tả:</label>
              <textarea className="form-control" rows="4" value={book.description || ""} disabled={!isEditable} onChange={(e) => setBook({ ...book, description: e.target.value })}></textarea>
            </div>
            <hr />
            <div className="row mb-3">
              <div className="col">
                <label className="form-label required">Ngày phát hành:</label>
                <input type="date" className="form-control" value={book.date || ""} disabled={!isEditable} onChange={(e) => setBook({ ...book, date: e.target.value })} />
                {errors.date && <div className="text-danger">{errors.date}</div>}
                </div>
              <div className="col">
                <label className="form-label">Số trang:</label>
                <input type="text" className="form-control" value={book.page || ""} disabled={!isEditable} onChange={(e) => setBook({ ...book, page: e.target.value })} />
              </div>
            </div>
            <hr />
            <div className='row'>
              <div className="col">
                <label className="form-label">Thể loại</label>
                <select
                  className="border-1 form-select"
                  onChange={(e) => { setBook({ ...book, category: e.target.value }) }}
                  disabled={!isEditable}
                  defaultValue={book.category ? book.category : "default"}
                >
                  <option disabled value="default">Thể loại</option>
                  <option value="Hài" selected={book.category === "Hài"}>Hài</option>
                  <option value="Hành động" selected={book.category === "Hành động"}>Hành động</option>
                  <option value="Trinh thám" selected={book.category === "Trinh thám"}>Trinh thám</option>
                  <option value="Khoa học" selected={book.category === "Khoa học"}>Khoa học</option>
                </select>
              </div>
              <div className="col">
                <label className="form-label">Giá:</label>
                <input type="text" className="form-control" value={book.price || ""} readOnly={!isEditable} onChange={(e) => setBook({ ...book, price: e.target.value })} />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-3">
                  <button className="btn btn-primary" onClick={handleUpload} disabled={!isEditable}>Upload Image</button>
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
        <div className="row mt-5" style={{ borderTop: "2px solid" }}>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col mt-1">
            {id === "-1" ? (
              <button className="btn btn-primary" type="submit" disabled={!isEditable}>
                Add
              </button>
            ) : isEditable ? (
              <button className="btn btn-primary" type="submit" disabled={!isEditable}>
                Save
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
export default BookDetail;
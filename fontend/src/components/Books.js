import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookAPI from "../service/BookService";
import { useSelector } from "react-redux";

function Books(props) {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { userRole, isLoggedIn } = useSelector(state => state.authReducer);

  const [searchTerm, setSearchTerm] = useState("");

  const onViewClick = (id) => {
    navigate(`/book/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      BookAPI.deleteBook(id)
        .then(() => {
          const updatedBooks = books.filter((book) => book.id !== id);
          setBooks(updatedBooks);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    BookAPI.getAllBooks()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const truncateText = (text, maxLength) => {
    if (maxLength && text.length && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-center">Books List</h2>
      <div className="d-flex justify-content-center mb-3">
        <div className="col-auto">
          {isLoggedIn && userRole === "ADMIN" && (
            <button className="btn btn-primary" onClick={() => onViewClick(-1)}>
              Add Book
            </button>
          )}
          <div className="input-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTerm}
              onChange={handleSearch}
            />

          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Tác giả</th>
                <th>Mô tả</th>
                <th>Thể loại</th>
                <th>Ngày phát hành</th>
                <th>Số trang</th>
                <th>Đã bán</th>
                {isLoggedIn && userRole === "ADMIN" && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.description ? truncateText(book.description, 50) : ""}</td>
                  <td>{book.category}</td>
                  <td>{new Date(book.date).toLocaleDateString()}</td>

                  <td>{book.page}</td>
                  <td>{book.sold}</td>
                  {isLoggedIn && userRole === "ADMIN" && (
                    <td>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => onViewClick(book.id)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Books;








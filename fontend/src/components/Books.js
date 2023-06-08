import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookAPI from "../service/BookService";
import { useSelector } from "react-redux";

function Books(props) {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { userRole, isLoggedIn } = useSelector(state => state.authReducer); // Thêm state để kiểm tra trạng thái đăng nhập

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

  return (
    <div>
      <h2 className="text-center">Books List</h2>
      <div className="d-flex justify-content-center mb-3">
        <div className="col-auto">
          {isLoggedIn && ( // Chỉ hiển thị nút "Add Book" nếu đã đăng nhập
            <button className="btn btn-primary" onClick={() => onViewClick(-1)}>
              Add Book
            </button>
          )}
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
                {isLoggedIn && <th>Action</th>} {/* Chỉ hiển thị cột "Action" nếu đã đăng nhập */}
              </tr>
            </thead>
            <tbody>
              {books &&
                books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.description ? truncateText(book.description, 50) : ""}</td>
                    <td>{book.category}</td>
                    <td>{new Date(book.date).toLocaleDateString()}</td>
                    <td>{book.page}</td>
                    <td>{book.sold}</td>
                    {isLoggedIn && ( // Chỉ hiển thị nút "View" và "Delete" nếu đã đăng nhập
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

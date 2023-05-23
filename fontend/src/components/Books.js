import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookAPI from "../service/BookService";

function Books(props) {
    const [books, setBooks] = useState([]);
    // const [book, setbook] = useState({});
    const [filterBooks, setFilterBooks] = useState([]);
    const navigate = useNavigate();

    const onViewClick = (id) => {
        navigate(`/book/${id}`);
    };
    const handleDelete = (id) => {
        BookAPI
          .deleteBook(id)
          .then(() => {
            const updatedBooks = books.filter((book) => book.id !== id);
            setBooks(updatedBooks);
            setFilterBooks(updatedBooks);
          })
          .catch((error) => console.log(error));
      };

      useEffect(() => {
        BookAPI
          .getAllBooks()
          .then((response) => {
            console.log(response)
            setBooks(response);
            setFilterBooks(response);
          })
          .catch((err) => console.log(err));
      }, []);    

    return (
        <div>
            <h2 className="text-center">Books List</h2>
            <div className="d-flex justify-content-center">
                <div className="col-auto">
                <button className="btn btn-primary" onClick={() => onViewClick(-1)}>
                  Add Book
                </button>
              </div>
            </div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Date Established</th>
                            <th>Page Count</th>
                            <th>Sold Count</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterBooks.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.description}</td>
                                <td>{book.category}</td>
                                <td>{book.date}</td>
                                <td>{book.page}</td>
                                <td>{book.sold}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => onViewClick(book.id)}>View</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(book.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Books;

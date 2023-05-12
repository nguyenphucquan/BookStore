import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Books(props) {
    const [books, setBooks] = useState([])
    const [filterBooks, setFilterBook] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate()
    const onViewClick = (id) => {
        navigate(`/book/${id}`)
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);  
    };

    const handleSearch = () => {
        if(searchTerm.trim().length !== 0){
            fetch(`http://localhost:8080/books/${searchTerm}`)
                .then((response) => response.json())
                .then((data) => {
                    setBooks(data);
                    console.log(data);
                })
                .catch((err) => console.log(err));
        }else{
            fetch('http://localhost:8080/books')
            .then(response => response.json())
            .then(data => {
                setFilterBook(data);
                console.log(data)
            })
        }
    };

    useEffect(() => {
        fetch('http://localhost:8080/books')
            .then(response => response.json())
            .then(data => {
                setBooks(data);
                setFilterBook(data);
                console.log(data)
            })
            .then(json => console.log(json))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        setFilterBook(books.filter((item) => {
            return item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.author.toLowerCase().includes(searchTerm.toLowerCase());
        }))
    }, [searchTerm])

    return (
        <div>
            <h2 className="text-center">Books List</h2>
            <div className="d-flex justify-content-center">
                <div className="row mb-3">
                    <div className="col">
                        <input
                            type="text" className="form-control" placeholder="Search by title or author" value={searchTerm} onChange={handleSearchChange} />
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th disabled>Sold</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
{filterBooks.map((book) => (
                            <tr key={book.bookcode}>
                                <td>{book.bookcode}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.category}</td>
                                <td>
                                    <input type="checkbox" defaultChecked={book.sold}></input>
                                </td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => { onViewClick(book.bookcode) }}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Books;
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
            return item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.major.toLowerCase().includes(searchTerm.toLowerCase());
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
                            <th>Name</th>
                            <th>Dob</th>
                            <th>Major</th>
                            <th disabled>Vaccinated</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
{filterBooks.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.name}</td>
                                <td>{book.dob}</td>
                                <td>{book.major}</td>
                                <td>
                                    <input type="checkbox" defaultChecked={book.vaccinated}></input>
                                </td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => { onViewClick(book.id) }}>View</button>
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
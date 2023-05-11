import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Book(props) {
  const params = useParams();
  const [book, setbook] = useState({});
  const id = params.id;
  const navigate = useNavigate();
  const onSaveClick = () => {
    console.log(book);
    const confirmSave = window.confirm("Bạn có muốn lưu thông tin sách này không?");
    if (confirmSave) {
      if (id === "-1") {
        fetch(`http://localhost:8080/book/save/-1`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json; charset=ISO-8859-1",
          },
          body: JSON.stringify(book),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            navigate(`/books`);
          })
          .catch((err) => {
            console.log(err);
            alert("Failed to save book.");
          });
      }
      else {
        fetch(`http://localhost:8080/book/save/${id}`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json; charset=ISO-8859-1",
          },
          body: JSON.stringify(book),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            navigate(`/books`);
          })
          .catch((err) => {
            console.log(err);
            alert("Failed to update book.");
          });
      }
    }

  }


  useEffect(() => {
    fetch(`http://localhost:8080/book/${id}`)
      .then(response => response.json())
      .then(data => setbook(data))
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div>
      <h1>{id < 0 ? `New book` : `book ${id}`}</h1>
      Title: {" "}
      <input type="text" value={book.title ? book.title : ""} onChange={(e) => setbook({ ...book, title: e.target.value })}></input>
      <br />
      Author: {" "}
      <input type="text" value={book.author ? book.author : ""} onChange={(e) => setbook({ ...book, author: e.target.value })}></input>
      <br />
      Category: {" "}
      <input type="text" value={book.category ? book.category : ""} onChange={(e) => setbook({ ...book, category: e.target.value })}></input>
      <br />
      Sold: {" "}
      <input type="checkbox" value={book.sold ? book.sold : ""} checked={book.sold} onChange={(e) => setbook({ ...book, sold: e.target.checked })}></input>
      <br></br>
      <button onClick={onSaveClick}>Save</button>
    </div>
  )
}

export default Book;
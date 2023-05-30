import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { useSelector } from 'react-redux';

const BookItem = () => {
  const { id } = useParams();

  const { userRole, isLoggedIn } = useSelector(state => state.authReducer)
  const [book, setBook] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);


  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleEdit = (commentId) => {
    setEditingCommentId(commentId);
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    if (commentToEdit) {
      setEditedComment(commentToEdit.comment);
    }
  };

  const saveEditedComment = (commentId) => {
    // Tạo payload chứa dữ liệu comment sửa đổi
    const payload = {
      comment: editedComment, // editedComment là biến chứa nội dung comment sửa đổi
    };

    // Gọi API để cập nhật comment
    axios.put(`http://localhost:8080/api/comments/${commentId}`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(`Successfully saved edited comment for commentId: ${commentId}`);
        setEditingCommentId(null);
        setEditedComment("");

        // Cập nhật danh sách bình luận sau khi lưu bình luận chỉnh sửa thành công
        const updatedComments = comments.map(comment => {
          if (comment.id === commentId) {
            // Cập nhật nội dung bình luận
            return {
              ...comment,
              comment: editedComment
            };
          }
          return comment;
        });
        setComments(updatedComments);
      })

  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id !== "-1") {
          // Lấy thông tin sách
          const bookResponse = await fetch(`http://localhost:8080/api/book/${id}`);
          const bookData = await bookResponse.json();
          setBook({ ...bookData });

          // Lấy danh sách bình luận
          const commentsResponse = await axios.get(`http://localhost:8080/api/comments/${id}`);
          setComments(commentsResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  // Xóa comment
  const deleteComment = async (commentId) => {
    try {
      // Kiểm tra xem người dùng đã đăng nhập chưa
      if (!isLoggedIn) {
        console.log("User must be logged in to delete a comment.");
        return;
      }

      const userid = localStorage.getItem("idUser")
      const userIdInt = parseInt(userid, 10);

      // Lấy thông tin bình luận từ danh sách comments
      const commentToDelete = comments.find((comment) => comment.id === commentId);
      console.log(commentToDelete.user.id)
      console.log(userid)
      // Kiểm tra xem người dùng hiện tại có quyền xóa bình luận không
      if (commentToDelete.user.id !== userIdInt) {
        console.log("You are not authorized to delete this comment.");
        return;
      }

      // Gửi yêu cầu xóa bình luận đến server
      await axios.delete(`http://localhost:8080/api/comments/${commentId}`);

      // Cập nhật danh sách bình luận sau khi xóa
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };


  if (!book) {
    return <div>Loading...</div>;
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    setLoading(true);
    setMessage('');

    try {
      const cartId = localStorage.getItem('cart');
      const token = localStorage.getItem('accessToken');
      const bookId = book.id;
      const response = await axios.post(
        `http://localhost:8080/carts/add/items`,
        null,
        {
          params: {
            cartId: cartId,
            bookId: bookId,
            quantity: quantity
          },
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      setMessage(response.data);
    } catch (error) {
      setMessage('Error occurred while adding item to cart');
    }

    setLoading(false);
  };


  const handleCommentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleSendComment = async () => {
    try {
      const formData = {
        comment: commentContent
      };
      const userid = localStorage.getItem("cart")
      const encodedData = qs.stringify(formData);

      const response = await axios.post(`http://localhost:8080/api/comments/${id}/${userid}`, encodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      setComments(prevComments => [...prevComments, response.data]);
      setCommentContent('');
      console.log(response.data);
      // Xử lý response từ server (nếu cần)
    } catch (error) {
      console.error(error);
      // Xử lý lỗi (nếu cần)
    }
  };

  return (
    <>
    <div className="container card">
    <section className="py-5">
      <div className="row gx-4 gx-lg-5 align-items-center">
        <div className="col-md-4">
          <img
            className="card-img-top mb-5 mb-md-0"
            src={book.image && require(`../assets/images/${book.image}`)}
            alt="book-cover"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
        <div className="col-md-6">
          <div className="fs-5 mb-5">
            <h1 className="display-6 mb-2 fw-bolder">{book.title}</h1>
            <h3 className="fs-6 mb-4 fw-light">by {book.author}</h3>
          </div>
          <div className="row">
            <div className="fs-5 mb-2">
              <span>{book.price && book.price.toLocaleString()} đ</span>
            </div>
            <div className="input-group input-group-sm mb-3">
              <button className="btn btn-outline-dark" type="button" onClick={handleDecrement}>
                -
              </button>
              <div>
                <input
                  type="text"
                  className="form-control text-center small-input"
                  style={{ width: '50px' }}
                  value={quantity}
                />
              </div>
              <button className="btn btn-outline-dark" type="button" onClick={handleIncrement}>
                +
              </button>
            </div>
            <div className="mt-auto">
              <button
                className="btn btn-outline-dark"
                type="button"
                onClick={handleAddToCart}
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add to cart'}
              </button>
            </div>
          </div>
          <div>
            {showDescription ? (
              <div>
                <p className="lead fs-6">{book.description}</p>
                <button className="btn btn-link" onClick={toggleDescription}>
                  Show less
                </button>
              </div>
            ) : (
              <div>
                <p
                  className="lead fs-6"
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {book.description}
                </p>
                <button className="btn btn-link" onClick={toggleDescription}>
                  Show more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {message && <div className="row mt-4 text-center">{message}</div>}
    </section>
  </div>
  
      <section>
        <div className="container my-5 py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="card text-dark">
                <div className="card-body p-4 pb-0">
                  <h4 className="mb-0">Recent comments</h4>
                  <p className="fw-light mb-4">Latest Comments section by users</p>
                </div>
                {comments.length !== 0 ? (
                  <div>
                    {comments.map(comment => (
                      comment && (
                        <div key={comment.id} className="card-body p-4">
                          <div className="card-text border rounded p-3">
                            {/* Tạo hộp và bo góc */}
                            <div className="d-flex align-items-start mb-3">
                              <div className="rounded-circle me-3">
                                <i className="fa-solid fa-user fa-lg" style={{ color: "black" }}></i>
                              </div>
                              <div className="text-left">
                                {/* Căn lề sang trái */}
                                <h6 className="fw-bold mb-1" style={{ color: 'black' }}>{comment.user.userName}</h6>
                                <p className="mb-0 text-muted">{comment.date}</p>
                              </div>
                              <div className="ms-auto">
                                <i className="fas fa-edit me-2" onClick={() => handleEdit(comment.id)}></i>
                                <i className="fas fa-trash" onClick={() => deleteComment(comment.id)}></i>
                              </div>
                            </div>
                            {editingCommentId === comment.id ? (
                              <div>
                                {/* Hiển thị hình thức sửa đổi, ví dụ: một trường nhập liệu */}
                                <input
                                  type="text"
                                  className="form-control"
                                  value={editedComment}
                                  onChange={(e) => setEditedComment(e.target.value)}
                                />
                                {/* Button lưu để hoàn tất việc sửa đổi */}
                                <button className="btn btn-primary mt-2" onClick={() => saveEditedComment(comment.id)}>
                                  Save
                                </button>
                              </div>
                            ) : (
                              <p className="mb-0 text-left">{comment.comment}</p>
                            )}
                          </div>
                          <hr className="my-0" />
                        </div>
                      )
                    ))}
                  </div>
                ) : (
                  <h5 className="p-4">Be the first to comment here.</h5>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container my-5 py-5 text-dark">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="card">
                <div className="card-body p-4">
                  <div className="d-flex flex-start w-100">
                    <div className="w-100">
                      <>
                        <div className="form-outline">
                          <label className="form-label my-3" htmlFor="textAreaExample">What is your opinion?</label>
                          <textarea className="form-control" id="textAreaExample" rows="4" value={commentContent}  // Gán giá trị từ state `commentContent`
                            onChange={handleCommentChange}></textarea>
                        </div>
                        <div className="d-flex float-end mt-3">
                          <button type="button" className="btn btn-success" onClick={handleSendComment}>
                            Send <i className="fas fa-long-arrow-alt-right ms-1"></i>
                          </button>
                        </div>
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};
export default BookItem;
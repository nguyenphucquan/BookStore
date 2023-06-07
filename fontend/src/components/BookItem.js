import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import Rating from 'react-rating';
import { NavLink } from 'react-router-dom';


const BookItem = () => {
  const { id } = useParams();

  const { userRole, isLoggedIn } = useSelector(state => state.authReducer)
  const [book, setBook] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const [showDescription, setShowDescription] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleToggleDescription = () => {
    setShowDescription(!showDescription);
    setShowFullDescription(false);
  };

  const handleRatingChange = value => {
    setRating(value);
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

      // Kiểm tra xem người dùng hiện tại có quyền xóa bình luận không
      // if (userRole !== "ADMIN") {
      //   console.log("You are not authorized to delete this comment.");
      //   return;
      // }

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
      const cartId = localStorage.getItem('cartid');
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

      dispatch(addToCart({ bookId: book.id, quantity }));
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
      const userid = localStorage.getItem("idUser")
      const requestBody = {
        comment: commentContent,
        rating: rating // selectedRating là giá trị đánh giá được chọn
      };

      const response = await axios.post(`http://localhost:8080/api/comments/${id}/${userid}`, requestBody);
      setComments(prevComments => [...prevComments, response.data]);
      setCommentContent('');
      console.log(response.data);
      // Xử lý response từ server (nếu cần)
    } catch (error) {
      console.error(error);
      // Xử lý lỗi (nếu cần)
    }
  };
  const calculateRating = () => {
    if (comments.length === 0) {
      return 0; // Nếu không có đánh giá nào, tỷ lệ là 0
    }

    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = totalRating / comments.length;

    return averageRating;
  };


  return (
    <>
      <div className="container card mt-3" style={{ backgroundColor: "ghostwhite" }}>
        <section>
          <div className="row">
            <div className="col col-md-4">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={book.image && require(`../assets/images/${book.image}`)}
                alt="book-cover"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
            <div className="col col-md-8 d-flex flex-column">
              <div className="row mt-5">
                <h1>{book.title}</h1>
              </div>
              <div className="row">
                <Rating
                  initialRating={calculateRating()} // Sử dụng hàm calculateRating để tính toán tỷ lệ
                  emptySymbol={<i className="far fa-star" style={{ color: "#eee71b" }}></i>}
                  fullSymbol={<i className="fas fa-star" style={{ color: "#eee71b" }}></i>}
                  readonly // Đặt readonly để không cho phép người dùng đánh giá trên component
                />
                <span className="ms-2">
                  ({comments.length} {comments.length === 1 ? 'đánh giá' : 'đánh giá'})
                </span>
              </div>

              <div className="row">
                <ul className="list-unstyled text-left">
                  <li>
                    <strong>Tác giả:</strong> {book.author}
                  </li>
                  <li>
                    <strong>Ngày xuất bản:</strong> {new Date(book.date).toLocaleDateString()}
                  </li>
                  <li>
                    <strong>Số trang:</strong> {book.page}
                  </li>
                </ul>
                <div className="col mt-auto">
                  <div className="row">
                    <div className="col mb-3">
                      <strong>Số lượng:</strong>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <button className="btn btn-outline-dark" type="button" onClick={handleDecrement}>
                      -
                    </button>
                    <input
                      type="text"
                      className="form-control text-center small-input"
                      style={{ width: '50px' }}
                      value={quantity}
                    />
                    <button className="btn btn-outline-dark" type="button" onClick={handleIncrement}>
                      +
                    </button>
                  </div>
                  <div className="row justify-content-center mt-3">
                    <div className="col">
                      {!isLoggedIn ? (
                        <NavLink to="/login" className="btn btn-outline-dark w-50">
                          Thêm vào giỏ hàng
                        </NavLink>
                      ) : (
                        <button
                          className="btn btn-outline-dark w-50"
                          type="button"
                          onClick={handleAddToCart}
                          disabled={loading}
                        >
                          {loading ? 'Adding...' : 'Thêm vào giỏ hàng'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              </div>
              <div className="row" tyle={{ textAlign: 'left' }}>
                {showDescription ? (
                  <div>
                    <p className="mb-0 text-left">{book.description}</p>
                    <button className="btn btn-link" onClick={handleToggleDescription}>
                      Thu gọn mô tả
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-link p-0" onClick={handleToggleDescription}>
                    Hiển thị mô tả
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <section>
        <div className="container my-5 py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="card text-dark">
                <div className="card-body p-4 pb-0">
                  <h4 className="mb-0">ĐÁNH GIÁ SẢN PHẨM</h4>
                </div>
                {comments.map(comment => (
                  comment && (
                    <div key={comment.id} className="card-body p-4">
                      <div className="card-text border rounded">
                        <div className="d-flex align-items-start mb-3">
                          <div className="rounded-circle me-3">
                            <i className="fa-solid fa-user fa-lg" style={{ color: "black" }}></i>
                          </div>
                          <div className="text-left">
                            <div className="d-flex align-items-start">
                              <p
                                className="fw-bold mb-0 me-3"
                                style={{
                                  color: userRole === 'ADMIN' ? 'red' : 'black',
                                  width: '100px'
                                }}
                              >
                                {comment.user.userName}
                              </p>
                              <Rating
                                initialRating={comment.rating}
                                emptySymbol={<i className="far fa-star" style={{ color: "#eee71b", marginRight: '5px' }}></i>}
                                fullSymbol={<i className="fas fa-star" style={{ color: "#eee71b", marginRight: '5px' }}></i>}
                                readonly
                              />
                            </div>
                            <p className="fw-bold mb-0 text-left" style={{ color: 'black', width: '70px' }}>{new Date(comment.date).toLocaleDateString()}</p>
                          </div>
                          <div className="ms-auto">
                            {isLoggedIn && (userRole === "ADMIN" || comment.user.id.toString() === localStorage.getItem("idUser")) && (
                              <>
                                <i className="fas fa-trash" onClick={() => deleteComment(comment.id)}></i>
                              </>
                            )}
                          </div>
                        </div>

                        {editingCommentId === comment.id ? (
                          <div>
                            <input
                              type="text"
                              className="form-control"
                              value={editedComment}
                              onChange={(e) => setEditedComment(e.target.value)}
                            />
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
                      <>                        <Rating
                        initialRating={rating}
                        emptySymbol={<i className="far fa-star" style={{ color: "#eee71b" }}></i>}
                        fullSymbol={<i className="fas fa-star" style={{ color: "#eee71b" }}></i>}
                        onChange={handleRatingChange}
                      />
                        <div className="form-outline">
                          <label className="form-label my-3" htmlFor="textAreaExample">Đưa ra ý kiến?</label>
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
import axiosClient from "../api/axiosClient";

const token = localStorage.getItem("accessToken")
// const role = localStorage.getItem("userRole")
const createConfig = () => {
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
           // 'Content-Type': 'multipart/formdata'
        }
    }
}
const BookAPI = {

  getAllBooks: () => {
    const url = "/books";
    return axiosClient.get(url);
  },
  getBook: (id) => {
    const url = `/books/${id}`;
    return axiosClient.get(url);
  },
  createBook: (id, book) => {
    const url = `/book/save/${id}`;
    return axiosClient.post(url, book)
  },
  updateBook: (id, book) => {
    const url = `/book/save/${id}`;
    return axiosClient.put(url, book);
  },
  deleteBook: (id) => {
    const url = `/books/${id}`;
    return axiosClient.delete(url,createConfig());
  },
  searchBooks: (searchTerm) => {
    const url = `/books?search=${searchTerm}`;
    return axiosClient.get(url);
  },
};

export default BookAPI;
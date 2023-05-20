import axiosClient from "../api/axiosClient";

const BookAPI = {
  getAllBooks: () => {
    const url = "/books";
    return axiosClient.get(url);
  },
  getBook: (id) => {
    const url = `/books/${id}`;
    return axiosClient.get(url);
  },
  createBook: (book) => {
    const url = "/books";
    return axiosClient.post(url, book);
  },
  updateBook: (id, book) => {
    const url = `/books/${id}`;
    return axiosClient.put(url, book);
  },
  deleteBook: (id) => {
    const url = `/books/${id}`;
    return axiosClient.delete(url);
  },
  searchBooks: (searchTerm) => {
    const url = `/books?search=${searchTerm}`;
    return axiosClient.get(url);
  },
};

export default BookAPI;

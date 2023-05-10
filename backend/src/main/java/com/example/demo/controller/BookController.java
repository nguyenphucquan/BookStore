package com.example.demo.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.BookDao;
import com.example.demo.model.Book;

@RestController
@CrossOrigin
public class BookController {
	private BookDao bookDao = new BookDao();

	@GetMapping("/books")
	public List<Book> getBooks() throws IOException {
		List<Book> books = bookDao.selectAllBooks();
		return books;
	}
	@GetMapping("/books/{search}")
	public List<Book> searchBooks(@PathVariable String search) {
	    List<Book> books = bookDao.searchBooks(search);
	    return books;
	}
	@GetMapping("/book/{bookcode}")
	public Book getBook(@PathVariable String bookcode) {
		Book book = bookDao.selectBook(Integer.valueOf(bookcode));
		return book;
	}

	@PostMapping("/book/save/{bookcode}")
	public List<Book> addBook(@RequestBody Book book) {
		bookDao.insertBook(book);
		return bookDao.selectAllBooks();
	}

	@PutMapping("book/save/{bookcode}")
	public List<Book> update(@RequestBody Book book) {
		bookDao.updateBook(book);
		return bookDao.selectAllBooks();
	}

	@DeleteMapping("/book/delete/{bookcode}")
	public List<Book> deleteBook(@PathVariable int bookcode) {
		bookDao.deleteBook(bookcode);
		return bookDao.selectAllBooks();
	}
}

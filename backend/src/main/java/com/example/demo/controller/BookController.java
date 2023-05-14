package com.example.demo.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.BookEntity;
import com.example.demo.service.BookService;

@RestController
@CrossOrigin
public class BookController {
	@Autowired
	private BookService bookService;
	@GetMapping("/books")
	public List<BookEntity> getBooks() {
	    return bookService.getAllBooks();
	}
//	@GetMapping("/books/{search}")
//	public List<BookEntity> searchBooks(@PathVariable String search) {
//	    return bookService.searchBooks(search);
//	}
	@GetMapping("/book/{bookcode}")
	public BookEntity getBook(@PathVariable Long bookcode) {
	    return bookService.getBookById(bookcode);
	}
	@PostMapping("/book/save/{bookcode}")
	public List<BookEntity> addBook(@RequestBody BookEntity book) {
	    bookService.addBook(book);
	    return bookService.getAllBooks();
	}
	@PutMapping("book/save/{bookcode}")
	public List<BookEntity> update(@RequestBody BookEntity book) {
	    bookService.updateBook(book);
	    return bookService.getAllBooks();
	}
	@DeleteMapping("/book/delete/{bookcode}")
	public List<BookEntity> deleteBook(@PathVariable Long bookcode) {
	    bookService.deleteBook(bookcode);
	    return bookService.getAllBooks();
	}

}

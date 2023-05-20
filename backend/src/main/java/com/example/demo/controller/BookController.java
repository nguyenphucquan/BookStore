package com.example.demo.controller;

import com.example.demo.entity.Book;
import com.example.demo.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class BookController {
	@Autowired
	private IBookService bookService;

	@GetMapping("/books")
	public ResponseEntity<List<Book>> getAllBooks() {
		List<Book> books = bookService.findAll();
		return ResponseEntity.ok(books);
	}

	@GetMapping("/book/{id}")
	public ResponseEntity<Book> getBookById(@PathVariable Long id) {
		Book book = bookService.findById(id);
		if (book != null) {
			return ResponseEntity.ok(book);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("/books/new")
	public ResponseEntity<Book> createBook(@RequestBody Book book) {
		bookService.save(book);
		return ResponseEntity.status(HttpStatus.CREATED).body(book);
	}

	@PutMapping("book/{id}")
	public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book book) {
		Book existingBook = bookService.findById(id);
		if (existingBook != null) {
			book.setId(existingBook.getId());
			bookService.save(book);
			return ResponseEntity.ok(book);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/books/{id}")
	public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
		Book existingBook = bookService.findById(id);
		if (existingBook != null) {
			bookService.deleteById(id);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}

package com.example.demo.controller;

import java.io.File;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.example.demo.entity.Book;
import com.example.demo.service.IBookService;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class BookController {
	@Autowired
	private IBookService bookService;
	@Autowired
	ObjectMapper objectMapper;

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
	
	@PostMapping("/book/save/{id}")
	public ResponseEntity<List<Book>> addBook(@RequestParam("book") String bookJson, @RequestParam("image") MultipartFile image) {
	    try {
	        // Chuyển đổi chuỗi JSON thành đối tượng Book
	        Book book = objectMapper.readValue(bookJson, Book.class);
	        book.setId(null);

	        // Lưu tệp ảnh và nhận đường dẫn ảnh
	        if (!image.isEmpty()) {
	            String imagePath = saveImage(image);
	            book.setImage(imagePath);
	        }
	        // Lưu đối tượng Book
	        bookService.save(book);

	        // Trả về danh sách sách đã lưu
	        List<Book> books = bookService.findAll();
	        return ResponseEntity.ok(books);
	    } catch (IOException e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	}

	private String saveImage(MultipartFile image) throws IOException {
	    // Đường dẫn thư mục lưu trữ ảnh
	    String saveDirectory = "D:\\BookStore\\fontend\\src\\assets\\images";

	    // Tạo tên tệp ảnh duy nhất
	    String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();

	    // Tạo đường dẫn tới tệp ảnh
	    Path filePath = Paths.get(saveDirectory, fileName);

	    // Lưu tệp ảnh vào thư mục lưu trữ
	    Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

	    // Trả về đường dẫn tệp ảnh
	    return fileName;
	}

//	@PostMapping("/book/save/{id}")
//	public ResponseEntity<Book> createBook(@RequestBody Book book) {
//		bookService.save(book);
//		return ResponseEntity.status(HttpStatus.CREATED).body(book);
//	}

	@PutMapping("/book/save/{id}")
	public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestParam("book") String bookJson, @RequestParam(value = "image", required = false) MultipartFile image) {
	    try {
	        Book existingBook = bookService.findById(id);
	        if (existingBook == null) {
	            return ResponseEntity.notFound().build();
	        }

	        Book book = objectMapper.readValue(bookJson, Book.class);
	        book.setId(existingBook.getId());

	        if (image != null && !image.isEmpty()) {
	            String imagePath = saveImage(image);
	            book.setImage(imagePath);
	        }

	        bookService.save(book);
	        return ResponseEntity.ok(book);
	    } catch (IOException e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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

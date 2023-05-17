package com.example.demo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Book;
import com.example.demo.repository.BookRepository;

import java.util.List;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    public Book getBookById(Long bookcode) {
        return bookRepository.findById(bookcode).orElse(null);
    }
    public void addBook(Book book) {
        bookRepository.save(book);
    }
    public void updateBook(Book book) {
        bookRepository.save(book);
    }
    public void deleteBook(Long bookcode) {
        bookRepository.deleteById(bookcode);
    }
}


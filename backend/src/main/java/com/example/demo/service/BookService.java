package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.BookEntity;
import com.example.demo.repository.BookRepository;

import java.util.List;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    
    public List<BookEntity> getAllBooks() {
        return bookRepository.findAll();
    }

    public BookEntity getBookById(Long bookcode) {
        return bookRepository.findById(bookcode).orElse(null);
    }

    public void addBook(BookEntity book) {
        bookRepository.save(book);
    }

    public void updateBook(BookEntity book) {
        bookRepository.save(book);
    }

    public void deleteBook(Long bookcode) {
        bookRepository.deleteById(bookcode);
    }
}


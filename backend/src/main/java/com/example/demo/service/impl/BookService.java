package com.example.demo.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Book;
import com.example.demo.repository.BookRepository;
import com.example.demo.service.IBookService;

@Service
public class BookService implements IBookService {


	@Autowired
	BookRepository bookRepository;

	@Override
	public List<Book> findAll() {
		return bookRepository.findAll();
	}

	@Override
	public Book findById(Long id) {
	    Optional<Book> optionalBook = bookRepository.findById(id);
	    return optionalBook.orElse(null);
	}
	@Override
	public void save(Book book) {
		bookRepository.save(book);
	}

	@Override
	public void deleteById(Long id) {
             bookRepository.deleteById(id);		
	}
}
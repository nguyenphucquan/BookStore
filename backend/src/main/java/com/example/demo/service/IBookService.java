package com.example.demo.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Book;



@Service
public interface IBookService {
	List<Book> findAll();
	
	Book findById(Long id);
	
	void save(Book book);
	
	void deleteById(Long id);
}
package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

	boolean existsByTitleAndAuthor(String title, String author);
}
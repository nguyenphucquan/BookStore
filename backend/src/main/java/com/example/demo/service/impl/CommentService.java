package com.example.demo.service.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Comment;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ICommentService;

@Service
public class CommentService implements ICommentService{

	@Autowired
	CommentRepository commentRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	BookRepository bookRepository;

	@Override
	public List<Comment> findCommentsByBookId(Long bookId) {
		return commentRepository.findByBookId(bookId);
	}

	@Override
	public Comment postComment(Long userId, Long bookId, String comment) {
		java.util.Date utilDate = java.util.Calendar.getInstance().getTime();
		Date sqlDate = new Date(utilDate.getTime());
		Comment newComment = new Comment(null, userRepository.findById(userId).get(),
				bookRepository.findById(bookId).get(), comment, sqlDate);
		commentRepository.save(newComment);
		return newComment;
	}

	@Override
	public void deleteComment(Long commentId) {
		commentRepository.deleteById(commentId);
	}


}

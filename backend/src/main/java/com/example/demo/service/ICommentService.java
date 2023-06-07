package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Comment;

public interface ICommentService {
    List<Comment> findCommentsByBookId(Long bookId);
    
    void deleteComment(Long commentId);
    
    Comment postComment(Long userId, Long bookId, String comment, int ratingValue);
}

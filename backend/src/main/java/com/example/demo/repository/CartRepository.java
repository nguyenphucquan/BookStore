package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
	 Optional<Cart> findByUserId(Long userId);
	    @Query("SELECT c FROM Cart c JOIN c.items ci WHERE ci.book.id = :id")
	    List<Cart> findCartsByBookId(@Param("id") Long id);
}

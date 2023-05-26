package com.example.demo.repository;

import com.example.demo.entity.Cart;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
	 Optional<Cart> findByUserId(Long userId);
}

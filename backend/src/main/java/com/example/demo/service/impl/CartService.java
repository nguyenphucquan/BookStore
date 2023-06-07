package com.example.demo.service.impl;

import java.util.List;
import java.util.Optional;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Book;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;
import com.example.demo.entity.User;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.CartItemRepository;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class CartService {

	@Autowired
	private CartRepository cartRepository;
	
    @Autowired
    private  UserRepository userRepository;
    
    @Autowired
    private BookRepository bookRepository;
    
    @Autowired
    private CartItemRepository cartItemRepository;

	public Cart createCart(Long userId) {
		Optional<User> existingUser = userRepository.findById(userId);
		Cart cart = new Cart();
		cart.setUser(existingUser.orElseThrow(() -> new RuntimeException("User not found")));
		return cartRepository.save(cart);
	}

	public Cart getCartById(Long cartId) {
		return cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));
	}

	public List<CartItem> getCartItems(Cart cart) {
		Hibernate.initialize(cart.getItems());
		return cart.getItems();
	}
	public String addCartItem(long cartId, Long bookId, int quantity) {
		Optional<Cart> optionalCart = cartRepository.findById(cartId);
		Optional<Book> optionalBook = bookRepository.findById(bookId);

		if (optionalCart.isPresent() && optionalBook.isPresent()) {
			Cart cart = optionalCart.get();
			List<CartItem> cartItems = cart.getItems();

			Optional<CartItem> optionalCartItem = cartItems.stream()
					.filter(item -> item.getBook().getId().equals(bookId)).findFirst();

			if (optionalCartItem.isPresent()) {
				CartItem cartItem = optionalCartItem.get();
				cartItem.setQuantity(cartItem.getQuantity() + quantity);
				cartRepository.save(cart);
				return "Item quantity updated";
			} else {
				CartItem newCartItem = new CartItem();
				newCartItem.setBook(optionalBook.get());
				newCartItem.setQuantity(quantity);
				newCartItem.setCart(cart);
				cartItems.add(newCartItem);
				cartRepository.save(cart);
				return "Item added to cart";
			}
		} else {
			throw new RuntimeException("Invalid Product or Cart ID");
		}
	}

	@Transactional
	public void removeCartItem(Long cartId, Long cartItemId) {
		try {
			Optional<Cart> savedCart = cartRepository.findById(cartId);
			Optional<CartItem> savedCartItem = cartItemRepository.findById(cartItemId);
			if (savedCart.isPresent() && savedCartItem.isPresent()) {
				List<CartItem> cartItems = savedCart.get().getItems();
				cartItems.remove(savedCartItem.get());

				cartRepository.save(savedCart.get());
			}

		} catch (Exception exception) {

			throw new RuntimeException("cart item or cart not found");
		}
	}

	@Transactional
	public void clearCart(Long cartId) {
		Optional<Cart> optionalCart = cartRepository.findById(cartId);
		if (optionalCart.isPresent()) {
			Cart cart = optionalCart.get();
			List<CartItem> cartItems = cart.getItems();
			cartItems.clear();
			cartRepository.save(cart);
		}
	}

	public Cart getCart(Long userId) {
		return cartRepository.findByUserId(userId).orElseGet(() -> createCart(userId));
	}

	public List<Cart> getAllCarts() {
		return cartRepository.findAll();
	}
}

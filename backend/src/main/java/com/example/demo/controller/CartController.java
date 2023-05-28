package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;
import com.example.demo.service.impl.CartService;

@RestController
@RequestMapping("/carts")
public class CartController {

	@Autowired
	private CartService cartService;

	@PostMapping("/create")
	public ResponseEntity<Cart> createCart(@RequestParam Long user_id) {
		Cart cart = cartService.createCart(user_id);
		return ResponseEntity.ok(cart);
	}

	@GetMapping("/all")
	public ResponseEntity<List<Cart>> getAllCarts() {
	    List<Cart> carts = cartService.getAllCarts();
	    return ResponseEntity.ok(carts);
	}
	@GetMapping("/get")
	public ResponseEntity<Cart> getCartById(@RequestParam("id")Long userId) {
		Cart cart = cartService.getCart(userId);
		if (cart == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(cart);
	}

	@GetMapping("/get/items")
	public ResponseEntity<List<CartItem>> getCartItems(@RequestParam("id") Long cartId) {
		Cart cart = cartService.getCartById(cartId);
		if (cart == null) {
			return ResponseEntity.notFound().build();
		}
		List<CartItem> cartItems = cartService.getCartItems(cart);
		return ResponseEntity.ok(cartItems);
		
	}

	@PostMapping("/add/items")
	public ResponseEntity<String> addCartItem(@RequestParam Long cartId, @RequestParam long bookId,
			@RequestParam int quantity) {
		cartService.addCartItem(cartId, bookId, quantity);
		return ResponseEntity.ok("Item added to cart");
	}

	@DeleteMapping("/remove/items")
	public ResponseEntity<?> removeCartItem(@RequestParam Long cartId, @RequestParam Long itemId) {
		cartService.removeCartItem(cartId, itemId);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/clear")
	public ResponseEntity<?> clearCart(@RequestParam Long id) {
		Cart cart = cartService.getCartById(id);
		if (cart == null) {
			return ResponseEntity.notFound().build();
		}
		cartService.clearCart(id);
		return ResponseEntity.ok().build();
	}
}

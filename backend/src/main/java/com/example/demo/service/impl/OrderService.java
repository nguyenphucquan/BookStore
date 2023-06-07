package com.example.demo.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderItem;
import com.example.demo.entity.PaymentMethod;
import com.example.demo.entity.User;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.OrderItemRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;
    @Transactional
    public Order placeOrder(Long cartId,Order order) {
        // Lấy thông tin giỏ hàng từ cartId
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        if (!optionalCart.isPresent()) {
            throw new RuntimeException("Cart Not Found");
        }
        Cart cart = optionalCart.get();
        List<CartItem> cartItems = cart.getItems();

        order.setUser(cart.getUser());
        order.setOrderDate(LocalDate.now());
        order.setPayment(PaymentMethod.CASH_ON_DELIVERY);
        order = orderRepository.save(order);

        // Tạo danh sách các OrderItem và tính giá cho từng mục
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setBook(cartItem.getBook());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setOrder(order);
            orderItem.setOrderedProductPrice(cartItem.getBook());
            orderItemRepository.save(orderItem); // Save the order item to the database

            orderItems.add(orderItem);
        }


        // Cập nhật danh sách OrderItem và tổng giá trị cho Order
        order.setOrderItems(orderItems);
        order.setTotalAmount(order.calculateTotalAmount());
        order = orderRepository.save(order);

        // Xóa các mục trong giỏ hàng và lưu thay đổi
        cart.clearItems();
        cartRepository.save(cart);

        return order;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByUserId(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        List<Order> orders = orderRepository.findByUser(user);
        return orders;
    }
    
    public void deleteOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with ID: " + id));

        orderItemRepository.deleteAll(order.getOrderItems());
        orderRepository.delete(order);
    }
}

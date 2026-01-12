package com.nauman.nauman_api.service;

import com.nauman.nauman_api.model.*;
import com.nauman.nauman_api.repository.CartRepository;
import com.nauman.nauman_api.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CheckoutService {

    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;

    public CheckoutService(CartRepository cartRepository, OrderRepository orderRepository) {
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
    }

    public Order checkout() {
        Cart cart = cartRepository.getCart();

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty. Add items before checkout.");
        }

        // Convert CartItem -> OrderItem (copy snapshot)
        List<OrderItem> orderItems = cart.getItems().stream()
                .map(ci -> new OrderItem(ci.getProductId(), ci.getName(), ci.getUnitPrice(), ci.getQuantity()))
                .collect(Collectors.toList());

        Order order = new Order();
        order.setItems(orderItems);
        order.setTotal(cart.getTotal());
        order.setStatus(OrderStatus.CREATED);

        // Save order in memory and get an ID
        Order saved = orderRepository.save(order);

        // IMPORTANT: For payment flow, we usually keep cart until payment success.
        // So we do NOT clear cart here.
        return saved;
    }
}

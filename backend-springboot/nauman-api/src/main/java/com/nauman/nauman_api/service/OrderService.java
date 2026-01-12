package com.nauman.nauman_api.service;

import com.nauman.nauman_api.model.Order;
import com.nauman.nauman_api.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrderRepository repo;

    public OrderService(OrderRepository repo) {
        this.repo = repo;
    }

    public Order getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }
}

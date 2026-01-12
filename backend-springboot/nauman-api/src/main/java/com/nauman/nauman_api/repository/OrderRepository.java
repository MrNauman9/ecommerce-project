package com.nauman.nauman_api.repository;

import com.nauman.nauman_api.model.Order;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class OrderRepository {

    private final Map<Long, Order> orderStore = new HashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1000); // start from 1000

    public Order save(Order order) {
        if (order.getId() == null) {
            order.setId(idGenerator.incrementAndGet());
        }
        orderStore.put(order.getId(), order);
        return order;
    }

    public Optional<Order> findById(Long id) {
        return Optional.ofNullable(orderStore.get(id));
    }
}

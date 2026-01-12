package com.nauman.nauman_api.service;

import com.nauman.nauman_api.model.Order;
import com.nauman.nauman_api.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class NetsPaymentService {

    private final OrderRepository orderRepository;

    @Value("${nets.secret-key}")
    private String secretKey;

    public NetsPaymentService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public String createPaymentSession(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getPaymentId() != null) {
            return order.getPaymentId();
        }

        // DEMO paymentId (later replaced with NETS API call)
        String paymentId = "test-payment-" + UUID.randomUUID();

        order.setPaymentId(paymentId);
        orderRepository.save(order);

        return paymentId;
    }
}

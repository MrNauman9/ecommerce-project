package com.nauman.nauman_api.model;

import java.util.ArrayList;
import java.util.List;

public class Order {
    private Long id;
    private List<OrderItem> items = new ArrayList<>();
    private double total;
    private OrderStatus status;
    private String paymentId;

    public Order() {}

    public Order(Long id, List<OrderItem> items, double total, OrderStatus status) {
        this.id = id;
        this.items = items;
        this.total = total;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }

    public OrderStatus getStatus() { return status; }
    public void setStatus(OrderStatus status) { this.status = status; }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }
}

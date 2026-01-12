package com.nauman.nauman_api.model;

import java.util.ArrayList;
import java.util.List;

public class Cart {
    private Long id;
    private List<CartItem> items = new ArrayList<>();

    public Cart() {}

    public Cart(Long id) {
        this.id = id;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public List<CartItem> getItems() { return items; }
    public void setItems(List<CartItem> items) { this.items = items; }

    public double getTotal() {
        return items.stream().mapToDouble(CartItem::getLineTotal).sum();
    }
}
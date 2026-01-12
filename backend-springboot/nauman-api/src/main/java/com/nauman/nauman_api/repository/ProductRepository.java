package com.nauman.nauman_api.repository;

import com.nauman.nauman_api.model.Product;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class ProductRepository {

    private final Map<Long, Product> productStore = new HashMap<>();

    public ProductRepository() {
        // Seed demo products in memory
        productStore.put(1L, new Product(1L, "Laptop", "Fast laptop for work", 899.99));
        productStore.put(2L, new Product(2L, "Headphones", "Noise cancelling", 129.99));
        productStore.put(3L, new Product(3L, "Keyboard", "Mechanical keyboard", 79.99));
    }

    public List<Product> findAll() {
        return new ArrayList<>(productStore.values());
    }

    public Optional<Product> findById(Long id) {
        return Optional.ofNullable(productStore.get(id));
    }
}
package com.nauman.nauman_api.repository;

import com.nauman.nauman_api.model.Cart;
import org.springframework.stereotype.Repository;



    @Repository
    public class CartRepository {

        // Single demo cart stored in memory
        private final Cart cart = new Cart(1L);

        public Cart getCart() {
            return cart;
        }

        public void clear() {
            cart.getItems().clear();
        }
}

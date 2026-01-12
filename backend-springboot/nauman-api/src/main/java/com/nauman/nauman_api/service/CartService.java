package com.nauman.nauman_api.service;



    import com.nauman.nauman_api.model.Cart;
import com.nauman.nauman_api.model.CartItem;
import com.nauman.nauman_api.model.Product;
import com.nauman.nauman_api.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

    @Service
    public class CartService {

        private final CartRepository cartRepository;
        private final ProductService productService;

        public CartService(CartRepository cartRepository, ProductService productService) {
            this.cartRepository = cartRepository;
            this.productService = productService;
        }

        public Cart getCart() {
            return cartRepository.getCart();
        }

        public Cart addToCart(Long productId, int quantity) {
            if (quantity <= 0) {
                throw new RuntimeException("Quantity must be greater than 0");
            }

            Product product = productService.getProductById(productId);
            Cart cart = cartRepository.getCart();

            Optional<CartItem> existing = cart.getItems().stream()
                    .filter(i -> i.getProductId().equals(productId))
                    .findFirst();

            if (existing.isPresent()) {
                CartItem item = existing.get();
                item.setQuantity(item.getQuantity() + quantity);
            } else {
                cart.getItems().add(new CartItem(
                        product.getId(),
                        product.getName(),
                        product.getPrice(),
                        quantity
                ));
            }

            return cart;
        }

        public Cart updateQuantity(Long productId, int quantity) {
            if (quantity <= 0) {
                throw new RuntimeException("Quantity must be greater than 0");
            }

            Cart cart = cartRepository.getCart();
            CartItem item = cart.getItems().stream()
                    .filter(i -> i.getProductId().equals(productId))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Item not found in cart"));

            item.setQuantity(quantity);
            return cart;
        }

        public Cart removeItem(Long productId) {
            Cart cart = cartRepository.getCart();
            boolean removed = cart.getItems().removeIf(i -> i.getProductId().equals(productId));

            if (!removed) {
                throw new RuntimeException("Item not found in cart");
            }

            return cart;
        }

        public void clearCart() {
            cartRepository.clear();
        }
    }
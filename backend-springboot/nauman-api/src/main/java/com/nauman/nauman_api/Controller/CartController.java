package com.nauman.nauman_api.Controller;

import com.nauman.nauman_api.dto.AddToCartRequest;
import com.nauman.nauman_api.dto.UpdateQuantityRequest;
import com.nauman.nauman_api.model.Cart;
import com.nauman.nauman_api.service.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService service;

    public CartController(CartService service) {
        this.service = service;
    }

    @GetMapping
    public Cart getCart() {
        return service.getCart();
    }

    @PostMapping("/items")
    public Cart addToCart(@RequestBody AddToCartRequest request) {
        return service.addToCart(request.getProductId(), request.getQuantity());
    }

    @PatchMapping("/items/{productId}")
    public Cart updateQuantity(@PathVariable Long productId, @RequestBody UpdateQuantityRequest request) {
        return service.updateQuantity(productId, request.getQuantity());
    }

    @DeleteMapping("/items/{productId}")
    public Cart removeItem(@PathVariable Long productId) {
        return service.removeItem(productId);
    }

    @DeleteMapping("/clear")
    public String clearCart() {
        service.clearCart();
        return "Cart cleared";
    }
}
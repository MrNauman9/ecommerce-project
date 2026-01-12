package com.nauman.nauman_api.Controller;

import com.nauman.nauman_api.model.Order;
import com.nauman.nauman_api.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private final CheckoutService service;

    public CheckoutController(CheckoutService service) {
        this.service = service;
    }

    @PostMapping
    public Order checkout() {
        return service.checkout();
    }
}
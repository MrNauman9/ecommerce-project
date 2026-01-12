package com.nauman.nauman_api.Controller;

import com.nauman.nauman_api.payment.PaymentSessionResponse;
import com.nauman.nauman_api.service.NetsPaymentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments/nets")
public class PaymentController {

    private final NetsPaymentService service;

    public PaymentController(NetsPaymentService service) {
        this.service = service;
    }

    @PostMapping("/create-session")
    public PaymentSessionResponse createSession(@RequestParam Long orderId) {

        String paymentId = service.createPaymentSession(orderId);

        return new PaymentSessionResponse(
                paymentId,
                "Payment session created successfully"
        );
    }
}
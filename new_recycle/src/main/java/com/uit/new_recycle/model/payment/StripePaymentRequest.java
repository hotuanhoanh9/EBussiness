package com.uit.new_recycle.model.payment;

import lombok.Data;

@Data
public class StripePaymentRequest {
    private Long amount;      // Đơn vị là cents (vd: 10000 = 100.00 USD)
    private String currency;  // Vd: "usd"
    private String description;
}

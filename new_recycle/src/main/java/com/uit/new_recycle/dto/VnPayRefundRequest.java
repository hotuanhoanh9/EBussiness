package com.uit.new_recycle.dto;

import lombok.Data;

@Data
public class VnPayRefundRequest {
    private String orderId;
    private String transactionDate;
    private String transactionNo;
    private String amount;
    private String username;
    private String password;
}

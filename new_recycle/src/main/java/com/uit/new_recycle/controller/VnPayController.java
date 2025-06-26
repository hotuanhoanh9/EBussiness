package com.uit.new_recycle.controller;

import com.uit.new_recycle.dto.VnPayRefundRequest;
import com.uit.new_recycle.service.VnPayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vnpay")
@RequiredArgsConstructor
public class VnPayController {
    private final VnPayService vnPayService;

    @GetMapping("/create")
    public ResponseEntity<?> createPayment(
            @RequestParam String orderId,
            @RequestParam double amount) {
        try {
            String url = vnPayService.createPayment(orderId, amount);
            return ResponseEntity.ok(url);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi tạo URL VNPAY: " + e.getMessage());
        }
    }

    @GetMapping("/query")
    public ResponseEntity<?> queryTransaction(
            @RequestParam String orderId,
            @RequestParam String transactionDate) {
        try {
            String result = vnPayService.queryTransaction(orderId, transactionDate);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/refund")
    public ResponseEntity<?> refundTransaction(@RequestBody VnPayRefundRequest request) {
        try {
            String result = vnPayService.refundTransaction(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

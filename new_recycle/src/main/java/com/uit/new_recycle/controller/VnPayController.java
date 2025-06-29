package com.uit.new_recycle.controller;

import com.uit.new_recycle.dto.VnPayRefundRequest;
import com.uit.new_recycle.service.VnPayService;
import jakarta.servlet.http.HttpServletRequest;
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
            @RequestParam double amount,
            HttpServletRequest request) {
        try {
            String url = vnPayService.createPayment(orderId, amount, request);
            return ResponseEntity.ok(url);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi tạo URL VNPAY: " + e.getMessage());
        }
    }

    @GetMapping("/vnpay-return")
    public String paymentReturn(HttpServletRequest request) {
        return vnPayService.handleVnPayReturn(request);
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

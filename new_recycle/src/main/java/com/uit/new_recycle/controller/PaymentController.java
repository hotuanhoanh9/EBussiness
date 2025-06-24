package com.uit.new_recycle.controller;

import com.uit.new_recycle.service.PaymentService;
import com.uit.new_recycle.util.HMACUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @Value("${vnpay.hashsecret}")
    private String vnp_HashSecret;

    @PostMapping("/vnpay")
    public ResponseEntity<?> createVnpayPayment(@RequestParam String orderId,
                                                @RequestParam Double amount) {
        String paymentUrl = paymentService.createVNPayPayment(orderId, amount);
        return ResponseEntity.ok(Collections.singletonMap("paymentUrl", paymentUrl));
    }

    // Nhận callback từ VNPay
    @GetMapping("/vnpay-callback")
    public ResponseEntity<String> vnpayCallback(HttpServletRequest request) {
        Map<String, String> vnpParams = new HashMap<>();
        for (Map.Entry<String, String[]> entry : request.getParameterMap().entrySet()) {
            vnpParams.put(entry.getKey(), entry.getValue()[0]);
        }

        String receivedHash = vnpParams.remove("vnp_SecureHash"); // chữ ký VNPay gửi về
        String receivedHashType = vnpParams.remove("vnp_SecureHashType"); // loại hash (SHA512)

        // 1. Sắp xếp theo key alphabetically
        List<String> sortedKeys = new ArrayList<>(vnpParams.keySet());
        Collections.sort(sortedKeys);

        StringBuilder hashData = new StringBuilder();
        for (String key : sortedKeys) {
            if (hashData.length() > 0) {
                hashData.append('&');
            }
            hashData.append(key).append('=').append(vnpParams.get(key));
        }

        // 2. Tính lại hash local
        String calculatedHash = HMACUtil.hmacSHA512(vnp_HashSecret, hashData.toString());

        // 3. So sánh chữ ký
        if (!calculatedHash.equalsIgnoreCase(receivedHash)) {
            return ResponseEntity.badRequest().body("Invalid signature.");
        }

        // 4. Kiểm tra mã giao dịch
        String responseCode = vnpParams.get("vnp_ResponseCode");
        String orderId = vnpParams.get("vnp_TxnRef");
        String amount = vnpParams.get("vnp_Amount");

        if ("00".equals(responseCode)) {
            // Giao dịch thành công
            // TODO: cập nhật DB, trạng thái đơn hàng, ghi log...
            return ResponseEntity.ok("Payment successful for order: " + orderId);
        } else {
            return ResponseEntity.ok("Payment failed or canceled. Order: " + orderId);
        }
    }
}

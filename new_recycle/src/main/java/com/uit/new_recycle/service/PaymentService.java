package com.uit.new_recycle.service;

import com.uit.new_recycle.util.HMACUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PaymentService {
    @Value("${vnpay.tmn-code}")
    private String vnp_TmnCode;

    @Value("${vnpay.hash-secret}")
    private String vnp_HashSecret;

    @Value("${vnpay.pay-url}")
    private String vnp_Url;

    @Value("${vnpay.return-url}")
    private String vnp_Returnurl;

    public String createVNPayPayment(String orderId, double amount) {
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", "2.1.0");
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf((long) (amount * 100)));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", orderId);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang: " + orderId);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", vnp_Returnurl);
        vnp_Params.put("vnp_CreateDate", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")));

        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        for (String fieldName : fieldNames) {
            String value = vnp_Params.get(fieldName);
            if (hashData.length() > 0) {
                hashData.append('&');
                query.append('&');
            }
            hashData.append(fieldName).append('=').append(value);
            query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII))
                    .append('=').append(URLEncoder.encode(value, StandardCharsets.US_ASCII));
        }

        String vnp_SecureHash = HMACUtil.hmacSHA512(vnp_HashSecret, hashData.toString());
        query.append("&vnp_SecureHash=").append(vnp_SecureHash);

        return vnp_Url + "?" + query.toString();
    }
}

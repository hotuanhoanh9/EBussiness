package com.uit.new_recycle.service;


import com.uit.new_recycle.config.VnPayConfig;
import com.uit.new_recycle.dto.VnPayRefundRequest;
import com.uit.new_recycle.util.VnPayUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class VnPayService {
    private final VnPayConfig config;

    public String createPayment(String orderId, double amount) throws Exception {
        String vnp_TxnRef = orderId;
        String vnp_OrderInfo = "Thanh toan don hang: " + orderId;
        String vnp_Amount = String.valueOf((long) amount * 100);
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", "2.1.0");
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TmnCode", config.getVnpTmnCode());
        vnp_Params.put("vnp_Amount", vnp_Amount);
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", config.getVnpReturnUrl());
        vnp_Params.put("vnp_IpAddr", "127.0.0.1");
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.put("vnp_OrderType", "other");

        String queryString = VnPayUtils.buildQuery(vnp_Params);
        String hashData = VnPayUtils.buildQuery(vnp_Params); // cần đúng thứ tự
        String secureHash = VnPayUtils.hmacSHA512(config.getVnpHashSecret(), hashData);
        return config.getVnpPayUrl() + "?" + queryString + "&vnp_SecureHash=" + secureHash;
    }

    public String queryTransaction(String orderId, String transDate) throws Exception {
        String requestId = getRandomNumber(8);
        Map<String, String> data = new TreeMap<>();
        data.put("vnp_RequestId", requestId);
        data.put("vnp_Version", "2.1.0");
        data.put("vnp_Command", "querydr");
        data.put("vnp_TmnCode", config.getVnpTmnCode());
        data.put("vnp_TxnRef", orderId);
        data.put("vnp_TransactionDate", transDate);
        //data.put("vnp_CreateDate", getNow());
        data.put("vnp_IpAddr", "127.0.0.1");
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        data.put("vnp_CreateDate", vnp_CreateDate);
        data.put("vnp_IpAddr", "127.0.0.1");
        String vnp_OrderInfo = "Kiem tra ket qua GD OrderId:" + orderId;
        data.put("vnp_OrderInfo", vnp_OrderInfo);
        String hash_Data= String.join("|", requestId, "2.1.0", "querydr", config.getVnpTmnCode(), orderId, transDate, vnp_CreateDate, "127.0.0.1", vnp_OrderInfo);
        String secureHash = hmacSHA512(config.getVnpHashSecret(), hash_Data.toString());
//        String hashData = VnPayUtils.buildQuery(data);
//        String secureHash = VnPayUtils.hmacSHA512(config.getVnpHashSecret(), hashData);
        data.put("vnp_SecureHash", secureHash);

        return sendToVnPay(data);
    }

    public String refundTransaction(VnPayRefundRequest request) throws Exception {
        Map<String, String> data = new TreeMap<>();
        data.put("vnp_RequestId", UUID.randomUUID().toString());
        data.put("vnp_Version", "2.1.0");
        data.put("vnp_Command", "refund");
        data.put("vnp_TmnCode", config.getVnpTmnCode());
        data.put("vnp_TxnRef", request.getOrderId());
        data.put("vnp_TransactionDate", request.getTransactionDate());
        data.put("vnp_TransactionType", "02");
        String amount = String.valueOf((long) Double.parseDouble(request.getAmount()) * 100);
        data.put("vnp_Amount", amount);
        //data.put("vnp_Amount", request.getAmount());
        data.put("vnp_TransactionNo", request.getTransactionNo());
        data.put("vnp_CreateBy", request.getUsername());
        data.put("vnp_CreateDate", getNow());
        data.put("vnp_IpAddr", "127.0.0.1");

        String hashData = VnPayUtils.buildQuery(data);
        String secureHash = VnPayUtils.hmacSHA512(config.getVnpHashSecret(), hashData);
        data.put("vnp_SecureHash", secureHash);

        return sendToVnPay(data);
    }

    private String sendToVnPay(Map<String, String> payload) throws IOException {
        String json = new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(payload);
        System.out.println("📤 JSON gửi sang VNPAY:\n" + json);
        HttpURLConnection conn = (HttpURLConnection) new URL("https://sandbox.vnpayment.vn/merchant_webapi/api/transaction").openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);
        try (OutputStream os = conn.getOutputStream()) {
            byte[] input = json.getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }

        try (Scanner scanner = new Scanner(conn.getInputStream(), "UTF-8")) {
            return scanner.useDelimiter("\\A").next();
        }
    }

    private String getNow() {
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        return vnp_CreateDate;
    }

    public static String getRandomNumber(int len) {
        Random rnd = new Random();
        String chars = "0123456789";
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        }
        return sb.toString();
    }
    public static String hmacSHA512(final String key, final String data) {
        try {

            if (key == null || data == null) {
                throw new NullPointerException();
            }
            final Mac hmac512 = Mac.getInstance("HmacSHA512");
            byte[] hmacKeyBytes = key.getBytes();
            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            byte[] result = hmac512.doFinal(dataBytes);
            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();

        } catch (Exception ex) {
            return "";
        }
    }

    public static String getIpAddress(HttpServletRequest request) {
        String ipAdress;
        try {
            ipAdress = request.getHeader("X-FORWARDED-FOR");
            if (ipAdress == null) {
                ipAdress = request.getRemoteAddr();
            }
        } catch (Exception e) {
            ipAdress = "Invalid IP:" + e.getMessage();
        }
        return ipAdress;
    }

}

package com.uit.new_recycle.util;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

public class HMACUtil {
    /**
     * Tính HMAC SHA512
     * @param key       Secret key (chuỗi bảo mật)
     * @param data      Dữ liệu cần mã hóa
     * @return          Chuỗi mã hóa hex
     */
    public static String hmacSHA512(String key, String data) {
        try {
            Mac hmac512 = Mac.getInstance("HmacSHA512");
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
            hmac512.init(secretKey);

            byte[] hashBytes = hmac512.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return bytesToHex(hashBytes);
        } catch (Exception e) {
            throw new RuntimeException("Cannot generate HMAC SHA512", e);
        }
    }

    private static String bytesToHex(byte[] hash) {
        StringBuilder result = new StringBuilder();
        for (byte b : hash) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }
}

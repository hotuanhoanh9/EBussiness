package com.uit.new_recycle.config;

import lombok.Getter;

import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Configuration
@Getter
@Setter
public class VnPayConfig {

    @Value("${vnpay.vnp_TmnCode}")
    private String vnpTmnCode;

    @Value("${vnpay.vnp_HashSecret}")
    private String vnpHashSecret;

    @Value("${vnpay.vnp_PayUrl}")
    private String vnpPayUrl;

    @Value("${vnpay.vnp_ReturnUrl}")
    private String vnpReturnUrl;



}

package com.uit.new_recycle.controller;

import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.uit.new_recycle.entity.PaymentTransaction;
import com.uit.new_recycle.entity.StripePayment;
import com.uit.new_recycle.model.payment.StripePaymentRequest;
import com.uit.new_recycle.repository.StripePaymentRepository;
import com.uit.new_recycle.service.StripeService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/strip/payment")
public class StripeController {
    private final StripeService stripeService;

    private final StripePaymentRepository paymentRepository;

    @Value("${stripe.api.key}")
    private String endpointSecret;

    public StripeController(StripeService stripeService, StripePaymentRepository paymentRepository) {
        this.stripeService = stripeService;
        this.paymentRepository = paymentRepository;
    }

    @PostMapping("/create")
    public String createPayment(@RequestBody StripePaymentRequest request) {
        try {
            return stripeService.createCheckoutSession(request.getAmount(), request.getCurrency(), request.getDescription());
        } catch (Exception e) {
            return "Lỗi tạo thanh toán: " + e.getMessage();
        }
    }

    @GetMapping("/success")
    public String paymentSuccess(@RequestParam("session_id") String sessionId) {
        try {
            Session session = Session.retrieve(sessionId);
            StripePayment payment = new StripePayment();
            payment.setSessionId(session.getId());
            payment.setPaymentIntentId(session.getPaymentIntent());
            payment.setAmount(session.getAmountTotal());
            payment.setCurrency(session.getCurrency());
            payment.setEmail(session.getCustomerEmail());
            payment.setStatus("success");
            String createdAt = Instant.ofEpochSecond(session.getCreated())
                    .atZone(ZoneId.systemDefault())
                    .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            payment.setCreatedAt(createdAt);
            paymentRepository.save(payment);
            return "✅ Thanh toán thành công!";
        } catch (Exception e) {
            return "❌ Không thể xác nhận thanh toán: " + e.getMessage();
        }
    }

    @GetMapping("/cancel")
    public String paymentCancel() {
        return "❌ Đã hủy thanh toán.";
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(HttpServletRequest request) {
        String payload = getBody(request);
        String sigHeader = request.getHeader("Stripe-Signature");

        try {
            Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);

            if ("checkout.session.completed".equals(event.getType())) {
                EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
                if (dataObjectDeserializer.getObject().isPresent()) {
                    Session session = (Session) dataObjectDeserializer.getObject().get();
                    StripePayment payment = new StripePayment();
                    payment.setSessionId(session.getId());
                    payment.setPaymentIntentId(session.getPaymentIntent());
                    payment.setAmount(session.getAmountTotal());
                    payment.setCurrency(session.getCurrency());
                    payment.setEmail(session.getCustomerEmail());
                    payment.setStatus("succeeded");

                    // Convert timestamp to String date
                    String createdAt = Instant.ofEpochSecond(session.getCreated())
                            .atZone(ZoneId.systemDefault())
                            .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                    payment.setCreatedAt(createdAt);

                    paymentRepository.save(payment);
                }
            }

            return ResponseEntity.ok("Webhook received");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Webhook error: " + e.getMessage());
        }
    }

    private String getBody(HttpServletRequest request) {
        StringBuilder sb = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to read request body");
        }
        return sb.toString();
    }
}

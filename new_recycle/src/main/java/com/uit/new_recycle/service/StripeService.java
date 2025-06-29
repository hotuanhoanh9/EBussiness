package com.uit.new_recycle.service;

import com.stripe.Stripe;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.stripe.model.checkout.Session;

@Service
public class StripeService {
    public StripeService(@Value("${stripe.api.key}") String apiKey) {
        Stripe.apiKey = apiKey;
    }

    public String createCheckoutSession(Long amount, String currency, String description) throws Exception {
        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        //.setSuccessUrl("http://localhost:8080/api/strip/payment/success")
                        .setSuccessUrl("http://localhost:8080/api/strip/payment/success?session_id={CHECKOUT_SESSION_ID}")
                        .setCancelUrl("http://localhost:8080/api/strip/payment/cancel")
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L)
                                        .setPriceData(
                                                SessionCreateParams.LineItem.PriceData.builder()
                                                        .setCurrency(currency)
                                                        .setUnitAmount(amount)
                                                        .setProductData(
                                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                        .setName(description)
                                                                        .build())
                                                        .build())
                                        .build())
                        .build();

        Session session = Session.create(params);
        return session.getUrl(); // Trả về link để redirect user
    }
}

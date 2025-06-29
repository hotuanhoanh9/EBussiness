package com.uit.new_recycle.repository;

import com.uit.new_recycle.entity.StripePayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StripePaymentRepository extends JpaRepository<StripePayment, Long> {
    StripePayment findBySessionId(String sessionId);
}

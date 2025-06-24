package com.uit.new_recycle.controller;

import com.uit.new_recycle.entity.Account;
import com.uit.new_recycle.security.JwtUtil;
import com.uit.new_recycle.service.AccountService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "*")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public Account register(@RequestBody Account account) {
        return accountService.register(account);
    }

//    @PostMapping("/login")
//    public ResponseEntity<Account> login(@RequestBody LoginRequest request) {
//        return accountService.login(request.getUsername(), request.getPassword())
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.status(401).build());
//    }

    @PutMapping("/{id}/update-wallet")
    public ResponseEntity<Account> updateWallet(@PathVariable Long id, @RequestBody WalletRequest request) {
        try {
            Account updated = accountService.updateBankAndBudget(id, request.getBankName(), request.getBankNumber(), request.getBudget());
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return accountService.login(request.getUsername(), request.getPassword())
                .<ResponseEntity<?>>map(account -> {
                    String token = jwtUtil.generateToken(account.getUsername());
                    return ResponseEntity.ok(new JwtResponse(token));
                })
                .orElse(ResponseEntity.status(401).body("Invalid credentials"));
    }


    @Data
    @AllArgsConstructor
    static class JwtResponse {
        private String token;
    }


    static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }


    static class WalletRequest {
        private String bankName;
        private String bankNumber;
        private Double budget;

        public String getBankName() {
            return bankName;
        }

        public void setBankName(String bankName) {
            this.bankName = bankName;
        }

        public String getBankNumber() {
            return bankNumber;
        }

        public void setBankNumber(String bankNumber) {
            this.bankNumber = bankNumber;
        }

        public Double getBudget() {
            return budget;
        }

        public void setBudget(Double budget) {
            this.budget = budget;
        }
    }

}

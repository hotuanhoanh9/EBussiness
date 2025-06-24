package com.uit.new_recycle.service;

import com.uit.new_recycle.entity.Account;
import com.uit.new_recycle.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Account register(Account account) {
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        account.setBudget(0.0); // khởi tạo mặc định
        return accountRepository.save(account);
    }

    public Optional<Account> login(String username, String rawPassword) {
        return accountRepository.findByUsername(username)
                .filter(acc -> passwordEncoder.matches(rawPassword, acc.getPassword()));
    }

    public Optional<Account> getById(Long id) {
        return accountRepository.findById(id);
    }

    public Account updateBankAndBudget(Long id, String bankName, String bankNumber, Double budget) {
        return accountRepository.findById(id).map(acc -> {
            acc.setBankName(bankName);
            acc.setBankNumber(bankNumber);
            acc.setBudget(budget);
            return accountRepository.save(acc);
        }).orElseThrow(() -> new RuntimeException("Account not found"));

    }
}

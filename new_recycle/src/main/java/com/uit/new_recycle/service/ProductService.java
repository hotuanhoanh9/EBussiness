package com.uit.new_recycle.service;

import com.uit.new_recycle.entity.Product;
import com.uit.new_recycle.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        return productRepository.findById(id).map(product -> {
            product.setName(updatedProduct.getName());
            product.setPrice(updatedProduct.getPrice());
            product.setSoldNumber(updatedProduct.getSoldNumber());
            product.setImagePath(updatedProduct.getImagePath());
            product.setSalePercent(updatedProduct.getSalePercent());
            product.setTinhTrangMay(updatedProduct.getTinhTrangMay());
            product.setAccountID(updatedProduct.getAccountID());
            return productRepository.save(product);
        }).orElseThrow(() -> new RuntimeException("Product not found with id " + id));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}

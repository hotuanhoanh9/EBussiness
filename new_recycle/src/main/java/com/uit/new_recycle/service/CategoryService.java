package com.uit.new_recycle.service;

import com.uit.new_recycle.entity.Category;
import com.uit.new_recycle.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getById(Long id) {
        return categoryRepository.findById(id);
    }

    public Category create(Category category) {
        return categoryRepository.save(category);
    }

    public Optional<Category> update(Long id, Category category) {
        return categoryRepository.findById(id).map(c -> {
            c.setName(category.getName());
            c.setImagePath(category.getImagePath());
            return categoryRepository.save(c);
        });
    }

    public boolean delete(Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

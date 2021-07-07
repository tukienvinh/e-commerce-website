package com.example.ecommercewebsite.service.impl;

import com.example.ecommercewebsite.entity.Category;
import com.example.ecommercewebsite.entity.Product;
import com.example.ecommercewebsite.exception.CategoryExistedException;
import com.example.ecommercewebsite.exception.CategoryNameNullException;
import com.example.ecommercewebsite.repository.CategoryRepository;
import com.example.ecommercewebsite.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public void isValidate(Category category) {
        Optional<Category> categoryOptional = categoryRepository.findCategoryByName(category.getName());
        if (category.getName() == null || category.getName().length() == 0)
            throw new CategoryNameNullException();
        if (categoryOptional.isPresent())
            throw new CategoryExistedException(category.getName());
    }

    @Override
    public List<Category> retrieveCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories;
    }

    @Override
    public Optional<Category> getCategory(Long categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        return category;
    }

    @Override
    public Category saveCategory(Category newCategory) {
        isValidate(newCategory);
        return categoryRepository.save(newCategory);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    @Override
    public Category updateCategory(Category newCategory, Long id) {
        isValidate(newCategory);
        return categoryRepository.findById(id)
                .map(category -> {
                    category.setName(newCategory.getName());
                    return saveCategory(category);
                })
                .orElseGet(() -> {
                    newCategory.setId(id);
                    return saveCategory(newCategory);
                });
    }
}

package com.example.ecommercewebsite.service.impl;

import com.example.ecommercewebsite.entity.Category;
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

    public boolean isValidate(Category category) {
        Optional<Category> categoryOptional = categoryRepository.findCategoryByName(category.getName());
        if (category.getName() == null || category.getName().length() == 0)
            return false;
        if (categoryOptional.isPresent())
            return false;
        return true;
    }

    @Override
    public List<Category> retrieveCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getCategory(Long categoryId) {
        return categoryRepository.findById(categoryId);
    }

    @Override
    public Optional<Category> getCategoryByName(String categoryName) {
        return categoryRepository.findCategoryByName(categoryName);
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
    public Category updateCategory(Category newCategory) {
        if (isValidate(newCategory) == true)
            return categoryRepository.findById(newCategory.getId())
                    .map(category -> {
                        category.setName(newCategory.getName());
                        category.setDescription(newCategory.getDescription());
                        return saveCategory(category);
                    })
                    .orElseGet(() -> saveCategory(newCategory));
        return null;
    }
}

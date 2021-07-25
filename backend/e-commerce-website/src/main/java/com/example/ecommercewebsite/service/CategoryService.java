package com.example.ecommercewebsite.service;

import com.example.ecommercewebsite.entity.Category;
import com.example.ecommercewebsite.entity.Product;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    public List<Category> retrieveCategories();

    public Optional<Category> getCategory(Long categoryId);

    public Optional<Category> getCategoryByName(String categoryName);

    public List<Product> getProductsByCategoryName(String categoryName);

    public Category saveCategory(Category category);

    public void deleteCategory(Long categoryId);

    public Category updateCategory(Category newCategory);
}

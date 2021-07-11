package com.example.ecommercewebsite.restcontroller;

import com.example.ecommercewebsite.entity.Category;
import com.example.ecommercewebsite.exception.CategoryNotFoundException;
import com.example.ecommercewebsite.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categories")
    public List<Category> getCategories() {
        List<Category> categories = categoryService.retrieveCategories();
        return categories;
    }

    @GetMapping("/category/{categoryId}")
    public Optional<Category> findCategory(@PathVariable Long categoryId) {
        Optional<Category> category = categoryService.getCategory(categoryId);
        if (category.isPresent() == false)
            throw new CategoryNotFoundException(categoryId);
        return category;
    }

    @PostMapping("/category")
    public Category saveCategory(@RequestBody Category category) {
        return categoryService.saveCategory(category);
    }

    @DeleteMapping("/category/{categoryId}")
    public HashMap<String, String> deleteCategory(@PathVariable(name="categoryId") Long categoryId) {
        Optional<Category> category = categoryService.getCategory(categoryId);
        if (category.isPresent() == false) {
            throw new CategoryNotFoundException(categoryId);
        }
        categoryService.deleteCategory(categoryId);
        HashMap<String, String> map = new HashMap<>();
        map.put("message", "Delete successfully!");
        return map;
    }

    @PutMapping("/category")
    public HashMap<String, String> updateCategory(@RequestBody Category newCategory) {
        HashMap<String, String> map = new HashMap<>();
        Category category = categoryService.updateCategory(newCategory);
        if (category == null) {
            map.put("message", "Fail to update category!");
        }
        else map.put("message", "Update successfully!");
        return map;
    }
}

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
@RequestMapping("/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> getCategories() {
        List<Category> categories = categoryService.retrieveCategories();
        return categories;
    }

    @GetMapping("/{categoryId}")
    public Optional<Category> findCategory(@PathVariable Long categoryId) {
        Optional<Category> category = categoryService.getCategory(categoryId);
        if (category.isPresent() == false)
            throw new CategoryNotFoundException(categoryId);
        return category;
    }

    @PostMapping
    public Category saveCategory(@RequestBody Category category) {
        return categoryService.saveCategory(category);
    }

    @DeleteMapping("/{categoryId}")
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

    @PutMapping("/update/{id}")
    public HashMap<String, String> updateCategory(@RequestBody Category newCategory, @PathVariable Long id) {
        HashMap<String, String> map = new HashMap<>();
        if (categoryService.updateCategory(newCategory, id) == null) {
            map.put("message", "Fail to update category!");
        }
        else map.put("message", "Update successfully!");
        return map;
    }
}

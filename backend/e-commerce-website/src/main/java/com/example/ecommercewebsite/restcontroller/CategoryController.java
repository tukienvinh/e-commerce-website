package com.example.ecommercewebsite.restcontroller;

import com.example.ecommercewebsite.entity.Category;
import com.example.ecommercewebsite.entity.Product;
import com.example.ecommercewebsite.exception.CategoryNotFoundException;
import com.example.ecommercewebsite.payload.response.MessageResponse;
import com.example.ecommercewebsite.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> getCategories() {
        List<Category> categories = categoryService.retrieveCategories();
        return categories;
    }

    @GetMapping("/search")
    public Optional<Category> findCategory(@RequestParam String categoryName) {
        Optional<Category> category = categoryService.getCategoryByName(categoryName);
        if (category.isPresent() == false)
            throw new CategoryNotFoundException(categoryName);
        return category;
    }

    @GetMapping("/category/{categoryId}")
    public Optional<Category> findCategoryById(@PathVariable Long categoryId) {
        Optional<Category> category = categoryService.getCategoryById(categoryId);
        if (category.isPresent() == false)
            throw new CategoryNotFoundException(categoryId);
        return category;
    }

    @GetMapping("/{categoryName}")
    public List<Product> getProductsOfCategory(@PathVariable String categoryName) {
        return categoryService.getProductsByCategoryName(categoryName);
    }

    @PostMapping("/category")
    @PreAuthorize("hasRole('ADMIN')")
    public Category saveCategory(@Valid @RequestBody Category category) {
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
    public ResponseEntity<?> updateCategory(@Valid @RequestBody Category newCategory) {
        Category category = categoryService.updateCategory(newCategory);
        if (category == null) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Update category failed."));
        }
        return ResponseEntity.ok().body(new MessageResponse("Update category successfully."));
    }
}

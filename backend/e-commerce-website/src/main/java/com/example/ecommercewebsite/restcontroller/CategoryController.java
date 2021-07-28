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

    @GetMapping("/category/name/{categoryName}")
    public Optional<Category> findCategoryByName(@PathVariable String categoryName) {
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
    public ResponseEntity<?> saveCategory(@Valid @RequestBody Category category) {
        Category result = categoryService.saveCategory(category);
        if (result == null)
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Category name is already taken."));
        return ResponseEntity.ok().body(new MessageResponse("Add category successfully."));
    }

    @DeleteMapping("/category/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable(name="categoryId") Long categoryId) {
        Optional<Category> category = categoryService.getCategory(categoryId);
        if (category.isPresent() == false) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Category not found."));
        }
        List<Product> products = category.get().getProducts();
        for (Product product : products)
            if (product.getRatings().size() > 0)
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: This category has product that was rated."));
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.ok().body(new MessageResponse("Delete category successfully."));
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

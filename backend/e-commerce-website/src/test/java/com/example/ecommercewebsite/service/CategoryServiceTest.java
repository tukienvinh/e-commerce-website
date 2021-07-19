package com.example.ecommercewebsite.service;

import com.example.ecommercewebsite.entity.Category;
import com.example.ecommercewebsite.repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class CategoryServiceTest {
    @MockBean
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryService categoryService;

    @Test
    public void retrieveCategory() {
        List<Category> categories = new ArrayList<>();
        Category category = new Category(1L,"Category 1", "Category 1");
        Category category1 = new Category(2L,"Category 2", "Category 2");
        categories.add(category);
        categories.add(category1);

        when(categoryRepository.findAll()).thenReturn(categories);

        assertEquals(2, categoryService.retrieveCategories().size());
    }

    @Test
    public void getCategory() {
        Category category = new Category(1L, "Category 1", "Category 1");

        when(categoryRepository.findById(1L)).thenReturn(java.util.Optional.of(category));

        assertEquals("Category 1", categoryService.getCategory(1L).get().getName());
    }
}

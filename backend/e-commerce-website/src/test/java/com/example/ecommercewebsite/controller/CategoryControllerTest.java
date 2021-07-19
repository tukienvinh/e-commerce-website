package com.example.ecommercewebsite.controller;

import com.example.ecommercewebsite.entity.Category;
import com.example.ecommercewebsite.service.CategoryService;
import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class CategoryControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CategoryService categoryService;

    private  List<Category> categories = new ArrayList<>();

    @BeforeEach
    void setUp() {
        this.categories.add(new Category(1L, "Category 1", "Category 1"));
        this.categories.add(new Category(2L, "Category 2", "Category 2"));
    }

    @Test
    public void getCategories() throws Exception {
        when(categoryService.retrieveCategories()).thenReturn(categories);

        this.mockMvc.perform(get("/api/categories"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.size()").value(categories.size()));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void saveCategory() throws Exception {
        Category category = new Category(3L, "Category 3", "Category 3");
        when(categoryService.saveCategory(category)).thenReturn(category);

        this.mockMvc.perform(post("/api/categories/category")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new Gson().toJson(category)))
                .andExpect(status().isOk());
    }
}

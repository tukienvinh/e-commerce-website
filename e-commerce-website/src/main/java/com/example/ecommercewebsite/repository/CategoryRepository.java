package com.example.ecommercewebsite.repository;

import com.example.ecommercewebsite.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    public Optional<Category> findCategoryByName(String name);
}

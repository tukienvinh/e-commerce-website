package com.example.ecommercewebsite.repository;

import com.example.ecommercewebsite.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findAllByProduct_id(Long productId);

    Rating findByProduct_idAndUser_id(Long productId, Long userId);

}

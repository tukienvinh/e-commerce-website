package com.example.ecommercewebsite.service;

import com.example.ecommercewebsite.entity.Rating;

import java.util.List;

public interface RatingService {
    List<Rating> retrieveProductRatings(Long productId);

    boolean addRating(Rating newRating, Long userId);
}

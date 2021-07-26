package com.example.ecommercewebsite.service.impl;

import com.example.ecommercewebsite.entity.Product;
import com.example.ecommercewebsite.entity.Rating;
import com.example.ecommercewebsite.repository.ProductRepository;
import com.example.ecommercewebsite.repository.RatingRepository;
import com.example.ecommercewebsite.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RatingServiceImpl implements RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Rating> retrieveProductRatings(Long productId) {
        return ratingRepository.findAllByProduct_id(productId);
    }

    @Override
    public boolean addRating(Rating newRating, Long userId) {
        if(ratingRepository.findByProduct_idAndUser_id(newRating.getProduct_id(), userId) != null)
            return false;
        newRating.setUser_id(userId);
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = currentDateTime.format(formatter);
        newRating.setRating_date(formattedDateTime);
        Product product = productRepository.findById(newRating.getProduct_id()).get();
        product.setNum_rating(product.getNum_rating() + 1);
        product.setTotal_rating(product.getTotal_rating() + newRating.getRating_point());
        product.setRating((double) product.getTotal_rating() / product.getNum_rating());
        ratingRepository.save(newRating);
        return true;
    }

}

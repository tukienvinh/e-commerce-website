package com.example.ecommercewebsite.restcontroller;

import com.example.ecommercewebsite.entity.Rating;
import com.example.ecommercewebsite.payload.response.MessageResponse;
import com.example.ecommercewebsite.security.service.UserDetailsImpl;
import com.example.ecommercewebsite.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @GetMapping("/{productId}")
    private List<Rating> getProductRatings(@PathVariable Long productId) {
        return ratingService.retrieveProductRatings(productId);
    }

    @PostMapping
    private ResponseEntity<?> addRating(@RequestBody Rating newRating) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        boolean notRated = ratingService.addRating(newRating, userDetails.getId());
        if (notRated == false)
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("User rated for this product."));
        return ResponseEntity.ok().body(new MessageResponse("Rate for product successfully."));
    }
}

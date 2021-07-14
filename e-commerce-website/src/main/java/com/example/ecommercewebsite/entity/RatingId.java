package com.example.ecommercewebsite.entity;

import java.io.Serializable;

public class RatingId implements Serializable {
    private Long product_id;

    private Long user_id;

    public RatingId(Long product_id, Long user_id) {
        this.product_id = product_id;
        this.user_id = user_id;
    }
}

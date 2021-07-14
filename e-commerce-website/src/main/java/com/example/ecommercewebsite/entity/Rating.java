package com.example.ecommercewebsite.entity;

import javax.persistence.*;

@Entity
@IdClass(RatingId.class)
@Table(name = "rating")
public class Rating {
    @Id
    private Long product_id;

    @Id
    private Long user_id;

    @OneToOne
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    private Double rating_point;

    private String content;

}

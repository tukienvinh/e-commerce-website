package com.example.ecommercewebsite.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
@IdClass(RatingId.class)
@Table(name = "rating")
public class Rating {
    @Id
    private Long product_id;

    @Id
    private Long user_id;

    @ManyToOne
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    @JsonIgnore
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @JsonIgnore
    private User user;

    private Double rating_point = 5.0;

    private String content;

    private Date rating_date;

    public Long getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Long product_id) {
        this.product_id = product_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Double getRating_point() {
        return rating_point;
    }

    public void setRating_point(Double rating_point) {
        this.rating_point = rating_point;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getRating_date() {
        return rating_date;
    }

    public void setRating_date(Date rating_date) {
        this.rating_date = rating_date;
    }
}

package com.example.ecommercewebsite.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;

@Entity
@Table(name="PRODUCT")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 250)
    @Column(name="name")
    private String name;

    @ManyToOne
    @JoinColumn(name="category_id")
    @JsonIgnoreProperties("products")
    private Category category;

    @NotBlank
    @Size(max = 100)
    @Column(name="author")
    private String author;

    @NotBlank
    @Column(name="description")
    private String description;

    @NotNull
    @DecimalMin(value = "10000.0", message = "Min value of book is 10000")
    @Column(name="price")
    private Double price;

    @NotNull
    @DecimalMin(value = "1", message = "Min stock of book is 1")
    @Column(name = "stock")
    private Long stock;

    @Column(name="image")
    private String image;

    @Column(name="created_date")
    private Date created_date;

    @Column(name="updated_date")
    private Date updated_date;

    @NotNull
    @Column(name="rating")
    private Double rating;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getStock() {
        return stock;
    }

    public void setStock(Long stock) {
        this.stock = stock;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Date getCreated_date() {
        return created_date;
    }

    public void setCreated_date(Date created_date) {
        this.created_date = created_date;
    }

    public Date getUpdated_date() {
        return updated_date;
    }

    public void setUpdated_date(Date updated_date) {
        this.updated_date = updated_date;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }
}

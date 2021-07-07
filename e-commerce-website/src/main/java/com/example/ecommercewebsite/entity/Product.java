package com.example.ecommercewebsite.entity;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="PRODUCT")
public class Product {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="category_id")
    private Long category_id;

//    @Column(name="publisher_id")
//    private Long publisher_id;

    @ManyToOne
    @JoinColumn(name="author_id")
    private Author author;

    @Column(name="description")
    private String description;

    @Column(name="price")
    private Double price;

    @Column(name = "stock")
    private Long stock;

    @Column(name="image")
    private String image;

    @Column(name="created_date")
    private LocalDate created_date;

    @Column(name="updated_date")
    private LocalDate updated_date;

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

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
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

    public Long getCategory_id() {
        return category_id;
    }

    public void setCategory_id(Long category_id) {
        this.category_id = category_id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDate getCreated_date() {
        return created_date;
    }

    public void setCreated_date(LocalDate created_date) {
        this.created_date = created_date;
    }

    public LocalDate getUpdated_date() {
        return updated_date;
    }

    public void setUpdated_date(LocalDate updated_date) {
        this.updated_date = updated_date;
    }
}

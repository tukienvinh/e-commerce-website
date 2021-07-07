package com.example.ecommercewebsite.entity;

import javax.persistence.*;

@Entity
@Table(name="CATEGORY")
public class Category {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name="name")
    private String name;
}

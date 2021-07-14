package com.example.ecommercewebsite.entity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@IdClass(OrderDetailId.class)
@Table(name = "order_detail")
public class OrderDetail {
    @Id
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @Id
    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @NotBlank
    @Column(name = "stock")
    private Long stock;
}

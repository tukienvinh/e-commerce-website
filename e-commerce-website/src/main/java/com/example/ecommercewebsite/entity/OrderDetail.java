package com.example.ecommercewebsite.entity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@IdClass(OrderDetailId.class)
@Table(name = "order_detail")
public class OrderDetail {
    @Id
    private Long id;

    @Id
    private Long product_id;

    @ManyToOne
    @JoinColumn(name = "id", insertable = false, updatable = false)
    private Order order;

    @OneToOne
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private Product product;

    @NotBlank
    @Column(name = "stock")
    private Long stock;
}

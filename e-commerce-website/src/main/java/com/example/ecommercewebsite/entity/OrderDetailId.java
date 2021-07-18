package com.example.ecommercewebsite.entity;

import java.io.Serializable;

public class OrderDetailId implements Serializable {
    private Long id;

    private Long product_id;

    public OrderDetailId() {

    }

    public OrderDetailId(Long id, Long product_id) {
        this.id = id;
        this.product_id = product_id;
    }

}

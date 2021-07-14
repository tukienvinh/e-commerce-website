package com.example.ecommercewebsite.entity;

import java.io.Serializable;

public class OrderDetailId implements Serializable {
    private Long order_id;

    private Long product_id;

    public OrderDetailId(Long order_id, Long product_id) {
        this.order_id = order_id;
        this.product_id = product_id;
    }

}

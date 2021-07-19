package com.example.ecommercewebsite.payload.response;

public class OrderResponse {
    private String order_time;

    private int status;

    public OrderResponse(String order_time, int status) {
        this.order_time = order_time;
        this.status = status;
    }
}

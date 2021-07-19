package com.example.ecommercewebsite.service;

import com.example.ecommercewebsite.entity.Order;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    List<Order> viewWaitingOrders();

    Order saveOrder(Long userId);

    Optional<Order> validateOrder(Long orderId);

}

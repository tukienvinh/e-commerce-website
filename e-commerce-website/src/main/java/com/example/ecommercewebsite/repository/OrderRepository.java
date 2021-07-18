package com.example.ecommercewebsite.repository;

import com.example.ecommercewebsite.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByStatus(int status);
}

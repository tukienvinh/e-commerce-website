package com.example.ecommercewebsite.repository;

import com.example.ecommercewebsite.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

}

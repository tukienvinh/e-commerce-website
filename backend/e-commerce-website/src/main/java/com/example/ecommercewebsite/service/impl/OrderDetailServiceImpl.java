package com.example.ecommercewebsite.service.impl;

import com.example.ecommercewebsite.entity.Order;
import com.example.ecommercewebsite.entity.OrderDetail;
import com.example.ecommercewebsite.entity.Product;
import com.example.ecommercewebsite.repository.OrderDetailRepository;
import com.example.ecommercewebsite.repository.OrderRepository;
import com.example.ecommercewebsite.repository.ProductRepository;
import com.example.ecommercewebsite.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public OrderDetail addOrderDetail(OrderDetail orderDetail) {
        Optional<Product> product = productRepository.findById(orderDetail.getProduct_id());
        if (orderDetail.getStock() > product.get().getStock())
            return null;
        if (orderDetail.getStock() == 0)
            return null;

        product.get().setStock(product.get().getStock() - orderDetail.getStock());
        productRepository.save(product.get());

        Optional<Order> order = orderRepository.findById(orderDetail.getId());
        order.get().setTotal_price((int) (order.get().getTotal_price() + orderDetail.getStock() * product.get().getPrice()));
        orderRepository.save(order.get());

        return orderDetailRepository.save(orderDetail);
    }
}

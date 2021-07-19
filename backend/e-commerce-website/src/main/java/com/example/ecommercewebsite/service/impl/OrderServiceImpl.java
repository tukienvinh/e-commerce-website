package com.example.ecommercewebsite.service.impl;

import com.example.ecommercewebsite.entity.Order;
import com.example.ecommercewebsite.entity.User;
import com.example.ecommercewebsite.repository.OrderRepository;
import com.example.ecommercewebsite.repository.UserRepository;
import com.example.ecommercewebsite.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Order> viewWaitingOrders() {
        return orderRepository.findAllByStatus(0);
    }

    @Override
    public Order saveOrder(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = currentDateTime.format(formatter);
        Order newOrder = new Order(user.get(), formattedDateTime);
        return orderRepository.save(newOrder);
    }

    @Override
    public Optional<Order> validateOrder(Long orderId) {
        return orderRepository.findById(orderId)
                .map(order -> {
                    order.setStatus(1);
                    return orderRepository.save(order);
                });

    }

}

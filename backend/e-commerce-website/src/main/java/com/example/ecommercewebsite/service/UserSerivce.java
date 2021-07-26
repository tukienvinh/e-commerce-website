package com.example.ecommercewebsite.service;

import com.example.ecommercewebsite.entity.Order;
import com.example.ecommercewebsite.entity.User;
import com.example.ecommercewebsite.payload.request.ChangeProfileRequest;

import java.util.List;
import java.util.Optional;

public interface UserSerivce {

    Optional<User> viewProfile(Long userId);

    List<Order> viewOrders(Long userId);

    Optional<User> changeProfile(Long userId, ChangeProfileRequest changeProfileRequest);

    Optional<User> changePassword(Long userId, String oldPassword, String newPassword, String confirmPassword);

    List<User> viewUsers();

    Optional<User> blockUser(Long userId);

    Optional<User> getUserByUser_name(String username);

    void deleteUser(Long userId);

    Optional<User> findUserById(Long userId);
}

package com.example.ecommercewebsite.service.impl;

import com.example.ecommercewebsite.entity.Order;
import com.example.ecommercewebsite.entity.User;
import com.example.ecommercewebsite.payload.request.ChangeProfileRequest;
import com.example.ecommercewebsite.repository.UserRepository;
import com.example.ecommercewebsite.service.UserSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserSerivce {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<User> viewProfile(Long userId) {
        return userRepository.findById(userId);
    }

    @Override
    public List<Order> viewOrders(Long userId) {
        return userRepository.findById(userId).get().getOrders();
    }

    @Override
    public Optional<User> changeProfile(Long userId, ChangeProfileRequest changeProfileRequest) {
        if (userRepository.existsByEmail(changeProfileRequest.getEmail()))
            return null;
        return userRepository.findById(userId)
                .map(user -> {
                    user.setName(changeProfileRequest.getName());
                    user.setEmail(changeProfileRequest.getEmail());
                    user.setAddress(changeProfileRequest.getAddress());
                    return userRepository.save(user);
                });
    }

    @Override
    public Optional<User> changePassword(Long userId, String oldPassword, String newPassword, String confirmPassword) {
        if (!newPassword.equals(confirmPassword))
            return null;
        if (newPassword == null || confirmPassword == null)
            return null;
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String newEncodedPassword = encoder.encode(newPassword);
        if (newEncodedPassword.equals(oldPassword))
            return null;
        return userRepository.findById(userId)
                .map(user -> {
                    user.setPassword(newEncodedPassword);
                    return userRepository.save(user);
                });
    }

    @Override
    public List<User> viewUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> blockUser(Long userId) {
        return userRepository.findById(userId)
                .map(user -> {
                    user.setStatus(false);
                    return userRepository.save(user);
                });
    }

    @Override
    public Optional<User> getUserByUser_name(String username) {
        return userRepository.findByUsername(username);
    }


}

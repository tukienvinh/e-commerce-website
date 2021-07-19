package com.example.ecommercewebsite.restcontroller;

import com.example.ecommercewebsite.entity.User;
import com.example.ecommercewebsite.service.UserSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private UserSerivce userSerivce;

    @GetMapping("/users")
    public List<User> viewUsers() {
        return userSerivce.viewUsers();
    }

    @PostMapping("/block/{userId}")
    public Optional<User> blockUser(@PathVariable Long userId) {
        return userSerivce.blockUser(userId);
    }


}

package com.example.ecommercewebsite.restcontroller;

import com.example.ecommercewebsite.entity.User;
import com.example.ecommercewebsite.payload.response.MessageResponse;
import com.example.ecommercewebsite.service.UserSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
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

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        Optional<User> user = userSerivce.findUserById(userId);
        if (!user.isPresent())
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: User not found."));
        userSerivce.deleteUser(userId);
        return ResponseEntity.ok().body(new MessageResponse("Delete user successfully."));
    }
}

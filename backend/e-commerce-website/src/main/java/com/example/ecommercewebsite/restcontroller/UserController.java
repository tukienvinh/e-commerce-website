package com.example.ecommercewebsite.restcontroller;

import com.example.ecommercewebsite.entity.Order;
import com.example.ecommercewebsite.entity.User;
import com.example.ecommercewebsite.payload.request.ChangePasswordRequest;
import com.example.ecommercewebsite.payload.request.ChangeProfileRequest;
import com.example.ecommercewebsite.payload.response.AccountResponse;
import com.example.ecommercewebsite.payload.response.MessageResponse;
import com.example.ecommercewebsite.security.event.OnUserLogoutSuccessEvent;
import com.example.ecommercewebsite.security.service.UserDetailsImpl;
import com.example.ecommercewebsite.service.UserSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    private UserSerivce userSerivce;

    @GetMapping
    public ResponseEntity<?> viewProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Optional<User> user = userSerivce.viewProfile(userDetails.getId());
        return ResponseEntity.ok(new AccountResponse(user.get().getName(), user.get().getUsername(), user.get().getEmail(), user.get().getAddress()));
    }

    @GetMapping("/orders")
    @PreAuthorize("hasRole('USER')")
    public List<Order> getOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userSerivce.viewOrders(userDetails.getId());
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        String jwt = headerAuth.substring(7);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        OnUserLogoutSuccessEvent logoutSuccessEvent = new OnUserLogoutSuccessEvent(userDetails.getEmail(), jwt);
        applicationEventPublisher.publishEvent(logoutSuccessEvent);
        return ResponseEntity.ok(new MessageResponse("User has successfully logged out from the system!"));
    }

    @PutMapping("/edit/password")
    public ResponseEntity<?> updatePassword(@Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Optional<User> updatedUser = userSerivce.changePassword(userDetails.getId(),
                userDetails.getPassword(),
                changePasswordRequest.getNewPassword(),
                changePasswordRequest.getConfirmPassword());

        if (updatedUser == null)
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Failed to update password."));
        return ResponseEntity.ok(new MessageResponse("Password updated successfully."));
    }

    @PutMapping("/edit/profile")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody ChangeProfileRequest changeProfileRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Optional<User> updatedUser = userSerivce.changeProfile(userDetails.getId(), changeProfileRequest);
        if (updatedUser == null)
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Failed to update profile."));
        return ResponseEntity.ok(new AccountResponse(updatedUser.get().getName(), updatedUser.get().getUsername(), updatedUser.get().getEmail(), updatedUser.get().getAddress()));
    }
}

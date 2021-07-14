package com.example.ecommercewebsite.restcontroller;

import com.example.ecommercewebsite.payload.response.MessageResponse;
import com.example.ecommercewebsite.security.event.OnUserLogoutSuccessEvent;
import com.example.ecommercewebsite.security.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

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
}

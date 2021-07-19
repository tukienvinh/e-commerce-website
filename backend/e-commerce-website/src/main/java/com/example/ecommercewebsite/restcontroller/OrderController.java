package com.example.ecommercewebsite.restcontroller;

import com.example.ecommercewebsite.entity.Order;
import com.example.ecommercewebsite.payload.request.ValidateOrderRequest;
import com.example.ecommercewebsite.payload.response.MessageResponse;
import com.example.ecommercewebsite.security.service.UserDetailsImpl;
import com.example.ecommercewebsite.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Order> viewWaitingOrders() {
        return orderService.viewWaitingOrders();
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createOrder() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Order createdOrder = orderService.saveOrder(userDetails.getId());
        if (createdOrder == null)
            return ResponseEntity.ok(new MessageResponse("Fail to create order"));
        return ResponseEntity.ok(new MessageResponse("Order created successfully."));
    }

    @PostMapping("/validate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> validateOrder(@Valid @RequestBody ValidateOrderRequest validateOrderRequest) {
        Optional<Order> order = orderService.validateOrder(validateOrderRequest.getOrderId());
        if (order.get().getStatus() == 0)
            return ResponseEntity.ok(new MessageResponse("Fail to validate order"));
        return ResponseEntity.ok(new MessageResponse("Order validated."));
    }
}

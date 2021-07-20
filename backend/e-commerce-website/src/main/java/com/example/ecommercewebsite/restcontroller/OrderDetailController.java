package com.example.ecommercewebsite.restcontroller;

import com.example.ecommercewebsite.entity.OrderDetail;
import com.example.ecommercewebsite.payload.response.MessageResponse;
import com.example.ecommercewebsite.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/orderDetails")
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createOrderDetail(@Valid @RequestBody OrderDetail newOrderDetail) {
        OrderDetail orderDetail = orderDetailService.addOrderDetail(newOrderDetail);
        if (orderDetail == null)
            return ResponseEntity.ok(new MessageResponse("Fail to create order detail"));
        return ResponseEntity.ok(new MessageResponse("Create order detail successfully!"));
    }
}

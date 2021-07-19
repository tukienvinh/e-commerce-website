package com.example.ecommercewebsite.service;

import com.example.ecommercewebsite.entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> retrieveProducts();

    Optional<Product> getProduct(Long productId);

    Product saveProduct(Product product);

    void deleteProduct(Long productId);

    Product updateProduct(Product newProduct);

}

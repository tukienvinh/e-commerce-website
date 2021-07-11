package com.example.ecommercewebsite.service;

import com.example.ecommercewebsite.entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    public List<Product> retrieveProducts();

    public Optional<Product> getProduct(Long productId);

    public Product saveProduct(Product product);

    public void deleteProduct(Long productId);

    public Product updateProduct(Product newProduct);
}

package com.example.ecommercewebsite.service.impl;

import com.example.ecommercewebsite.entity.Product;
import com.example.ecommercewebsite.repository.ProductRepository;
import com.example.ecommercewebsite.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    public boolean isValidate(Product product) {
        if (product.getName() == null || product.getName().length() == 0)
            return false;
        return true;
    }

    @Override
    public List<Product> retrieveProducts() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> getProduct(Long productId) {
        return productRepository.findById(productId);
    }

    @Override
    public Product saveProduct(Product newProduct) {
        isValidate(newProduct);
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = currentDateTime.format(formatter);
        newProduct.setCreated_date(formattedDateTime);
        newProduct.setUpdated_date(formattedDateTime);
        return productRepository.save(newProduct);
    }

    @Override
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    @Override
    public Product updateProduct(Product newProduct) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = currentDateTime.format(formatter);

        if (isValidate(newProduct) == true)
            return productRepository.findById(newProduct.getId())
                    .map(product -> {
                        product.setName(newProduct.getName());
                        product.setAuthor(newProduct.getAuthor());
                        product.setCategory(newProduct.getCategory());
                        product.setPrice(newProduct.getPrice());
                        product.setDescription(newProduct.getDescription());
                        product.setStock(newProduct.getStock());
                        product.setUpdated_date(formattedDateTime);
                        product.setImage(newProduct.getImage());
                        return saveProduct(product);
                    })
                    .orElseGet(() -> saveProduct(newProduct));
        return null;
    }

}

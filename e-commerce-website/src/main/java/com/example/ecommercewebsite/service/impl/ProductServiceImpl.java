package com.example.ecommercewebsite.service.impl;

import com.example.ecommercewebsite.entity.Product;
import com.example.ecommercewebsite.repository.ProductRepository;
import com.example.ecommercewebsite.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
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
        newProduct.setCreated_date(new Date());
        newProduct.setUpdated_date(new Date());
        return productRepository.save(newProduct);
    }

    @Override
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    public Product updateProduct(Product newProduct) {
        if (isValidate(newProduct) == true)
            return productRepository.findById(newProduct.getId())
                    .map(product -> {
                        product.setName(newProduct.getName());
                        product.setAuthor(newProduct.getAuthor());
                        product.setPrice(newProduct.getPrice());
                        product.setDescription(newProduct.getDescription());
                        product.setStock(newProduct.getStock());
                        product.setCreated_date(newProduct.getCreated_date());
                        product.setUpdated_date(newProduct.getUpdated_date());
                        product.setImage(newProduct.getImage());
                        product.setRating(newProduct.getRating());
                        return saveProduct(product);
                    })
                    .orElseGet(() -> saveProduct(newProduct));
        return null;
    }
}

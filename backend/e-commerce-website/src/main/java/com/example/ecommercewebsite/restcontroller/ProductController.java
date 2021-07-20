package com.example.ecommercewebsite.restcontroller;

import com.example.ecommercewebsite.entity.Product;
import com.example.ecommercewebsite.exception.ProductNotFoundException;
import com.example.ecommercewebsite.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getProducts() {
        List<Product> products = productService.retrieveProducts();
        return products;
    }

    @GetMapping("/product/{productId}")
    public Optional<Product> findProduct(@PathVariable(value="productId") Long productID) {
        Optional<Product> product = productService.getProduct(productID);
        if (product.isPresent() == false)
            throw new ProductNotFoundException(productID);
        return product;
    }

    @PostMapping("/product")
    public Product saveProduct(@Valid @RequestBody Product product) {
        return productService.saveProduct(product);
    }

    @DeleteMapping("/product/{productId}")
    public HashMap<String, String> deleteProduct(@PathVariable(name="productId") Long productId) {
        Optional<Product> product = productService.getProduct(productId);
        if (product.isPresent() == false) {
            throw new ProductNotFoundException(productId);
        }
        productService.deleteProduct(productId);
        HashMap<String, String> map = new HashMap<>();
        map.put("message", "Delete product successfully!");
        return map;
    }

    @PutMapping("/product")
    public HashMap<String, String> updateProduct(@RequestBody Product newProduct) {
        HashMap<String, String> map = new HashMap<>();
        Product product = productService.updateProduct(newProduct);
        if (product == null) {
            map.put("message", "Fail to update product!");
        }
        else map.put("message", "Update product successfully!");
        return map;
    }
}

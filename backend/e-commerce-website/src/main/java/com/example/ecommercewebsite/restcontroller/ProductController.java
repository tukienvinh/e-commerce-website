package com.example.ecommercewebsite.restcontroller;

import com.example.ecommercewebsite.entity.Product;
import com.example.ecommercewebsite.exception.ProductNotFoundException;
import com.example.ecommercewebsite.payload.response.MessageResponse;
import com.example.ecommercewebsite.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> saveProduct(@Valid @RequestBody Product product) {
        Product result =  productService.saveProduct(product);
        if (result == null)
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Product name is already taken."));
        return ResponseEntity.ok().body(new MessageResponse("Add product successfully."));
    }

    @DeleteMapping("/product/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable(name="productId") Long productId) {
        Optional<Product> product = productService.getProduct(productId);
        if (product.isPresent() == false) {
            throw new ProductNotFoundException(productId);
        }
        productService.deleteProduct(productId);
        return ResponseEntity.ok().body(new MessageResponse("Delete product successfully."));
    }

    @PutMapping("/product")
    public ResponseEntity<?> updateProduct(@RequestBody Product newProduct) {
        Product product = productService.updateProduct(newProduct);
        if (product == null) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Product name is already taken"));
        }
        return ResponseEntity.ok().body(new MessageResponse("Update product successfully."));
    }
}

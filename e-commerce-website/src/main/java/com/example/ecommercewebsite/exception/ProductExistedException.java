package com.example.ecommercewebsite.exception;

public class ProductExistedException extends RuntimeException {
    public ProductExistedException(String name) {super("Product existed: " + name);}
}

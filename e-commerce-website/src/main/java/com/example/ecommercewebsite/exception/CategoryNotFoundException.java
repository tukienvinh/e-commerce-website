package com.example.ecommercewebsite.exception;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException(Long id) {super("Could not find category with id = " + id);}
}

package com.example.ecommercewebsite.exception;

public class CategoryExistedException extends RuntimeException {
    public CategoryExistedException(String name) {super("Category already existed: " + name);}
}

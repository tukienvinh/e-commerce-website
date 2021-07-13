package com.example.ecommercewebsite.repository;

import com.example.ecommercewebsite.entity.Role;
import com.example.ecommercewebsite.entity.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}

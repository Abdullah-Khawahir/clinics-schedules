package com.clinics_schedules.clinic_api.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinics_schedules.clinic_api.entity.Role;


public interface RoleRepository extends JpaRepository<Role, Integer> {
    Set<Role> findByUserId(Integer userId);

    void deleteByUserId(Integer userId);

    boolean existsByUserId(Integer userId);
}

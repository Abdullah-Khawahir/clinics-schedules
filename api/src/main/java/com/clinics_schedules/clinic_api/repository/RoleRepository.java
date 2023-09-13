package com.clinics_schedules.clinic_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinics_schedules.clinic_api.entity.Role;

//TODO make an entity with id
public interface RoleRepository extends JpaRepository<Role, String> {
    List<Role> findByUserId(Integer userId);

    void deleteByUserId(Integer userId);

    boolean existsByUserId(Integer userId);
}

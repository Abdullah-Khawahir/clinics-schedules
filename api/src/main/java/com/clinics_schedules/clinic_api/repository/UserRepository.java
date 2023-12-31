package com.clinics_schedules.clinic_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinics_schedules.clinic_api.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

}

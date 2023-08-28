package com.clinics_schedules.clinic_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<UserDetails, Long> {
    Optional<UserDetails> getUserByUserName();
    
}

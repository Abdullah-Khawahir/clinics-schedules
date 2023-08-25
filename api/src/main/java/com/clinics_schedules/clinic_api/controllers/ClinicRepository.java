package com.clinics_schedules.clinic_api.controllers;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinics_schedules.clinic_api.entities.Clinic;

public interface ClinicRepository extends JpaRepository<Clinic , Long> {
    
}

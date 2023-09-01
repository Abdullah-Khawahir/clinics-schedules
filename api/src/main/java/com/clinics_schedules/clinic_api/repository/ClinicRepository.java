package com.clinics_schedules.clinic_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinics_schedules.clinic_api.entity.Clinic;
import com.clinics_schedules.clinic_api.interfaces.FindableByName;

public interface ClinicRepository extends JpaRepository<Clinic , Integer>,
                                           FindableByName<Clinic>{
    
}

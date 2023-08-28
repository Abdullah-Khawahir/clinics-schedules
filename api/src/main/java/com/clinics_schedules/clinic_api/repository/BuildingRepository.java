package com.clinics_schedules.clinic_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinics_schedules.clinic_api.entity.Building;

public interface BuildingRepository extends JpaRepository<Building ,Long> {
     
}

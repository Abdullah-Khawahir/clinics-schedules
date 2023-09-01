package com.clinics_schedules.clinic_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinics_schedules.clinic_api.entity.Building;
import com.clinics_schedules.clinic_api.interfaces.FindableByName;

public interface BuildingRepository extends JpaRepository<Building ,Integer> ,FindableByName<Building> {
     
}

package com.clinics_schedules.clinic_api.controller;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinics_schedules.clinic_api.entity.Building;
import com.clinics_schedules.clinic_api.entity.Hospital;

public interface BuildingRepository extends JpaRepository<Building , Long> {

    List<Building>  getBuildingsByHospital(Hospital hospital);
}

package com.clinics_schedules.clinic_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinics_schedules.clinic_api.entity.Hospital;
import com.clinics_schedules.clinic_api.interfaces.FindableByName;

public interface HospitalRepository extends JpaRepository<Hospital , Integer> ,FindableByName<Hospital>{


}

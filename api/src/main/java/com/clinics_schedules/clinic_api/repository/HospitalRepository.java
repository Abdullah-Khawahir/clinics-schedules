package com.clinics_schedules.clinic_api.repository;

import org.springframework.data.repository.CrudRepository;

import com.clinics_schedules.clinic_api.entity.Hospital;
import com.clinics_schedules.clinic_api.interfaces.FindableByName;

public interface HospitalRepository extends CrudRepository<Hospital , Long> ,FindableByName<Hospital>{


}

package com.clinics_schedules.clinic_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinics_schedules.clinic_api.entity.ClinicSchedule;

public interface ClinicScheduleRepository extends JpaRepository<ClinicSchedule, Integer> {

}

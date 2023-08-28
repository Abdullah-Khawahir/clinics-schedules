package com.clinics_schedules.clinic_api.controller;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinics_schedules.clinic_api.entity.Hospital;
public interface HospitalRepository extends JpaRepository<Hospital, Long> {

}

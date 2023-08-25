package com.clinics_schedules.clinic_api.controllers;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinics_schedules.clinic_api.entities.Hospital;
public interface HospitalRepository extends JpaRepository<Hospital, Long> {

}

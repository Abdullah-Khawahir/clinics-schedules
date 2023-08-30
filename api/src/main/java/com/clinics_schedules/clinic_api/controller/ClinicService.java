package com.clinics_schedules.clinic_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinics_schedules.clinic_api.repository.ClinicRepository;

@Service
public class ClinicService {
    
    @Autowired
    ClinicRepository repo;
}

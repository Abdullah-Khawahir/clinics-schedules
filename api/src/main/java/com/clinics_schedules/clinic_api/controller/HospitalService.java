package com.clinics_schedules.clinic_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinics_schedules.clinic_api.repository.HospitalRepository;

@Service
public class HospitalService {
    @Autowired
    public HospitalRepository repo;

}

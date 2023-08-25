package com.clinics_schedules.clinic_api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HospitalService {
    @Autowired
    public HospitalRepository repo;

}

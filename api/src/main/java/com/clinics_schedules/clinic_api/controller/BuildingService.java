package com.clinics_schedules.clinic_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinics_schedules.clinic_api.repository.BuildingRepository;

@Service
public class BuildingService {
    @Autowired
    BuildingRepository repo;
}

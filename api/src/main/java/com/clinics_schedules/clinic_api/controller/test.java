package com.clinics_schedules.clinic_api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinics_schedules.clinic_api.entity.Building;
import com.clinics_schedules.clinic_api.entity.Clinic;
import com.clinics_schedules.clinic_api.entity.Hospital;
import com.clinics_schedules.clinic_api.exception.ResourceNotFoundException;
import com.clinics_schedules.clinic_api.service.HospitalService;

@RestController
@RequestMapping(path = { "/public" })
public class test {

    @Autowired
    private HospitalService hospitalService;
    @Autowired
    private BuildingService buildingService;
    @Autowired
    private ClinicService clinicService;

    @GetMapping(value = "/test")
    @CrossOrigin()
    public ResponseEntity<List<Clinic>> getMethodName() throws Exception {

        return ResponseEntity
                .ok(this.clinicService.repo
                        .findAll());
    }

    @GetMapping(value = "/clinic")
    public List<Clinic> getClinic() {
        return this.clinicService.repo.findAll();
    }

    @GetMapping(value = "/building")
    @CrossOrigin()
    public Iterable<Building> Building() {
        System.out.println("hit");
        return this.buildingService.repo.findAll();
    }

    @GetMapping(value = "/hospital")
    @CrossOrigin()
    public Iterable<Hospital> Hospital() {
        System.out.println("hit");
        return this.hospitalService.repository.findAll();
    }

    @GetMapping(value = "/bad")
    @CrossOrigin()
    public com.clinics_schedules.clinic_api.entity.Hospital HospitalStructure() throws ResourceNotFoundException {
        return this.hospitalService.repository
                .findByArabicName("QCH")
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "name", "QCH"));
    }

}
package com.clinics_schedules.clinic_api.controller;

import java.util.List;

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
                .ok(clinicService.repo
                        .findAll());
    }

    @GetMapping(value = "/clinic")
    public List<Clinic> getClinic() {
        return clinicService.repo.findAll();
    }

    @GetMapping(value = "/building")
    @CrossOrigin()
    public Iterable<Building> Building() {
        System.out.println("hit");
        return buildingService.repo.findAll();
    }

    @GetMapping(value = "/hospital")
    @CrossOrigin()
    public Iterable<Hospital> Hospital() {
        System.out.println("hit");
        return hospitalService.repo.findAll();
    }

    @GetMapping(value = "/bad")
    @CrossOrigin()
    public Hospital HospitalStructure() throws ResourceNotFoundException {
        return hospitalService.repo
                .findById(0L)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "hospital",
                        "id",
                        "11"));
    }

}
package com.clinics_schedules.clinic_api.controller.v1.publicControllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinics_schedules.clinic_api.dto.HospitalDto;
import com.clinics_schedules.clinic_api.service.HospitalService;

@RestController
@RequestMapping({ "/public" })
@CrossOrigin(origins = { "http://localhost:4200", "*" })
public class Hospitals {
    @Autowired
    private HospitalService service;

    @GetMapping(value = "/hospital")
    public ResponseEntity<List<HospitalDto>> getMethodName() {
        return ResponseEntity.ok(service.getAll().stream().map(HospitalDto::new).toList());
    }

}

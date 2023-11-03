package com.clinics_schedules.clinic_api.controller.v1.publicControllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clinics_schedules.clinic_api.entity.Clinic;
import com.clinics_schedules.clinic_api.exception.ResourceNotFoundException;
import com.clinics_schedules.clinic_api.service.ClinicService;

@RestController
@RequestMapping({ "/public" })
@CrossOrigin(origins = { "http://localhost:4200", "*" })
public class FullClinicController {
    @Autowired
    ClinicService service;

    @GetMapping(path = "/full-clinic/{id}")
    public ResponseEntity<Clinic> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(
                this.service.getByID(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Clinic", "id", id.toString())));
    }

    @GetMapping(path = "/full-clinic")
    public ResponseEntity<List<Clinic>> getAll(
            @RequestParam(required = false) Integer hospitalID) {
        return ResponseEntity.ok(
                this.service.getAll().stream()
                        .filter(clinic -> hospitalID == null ? true
                                : clinic.getOwnerBuilding().getOwnerHospital().getId().equals(hospitalID))
                        .toList());
    }

}

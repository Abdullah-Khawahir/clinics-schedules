package com.clinics_schedules.clinic_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinics_schedules.clinic_api.dto.HospitalDto;
import com.clinics_schedules.clinic_api.service.HospitalService;

@RestController
@RequestMapping({ "/api/v1" })
public class HospitalController {
    @Autowired
    private HospitalService hospitalService;

    @GetMapping(path = "/hospital")
    public ResponseEntity<List<HospitalDto>> getHospitals() {

        return ResponseEntity.ok(hospitalService.getAll());
    }

    @PostMapping(path = "/hospital")
    public ResponseEntity<HospitalDto> saveHospital(
            @RequestBody(required = true) final HospitalDto hospital)
            throws MissingPathVariableException {

        return new ResponseEntity<>(
                new HospitalDto(hospitalService.save(hospital)),
                HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/hospital/{id}")
    public void deleteHospital(@PathVariable(required = true) final int id)
            throws MissingPathVariableException {

        hospitalService.deleteById(id);
    }

    @PutMapping(path = "/hospital/{id}")
    public ResponseEntity<HospitalDto> updateHospital(
            @PathVariable(required = true) final int id,
            @RequestBody final HospitalDto hospital)
            throws MissingPathVariableException {

        return new ResponseEntity<HospitalDto>(
                new HospitalDto(hospitalService.updateById(id, hospital)),
                HttpStatus.ACCEPTED);

    }
}

package com.clinics_schedules.clinic_api.controller.v1.privateControllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinics_schedules.clinic_api.dto.ClinicDto;
import com.clinics_schedules.clinic_api.exception.ResourceNotFoundException;
import com.clinics_schedules.clinic_api.service.ClinicService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = { "/private" })
@CrossOrigin(origins = {"http://localhost:4200" , "*"})
public class ClinicController {

    @Autowired
    private ClinicService clinicService;

    @GetMapping(path = "/clinic")
    public ResponseEntity<List<ClinicDto>> getAllClinics() {
        return new ResponseEntity<>(clinicService.getAll().stream()
                .map(ClinicDto::new)
                .toList(), HttpStatus.ACCEPTED);
    }

    @DeleteMapping(path = "/clinic/{id}")
    public void deleteById(@PathVariable(required = true) final Integer id)
            throws MissingPathVariableException, ResourceNotFoundException, DataIntegrityViolationException {
        clinicService.deleteById(id);
    }

    @PutMapping(path = "/clinic/{id}")
    public ResponseEntity<ClinicDto> updateClinic(@PathVariable(required = true) final Integer id,
            @Valid @RequestBody(required = true) final ClinicDto clinicDto)
            throws MissingPathVariableException, DataIntegrityViolationException, ResourceNotFoundException {

        return new ResponseEntity<ClinicDto>(
                new ClinicDto(clinicService.updateById(id, clinicDto)),
                HttpStatus.ACCEPTED);
    }

    @PostMapping(path = "/clinic")
    public ResponseEntity<ClinicDto> saveClinic(
            @Valid @RequestBody(required = true) final ClinicDto clinicDto)
            throws DataIntegrityViolationException, ResourceNotFoundException {

        return new ResponseEntity<ClinicDto>(
                new ClinicDto(clinicService.save(clinicDto)),
                HttpStatus.CREATED);
    }

}

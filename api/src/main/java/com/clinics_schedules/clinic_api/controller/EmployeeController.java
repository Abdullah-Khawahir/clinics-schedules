package com.clinics_schedules.clinic_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinics_schedules.clinic_api.dto.EmployeeDto;
import com.clinics_schedules.clinic_api.service.EmployeeService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping(path = "/api/v1")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping(path = "/employee")
    public ResponseEntity<List<EmployeeDto>> getEmployees() {
        return ResponseEntity.ok(
                employeeService.getAll()
                        .stream()
                        .map(EmployeeDto::new)
                        .toList());
    }

    @PostMapping(path = "/employee")
    public ResponseEntity<EmployeeDto> saveEmployee(
            @RequestBody EmployeeDto employeeDto) {

        return new ResponseEntity<>(
                new EmployeeDto(employeeService.save(employeeDto)),
                HttpStatus.OK);
    }

    @PutMapping(path = "/employee/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable Integer id,
            @RequestBody() EmployeeDto employeeDto) {

        return ResponseEntity.ok(
                new EmployeeDto(employeeService.updateById(id, employeeDto)));
    }

    @DeleteMapping(path = "/employee/{id}")
    public void deleteEmployee(@PathVariable Integer id) {
        employeeService.deleteById(id);
    }

}

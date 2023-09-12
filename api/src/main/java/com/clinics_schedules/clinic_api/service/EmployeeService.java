package com.clinics_schedules.clinic_api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinics_schedules.clinic_api.dto.EmployeeDto;
import com.clinics_schedules.clinic_api.entity.Employee;
import com.clinics_schedules.clinic_api.exception.ResourceNotFoundException;
import com.clinics_schedules.clinic_api.interfaces.BasicCRUDService;
import com.clinics_schedules.clinic_api.repository.EmployeeRepository;

@Service
public class EmployeeService implements BasicCRUDService<Employee, EmployeeDto, Integer> {
    @Autowired
    private EmployeeRepository repository;

    @Override
    public Employee save(EmployeeDto employeeDto) {

        return repository.save(new Employee(
                null,
                employeeDto.getEnglishName(),
                employeeDto.getArabicName(),
                employeeDto.getEmail(),
                employeeDto.getPhoneNumber(),
                employeeDto.getSecondPhoneNumber()));

    }

    @Override
    public List<Employee> getAll() {
        return repository.findAll();
    }

    @Override
    public Employee updateById(Integer id, EmployeeDto employeeDto) {
        var currentUser = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee", "employee_id", id.toString()));

        currentUser
                .setArabicName(employeeDto.getArabicName())
                .setEnglishName(employeeDto.getEnglishName())
                .setEmail(employeeDto.getEmail())
                .setPhoneNumber(employeeDto.getPhoneNumber())
                .setSecondPhoneNumber(employeeDto.getSecondPhoneNumber());

        return repository.save(currentUser);
    }

    @Override
    public void deleteById(Integer id) {
        if (!repository.existsById(id))
            throw new ResourceNotFoundException("Employee", "employee_id", id.toString());
        else
            repository.deleteById(id);

    }

}

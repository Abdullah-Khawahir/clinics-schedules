package com.clinics_schedules.clinic_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinics_schedules.clinic_api.entity.Employee;
import com.clinics_schedules.clinic_api.interfaces.FindableByName;

public interface EmployeeRepository extends JpaRepository<Employee ,  Integer> ,FindableByName<Employee>{
    
}

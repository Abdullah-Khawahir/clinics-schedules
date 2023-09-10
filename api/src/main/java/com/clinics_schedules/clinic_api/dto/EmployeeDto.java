package com.clinics_schedules.clinic_api.dto;

import com.clinics_schedules.clinic_api.entity.Employee;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EmployeeDto {
    private Integer id;
    private String englishName;
    private String arabicName;

    private String email;
    private String phoneNumber;
    private String secondPhoneNumber;

    public EmployeeDto(Employee employee) {
        this.id = employee.getId();
        this.englishName = employee.getEnglishName();
        this.arabicName = employee.getArabicName();
        this.email = employee.getEmail();
        this.phoneNumber = employee.getPhoneNumber();
        this.secondPhoneNumber = employee.getSecondPhoneNumber();
    }

}

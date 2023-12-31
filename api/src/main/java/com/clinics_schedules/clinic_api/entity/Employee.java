package com.clinics_schedules.clinic_api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tbl_clinical_employee")
@Accessors(chain = true)
public class Employee {
    @Id()
    @Column(nullable = false, name = "employee_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, name = "employee_english_name")
    private String englishName;

    // @Column(nullable = false, name = "employee_arabic_name")
    // private String arabicName;

    @Column(name = "employee_specialty")
    private String specialty;

    // @Column(name = "employee_phone_number")
    // private String phoneNumber;
    // @Column(name = "employee_second_phone_number")
    // private String secondPhoneNumber;

}

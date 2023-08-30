package com.clinics_schedules.clinic_api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder

@Entity
@Table(name = "tbl_building")
public class Building {
    @Id
    @Column(nullable = false, name = "building_id")
    private long id;
    @Column(nullable = false, name = "building_arabic_name")
    private String arabicName;

    @Column(nullable = false, name = "building_english_name")
    private String englishName;

    @Column(nullable = false, name = "building_number")
    private long number;

    
}

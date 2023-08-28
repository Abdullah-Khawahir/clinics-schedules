package com.clinics_schedules.clinic_api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "tbl_clinic")
public class Clinic {
    @Id
    @Column(nullable = false, name = "clinic_id")
    private Long id;
    @Column(nullable = false, name = "clinic_arabic_name")
    private String arabicName;

    @Column(nullable = false, name = "clinic_english_name")
    private String englishName;

    @Column(nullable = false, name = "clinic_number")
    private Long number;

    @ManyToOne
    @JoinColumn(nullable = false, name = "building_id")
    private Building building;

    @Column(name = "clinic_ext")
    private String ext;
}

package com.clinics_schedules.clinic_api.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.OneToMany;
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
@Table(name = "tbl_hospital")
public class Hospital {

    @Id()
    @Column(name = "hospital_id")
    private long id;

    @Column(nullable = false, name = "hospital_arabic_name")
    private String arabicName;

    @Column(nullable = false, name = "hospital_english_name")
    private String englishName;


    @OneToMany(cascade =  CascadeType.ALL , fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id" , referencedColumnName = "hospital_id")
    private List<Building> buildings;

}
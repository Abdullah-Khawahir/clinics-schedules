package com.clinics_schedules.clinic_api.entity;

import java.util.List;

import com.clinics_schedules.clinic_api.dto.BuildingDto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "tbl_building")
public class Building {
    @Id
    @Column(name = "building_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false, name = "building_arabic_name")
    private String arabicName;

    @Column(nullable = false, name = "building_english_name")
    private String englishName;

    @Column(nullable = false, name = "building_number")
    private Integer number;

    @Column(nullable = false, name = "hospital_id")
    private Integer hospitalId;

    @OneToMany(mappedBy = "building", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Clinic> clinics;

    @ManyToOne()
    @JoinColumn(name = "hospital_id", referencedColumnName = "hospital_id", insertable = false, updatable = false)
    private Hospital hospital;

    public Building(final BuildingDto buildingDto) {
        this.id = buildingDto.getId();
        this.arabicName = buildingDto.getArabicName();
        this.englishName = buildingDto.getEnglishName();
        this.number = buildingDto.getNumber();
        this.hospitalId = buildingDto.getHospitalId();
    }

}

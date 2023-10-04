package com.clinics_schedules.clinic_api.entity;

import java.util.List;

import com.clinics_schedules.clinic_api.dto.HospitalDto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, name = "hospital_arabic_name")
    private String arabicName;

    @Column(nullable = false, name = "hospital_english_name")
    private String englishName;

    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Building> buildings;

    public Hospital(final HospitalDto hospitalDto) {
        this.id = hospitalDto.getId();
        this.arabicName = hospitalDto.getArabicName();
        this.englishName = hospitalDto.getEnglishName();
    }

}
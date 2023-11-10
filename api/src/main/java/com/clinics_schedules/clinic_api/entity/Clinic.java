package com.clinics_schedules.clinic_api.entity;

import java.util.List;

import com.clinics_schedules.clinic_api.dto.ClinicDto;
import com.fasterxml.jackson.annotation.JsonBackReference;

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
import lombok.experimental.Accessors;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "tbl_clinic")
@Accessors(chain = true)
public class Clinic {
    @Id
    @Column(name = "clinic_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // @Column(nullable = false, name = "clinic_arabic_name")
    // private String arabicName;

    @Column(nullable = false, name = "clinic_english_name")
    private String englishName;

    @Column(nullable = false, name = "clinic_number")
    private Integer number;

    @Column(name = "building_id", nullable = false)
    private Integer buildingId;

    @Column(name = "clinic_ext")
    private String ext;

    @Column(name = "clinic_note", nullable = true)
    private String note;

    @OneToMany(mappedBy = "ownerClinic", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<ClinicSchedule> schedules;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "building_id", referencedColumnName = "building_id", insertable = false, updatable = false)
    @JsonBackReference
    private Building ownerBuilding;

    public Clinic(final ClinicDto clinicDto) {
        this.id = null; // this is handled by the database
        // this.arabicName = clinicDto.getArabicName();
        this.englishName = clinicDto.getEnglishName();
        this.number = clinicDto.getNumber();
        this.buildingId = clinicDto.getBuildingId();
        this.ext = clinicDto.getExt();
        this.note = clinicDto.getNote();

    }
}

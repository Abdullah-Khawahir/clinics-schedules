package com.clinics_schedules.clinic_api.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
    private Integer id;
    @Column(nullable = false, name = "building_arabic_name")
    private String arabicName;

    @Column(nullable = false, name = "building_english_name")
    private String englishName;

    @Column(nullable = false, name = "building_number")
    private Integer number;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY ,targetEntity = Clinic.class)
    @JoinColumn(name = "building_id" ,referencedColumnName = "building_id"  )
    private List<Clinic> clinics;

}
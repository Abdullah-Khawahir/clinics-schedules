package com.clinics_schedules.clinic_api.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Getter
@Setter
@Builder
@Entity
@Table(name = "tbl_clinic")
public class Clinic {
    @Id
    @Column(name = "clinic_id", nullable = false)
    private Long id;
   
    @Column(nullable = false, name = "clinic_arabic_name")
    private String arabicName;

    @Column(nullable = false, name = "clinic_english_name")
    private String englishName;

    @Column(nullable = false, name = "clinic_number")
    private Long number;

    @Column (name = "building_id" , nullable =  false )
    private Long buildingId;

    @Column(name = "clinic_ext")
    private String ext;

    @OneToMany(cascade = CascadeType.ALL  ,fetch = FetchType.EAGER)
    @JoinColumn(name = "clinic_id" ,referencedColumnName ="clinic_id" )
    private List<ClinicSchedule> schedules; 
}

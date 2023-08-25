package com.clinics_schedules.clinic_api.entities;

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
    @Column(name = "clinic_id")
    private Long id;
    @Column(name = "clinic_name")
    private String name;

    @Column(name = "clinic_ext")
    private String ext;
    @Column(name = "clinic_number")
    private Long number;

    @ManyToOne
    @JoinColumn(name = "building_id")
    private Building building;
}

package com.clinics_schedules.clinic_api.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
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
@Setter
@Getter
@Builder

@Entity
@Table(name = "tbl_building")
public class Building {
    @Id
    @Column(name = "building_id")
    private long id;
    @Column(name = "building_name")
    private String name;
    @Column(name = "building_number")
    private long number;

    @ManyToOne
    @JoinColumn(name = "hospital_id" )
    private Hospital hospital;

}

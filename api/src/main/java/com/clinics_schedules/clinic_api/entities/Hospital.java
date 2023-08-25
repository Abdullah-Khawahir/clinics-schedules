package com.clinics_schedules.clinic_api.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
    private long id;

    @Column(name = "name")
    private String name;

    
    // @OneToMany(fetch = FetchType.EAGER )  
    // @co
    // private List<Building> buildings;

}

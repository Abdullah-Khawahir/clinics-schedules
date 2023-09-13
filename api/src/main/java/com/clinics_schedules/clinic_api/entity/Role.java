package com.clinics_schedules.clinic_api.entity;

import org.springframework.security.core.GrantedAuthority;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_user_roles")
public class Role implements GrantedAuthority {

    @JsonIgnore
    @Column(name = "user_id")
    private Integer userId;

    @Id
    @Column(name = "user_role")
    private String role;

    @JsonIgnore
    @Override
    public String getAuthority() {
        return this.role;
    }

}

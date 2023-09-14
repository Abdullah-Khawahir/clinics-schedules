package com.clinics_schedules.clinic_api.entity;

import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@Entity
@Table(name = "tbl_user_roles")
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Integer id;

    @Column(name = "user_id", insertable = true, updatable = true)
    private Integer userId;

    @Column(name = "user_role", insertable = true, updatable = true)
    private String role;

    public Role(Integer userId, String role) {
        this.userId = userId;
        this.role = role;
    }

    @Override
    public String getAuthority() {
        return this.role;
    }

}

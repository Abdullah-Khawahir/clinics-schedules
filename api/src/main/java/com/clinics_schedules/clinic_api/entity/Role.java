package com.clinics_schedules.clinic_api.entity;

import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_role")
public class Role implements GrantedAuthority {
    @Id
    // @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, optional = false, targetEntity = User.class)
    @JoinColumn(name = "user_id" , table = "tbl_user" )
    private Long userId;
    @Id
    @Column(name = "role")
    private RoleTitle role;

    @Override
    public String getAuthority() {
        return this.role.toString();
    }

}

enum RoleTitle {
    Admin,
    DataEntry;

    @Override
    public String toString() {
        return switch (this) {
            case Admin -> "admin";
            case DataEntry -> "data_entry";
        };
    }

}

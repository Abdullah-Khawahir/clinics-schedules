package com.clinics_schedules.clinic_api.entity;

import java.util.Collection;

import org.hibernate.mapping.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

enum RoleTitle implements GrantedAuthority {
    admin,
    data_entry;

    @Override
    public String getAuthority() {
        return this.toString();
    }
}
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name ="tbl_user")
public class User  {
    @Id
    @Column(nullable = false, name = "user_id")
    private Long id;
    @Column(nullable = false, name = "user_username")
    private String username;
    @Column(nullable = false, name = "user_password")
    private String password;

    // @OneToMany
    // @JoinTable(name = "tbl_user_roles", joinColumns = {
    //         @JoinColumn(table = "tbl_user_roles", name = "user_id"),
    //         @JoinColumn(table = "tbl_user", name = "user_id")
    // })
    // Collection<RoleTitle> roles;

    // @Override
    // public Collection<RoleTitle> getAuthorities() {
    //     return List.of("ADMIN");
    // }

    // @Override
    public String getPassword() {
        return this.password;
    }

    // @Override
    public String getUsername() {

        return this.username;
    }

    // @Override
    public boolean isAccountNonExpired() {

        return true;
    }

    // @Override
    public boolean isAccountNonLocked() {

        return true;
    }

    // @Override
    public boolean isCredentialsNonExpired() {

        return true;
    }

    // @Override
    public boolean isEnabled() {

        return true;
    }

}

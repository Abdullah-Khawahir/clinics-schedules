package com.clinics_schedules.clinic_api.entity;

import java.util.Collection;
import java.util.Set;

import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "tbl_user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = "user_id")
    private Integer id;
    @Column(nullable = false, name = "user_username")
    private String username;
    @Column(nullable = false, name = "user_password")
    private String password;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    Set<Role> roles;

    @JsonIgnore
    @Override
    public Collection<Role> getAuthorities() {
        return this.roles;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {

        return this.username;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {

        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {

        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {

        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {

        return true;
    }

}

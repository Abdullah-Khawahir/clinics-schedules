package com.clinics_schedules.clinic_api.dto;

import java.util.List;

import com.clinics_schedules.clinic_api.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
    public class UserDto {
    private Integer id;
    private String username;
    private String password;
    private String email;

    private List<String> roles;

    public UserDto(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.roles = user.getRoles()
                .stream()
                .map(role -> role.getAuthority().toString())
                .toList();
    }

}

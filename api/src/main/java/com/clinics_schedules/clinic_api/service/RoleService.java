package com.clinics_schedules.clinic_api.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinics_schedules.clinic_api.entity.Role;
import com.clinics_schedules.clinic_api.repository.RoleRepository;

@Service
public class RoleService {
    @Autowired
    RoleRepository roleRepository;

    public Role addRoleToUser(Integer usreId, String role) {
        return roleRepository.save(new Role(usreId, role));
    }

    public void removeRoleFromUser(Integer usreId, String role) {
        roleRepository.delete(new Role(usreId, role));
    }

    public void removeAllRolesFromUser(Integer usreId) {
        // roleRepository.deleteA(new Role(usreId, role));
        roleRepository.deleteByUserId(usreId);
    }

    public Set<Role> addRolesToUser(Integer userId, List<String> roles) {
        return roles.stream()
                .map(role -> addRoleToUser(userId, role))
                .collect(Collectors.toSet());

    }

}

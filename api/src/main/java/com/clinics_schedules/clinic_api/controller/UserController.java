package com.clinics_schedules.clinic_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinics_schedules.clinic_api.dto.UserDto;
import com.clinics_schedules.clinic_api.repository.UserRepository;

@RestController
@RequestMapping({ "/api/v1" })
public class UserController {
    @Autowired
    UserRepository repo;

    @GetMapping(value = "/user/{name}")
    public ResponseEntity<List<UserDto>> getAllUsers(
            @PathVariable String name) {
        return ResponseEntity.ok(List.of(
                repo.findByUsername(name)
                        .map(UserDto::new)
                        .get()));
    }

}

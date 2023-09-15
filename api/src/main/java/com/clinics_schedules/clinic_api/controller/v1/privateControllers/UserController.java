package com.clinics_schedules.clinic_api.controller.v1.privateControllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinics_schedules.clinic_api.dto.UserDto;
import com.clinics_schedules.clinic_api.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping({ "/private" })

public class UserController {
    @Autowired
    UserService service;

    @GetMapping(value = "/user")
    public ResponseEntity<List<UserDto>> getAllUsers(HttpServletRequest req) {

        return ResponseEntity.ok(
                service.getAll()
                        .stream()
                        .map(UserDto::new)
                        .toList());
    }

    @PostMapping(path = "/user")
    public ResponseEntity<UserDto> saveUser(@RequestBody UserDto user) {

        return ResponseEntity.ok(new UserDto(service.save(user)));
    }

    @PutMapping(path = "/user/{id}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable Integer id,
            @RequestBody UserDto userdto) {

        return ResponseEntity.ok(
                new UserDto(service.updateById(id, userdto)));
    }

    @DeleteMapping(path = "/user/{id}")
    public void deleteUser(@PathVariable Integer id) {
        service.deleteById(id);
    }

}

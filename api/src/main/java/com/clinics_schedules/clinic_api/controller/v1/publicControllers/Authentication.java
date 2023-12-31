package com.clinics_schedules.clinic_api.controller.v1.publicControllers;

import com.clinics_schedules.clinic_api.dto.UserDto;
import com.clinics_schedules.clinic_api.service.UserSecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({ "/public" })
@CrossOrigin(origins = { "http://localhost:4200", "*" })
public class Authentication {
  @Autowired
  private UserSecurityService userService;

  @PostMapping(path = "/auth")
  public ResponseEntity<UserDto> authenticateUser(@RequestBody UserDto entity)
      throws Exception {
    var user = userService.loadUserByUsername(entity.getUsername()).getUser();

    return ResponseEntity.ok(new UserDto(user));
  }
}

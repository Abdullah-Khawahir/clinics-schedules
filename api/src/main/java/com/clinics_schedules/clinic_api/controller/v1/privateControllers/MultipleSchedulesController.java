package com.clinics_schedules.clinic_api.controller.v1.privateControllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinics_schedules.clinic_api.dto.ClinicScheduleDto;
import com.clinics_schedules.clinic_api.dto.EmployeeDto;
import com.clinics_schedules.clinic_api.service.ClinicScheduleService;
import com.clinics_schedules.clinic_api.service.EmployeeService;

import lombok.AllArgsConstructor;

@RequestMapping({ "/private" })
@RestController
@AllArgsConstructor
public class MultipleSchedulesController {
    private ClinicScheduleService scheduleService;
    private EmployeeService employeeService;

    @PostMapping(value = "/multiple_schedules/{clinicID}")
    public ResponseEntity<List<ClinicScheduleDto>> postMethodName(@RequestBody List<ClinicScheduleDto> schedules,
            @PathVariable Integer clinicID) {
        List<ClinicScheduleDto> savedSchedules = new ArrayList<ClinicScheduleDto>();
        schedules.stream()
                .forEach(schedule -> schedule.setEmployees(
                        schedule.getEmployees().stream()
                                .map(emp -> employeeService
                                        .getByEnglishName(emp.getEnglishName())
                                        .orElse(employeeService.save(
                                                new EmployeeDto(emp))))
                                .toList()));
        schedules
                .forEach(schedule -> savedSchedules
                        .add(new ClinicScheduleDto(scheduleService.save(schedule))));

        return ResponseEntity.ok(savedSchedules);
    }

}

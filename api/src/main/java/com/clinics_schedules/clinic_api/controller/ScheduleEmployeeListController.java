package com.clinics_schedules.clinic_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clinics_schedules.clinic_api.entity.ScheduleEmployeeList;
import com.clinics_schedules.clinic_api.service.ScheduleEmployeeListService;

@RestController
@RequestMapping({ "/api/v1" })
public class ScheduleEmployeeListController {

    @Autowired
    private ScheduleEmployeeListService employeeListService;

    @GetMapping(path = "/schedule-employee-list")
    public ResponseEntity<List<ScheduleEmployeeList>> getAllLists() {
        return ResponseEntity.ok(
                employeeListService.getAll());
    }

    @PostMapping(path = "/schedule-employee-list/{scheduleId}")
    public ResponseEntity<List<ScheduleEmployeeList>> saveList(
            @PathVariable(name = "scheduleId") Integer scheduleId,
            @RequestBody List<Integer> employeeIds) {

        return ResponseEntity.ok(
                employeeListService.saveEmployeeList(scheduleId, employeeIds));
    }

    @DeleteMapping(path = "/schedule-employee-list/{scheduleId}")
    public void deleteListByScheduleId(@RequestParam Integer scheduleId) {
        employeeListService.deleteByScheduleId(scheduleId);
    }

    @DeleteMapping(path = "/schedule-employee-list/{scheduleId}/{employeeId}")
    public void deleteUserFromListByScheduleIdAndEmployeeId(
            @PathVariable Integer scheduleId,
            @PathVariable Integer employeeId) {
        employeeListService.deleteByScheduleIdAndEmployeeId(scheduleId, employeeId);
    }
}

package com.clinics_schedules.clinic_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinics_schedules.clinic_api.dto.ClinicScheduleDto;
import com.clinics_schedules.clinic_api.dto.EventDto;
import com.clinics_schedules.clinic_api.service.ClinicScheduleService;
import com.clinics_schedules.clinic_api.service.EventService;

@RestController
@RequestMapping(path = "/api/v1")
public class ClinicScheduleController {
    @Autowired
    private ClinicScheduleService scheduleService;
    @Autowired
    private EventService eventService;

    @GetMapping(path = "/clinic-schedule")
    public ResponseEntity<List<ClinicScheduleDto>> getMethodName() {
        return ResponseEntity.ok(
                scheduleService.getAll().stream()
                        .map(ClinicScheduleDto::new)
                        .map(schedule -> {
                            schedule.setEvents(
                                    eventService.getEventsByScheduleID(schedule.getId())
                                            .stream()
                                            .map(EventDto::new)
                                            .toList());
                            return schedule;
                        })
                        .toList());

    }

    @PostMapping(path = "/clinic-schedule")
    public ClinicScheduleDto postMethodName(@RequestBody final ClinicScheduleDto scheduleDto) {

        return new ClinicScheduleDto(scheduleService.save(scheduleDto));
    }

}

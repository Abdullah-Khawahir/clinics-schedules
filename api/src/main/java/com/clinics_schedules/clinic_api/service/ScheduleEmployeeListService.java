package com.clinics_schedules.clinic_api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinics_schedules.clinic_api.entity.ScheduleEmployeeList;
import com.clinics_schedules.clinic_api.exception.ResourceNotFoundException;
import com.clinics_schedules.clinic_api.repository.ScheduleEmployeeListRepository;

import jakarta.transaction.Transactional;

@Service()
@Transactional
public class ScheduleEmployeeListService {

    @Autowired
    private ScheduleEmployeeListRepository repository;

    public List<ScheduleEmployeeList> getAll() {
        return repository.findAll();
    }

    public List<ScheduleEmployeeList> getByScheduleId(Integer scheduleId) {
        return repository.findByScheduleId(scheduleId);
    }

    public void deleteByScheduleId(Integer scheduleId) {
        if (repository.existsByScheduleId(scheduleId)) {
            repository.deleteByScheduleId(scheduleId);
        } else
            throw new ResourceNotFoundException("Schedule's Employee List", "schedule_id", scheduleId.toString());
    }

    public List<ScheduleEmployeeList> saveEmployeeList(Integer scheduleId, List<Integer> employeeIds) {
        var list = employeeIds.stream()
                .map(employeeId -> new ScheduleEmployeeList(scheduleId, employeeId))
                .toList();

        return repository.saveAll(list);
    }

    public void deleteByScheduleIdAndEmployeeId(Integer scheduleId, Integer employeeId) {
        repository.deleteByScheduleIdAndEmployeeId(scheduleId, employeeId);
    }

}
package com.clinics_schedules.clinic_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinics_schedules.clinic_api.entity.ScheduleEmployeeList;

public interface ScheduleEmployeeListRepository extends JpaRepository<ScheduleEmployeeList, Integer> {

    List<ScheduleEmployeeList> findByScheduleId(Integer scheduleId);

    void deleteByScheduleId(Integer scheduleId);

    boolean existsByScheduleId(Integer scheduleId);

    void deleteByScheduleIdAndEmployeeId(Integer scheduleId, Integer employeeId);

    void existsByScheduleIdAndEmployeeId(Integer scheduleId, Integer employeeId);
}

package com.clinics_schedules.clinic_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinics_schedules.clinic_api.entity.Event;

public interface EventRepository extends JpaRepository<Event, Integer> {

    List<Event> findByScheduleId(Integer scheduleId);
}

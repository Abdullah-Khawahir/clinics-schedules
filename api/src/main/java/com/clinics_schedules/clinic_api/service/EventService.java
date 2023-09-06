package com.clinics_schedules.clinic_api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinics_schedules.clinic_api.entity.Event;
import com.clinics_schedules.clinic_api.repository.EventRepository;

@Service
public class EventService {

    @Autowired
    private EventRepository repository;

    public List<Event> saveEvents(final List<Event> events) {
        return repository.saveAll(events);
    }

    public List<Event> getEventsByScheduleID(final Integer Id) {
        return repository.findByScheduleId(Id);
    }
}

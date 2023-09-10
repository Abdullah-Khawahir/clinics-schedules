package com.clinics_schedules.clinic_api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clinics_schedules.clinic_api.entity.Event;
import com.clinics_schedules.clinic_api.repository.EventRepository;

@Service
@Transactional
public class EventService {

    @Autowired
    private EventRepository repository;

    public List<Event> saveEvents(final List<Event> events) {
        return repository.saveAll(events);
    }

    public List<Event> getEventsByScheduleID(final Integer Id) {
        return repository.findByScheduleId(Id);
    }

    public void deleteByScheduleId(Integer id) {
        repository.deleteByScheduleId(id);
    }
}

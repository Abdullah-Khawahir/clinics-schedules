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
        repository.deleteEventsByScheduleId(id);
    }

    // @Scheduled(fixedDelay = 1, timeUnit = TimeUnit.MINUTES)
    // protected void cleanPassedEvents() {
    //     var toBeDeleted = this.repository.findFinishedEvents();
    //     System.out.println(String.format("passed events count: %d" , toBeDeleted.size()));
        
    //     this.repository.deletePassedEvents();
        
    //     var afterDelete = this.repository.findFinishedEvents();
    //     System.out.println(String.format("passed events count afterDelete: %d" , afterDelete.size()));
   
    // }
}

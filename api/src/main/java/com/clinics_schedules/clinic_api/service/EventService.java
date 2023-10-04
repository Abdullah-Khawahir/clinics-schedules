package com.clinics_schedules.clinic_api.service;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
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

    @Scheduled(fixedDelay = 1, timeUnit = TimeUnit.HOURS)
    protected void cleanPassedEvents() {
        
        System.out.println(
                String.format("q :%d r :%d",
                        repository.findAll()
                                .stream()
                                .filter(e -> e.getFinishTime().getTime() < new Date().getTime())
                                .count(),
                        repository.findFinishedEvents().size()));
    }
}

package com.clinics_schedules.clinic_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.clinics_schedules.clinic_api.entity.Event;

public interface EventRepository extends JpaRepository<Event, Integer> {

    List<Event> findByScheduleId(Integer scheduleId);
    @Modifying
    @Query(value = "DELETE from tbl_event where schedule_id = ?1 " ,nativeQuery = true)
    void deleteEventsByScheduleId(Integer scheduleId);

    boolean existsByScheduleId(Integer scheduleId);

    @Query(value = "select * from tbl_event where event_finish < NOW() ", nativeQuery = true)
    List<Event> findFinishedEvents();

    
    @Modifying @Query(value = "DELETE from tbl_event where event_finish < NOW() ", nativeQuery = true)
    void deletePassedEvents();


}

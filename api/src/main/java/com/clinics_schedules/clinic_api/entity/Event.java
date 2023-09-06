package com.clinics_schedules.clinic_api.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id", nullable = false)
    private Integer eventId;

    @JoinColumn(name = "schedule_id", nullable = false, referencedColumnName = "schedule_id", table = "tbl_clinic_schedule")
    private Integer scheduleId;

    @Column(name = "event_begin", nullable = false)
    private Date beginTime;

    @Column(name = "event_finish", nullable = false)
    private Date finishTime;

    public Event(final Integer scheduleId, final Date begin, final Date finish) {
        this.scheduleId = scheduleId;
        this.eventId = null;
        this.beginTime = begin;
        this.finishTime = finish;
    }

}

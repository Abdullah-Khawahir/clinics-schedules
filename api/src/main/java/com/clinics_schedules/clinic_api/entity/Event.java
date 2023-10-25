package com.clinics_schedules.clinic_api.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    @Column(name = "schedule_id", nullable = false)
    private Integer scheduleId;

    @Column(name = "event_begin", nullable = false)
    private Date beginTime;

    @Column(name = "event_finish", nullable = false)
    private Date finishTime;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY  )
    @JoinColumn(name = "schedule_id", referencedColumnName = "schedule_id",  insertable = false, updatable = false)
    @JsonBackReference
    private ClinicSchedule __ownerSchedule; // the name schedule confuse JPA when deleting

    public Event(final Integer scheduleId, final Date begin, final Date finish) {
        this.scheduleId = scheduleId;
        this.eventId = null;
        this.beginTime = begin;
        this.finishTime = finish;
    }

}

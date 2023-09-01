package com.clinics_schedules.clinic_api.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
    @JoinColumn(name = "schedule_id", nullable = false,
     referencedColumnName = "schedule_id" , table = "tbl_clinic_schedule" )
    
    private Integer scheduleId;
    @Id
    @Column(name = "event_begin", nullable = false)
    private Date beginTime;
    @Id
    @Column(name = "event_finish", nullable = false)
    private Date finishTime;

}

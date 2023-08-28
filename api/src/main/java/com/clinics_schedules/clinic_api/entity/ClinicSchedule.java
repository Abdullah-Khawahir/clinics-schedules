package com.clinics_schedules.clinic_api.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_clinic_schedule")
public class ClinicSchedule {
    @Id
    @Column(name = "schedule_id", nullable = false)
    private Long id;
    @Column(name = "schedule_begin_date", nullable = false)
    private Date beginTime;
    @Column(name = "schedule_expire_date", nullable = false)
    private Date expireTime;

    @Column(name = "event_start_time", nullable = false)
    private Date eventStart;
    @Column(name = "event_finish_time", nullable = false)
    private Date eventFinish;

    @Column(name = "repeat", nullable = false)
    private TimeRepeatUnit repeat;

}

enum TimeRepeatUnit {
    never,
    daily,
    weekends,
    weekdays,
    weekly,
    monthly

}
package com.clinics_schedules.clinic_api.entity;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_clinic_schedule")
@Accessors(chain = true)

public class ClinicSchedule {
    @Id
    @Column(name = "schedule_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "clinic_id", nullable = false)
    private Integer clinicId;

    @Column(name = "schedule_begin_date", nullable = false)
    private Date beginDate;
    @Column(name = "schedule_expire_date", nullable = false)
    private Date expireDate;

    @Column(name = "event_start_time", nullable = false)
    private LocalTime eventStart;
    @Column(name = "event_finish_time", nullable = false)
    private LocalTime eventFinish;

    public static enum TimeRepeatUnit {
        never,
        daily,
        weekends,
        weekdays,
        weekly,
        monthly;

        @Override
        public String toString() {
            return switch (this) {
                case never -> "never";
                case daily -> "daily";
                case monthly -> "monthly";
                case weekdays -> "weekdays";
                case weekends -> "weekends";
                case weekly -> "weekly";
            };
        }

    }

    @Column(name = "event_repeat", nullable = false)
    @Enumerated(EnumType.STRING)
    private TimeRepeatUnit repeat;

    @ManyToMany
    @JoinTable(name = "tbl_Schedule_Employees_List", joinColumns = @JoinColumn(name = "schedule_id"), inverseJoinColumns = @JoinColumn(name = "employee_id"))
    private List<Employee> employees;

    public ClinicSchedule(
            final Integer id,
            final Integer clinicId,
            final Date beginTime,
            final Date expireTime,
            final LocalTime eventStart,
            final LocalTime eventFinish,
            final TimeRepeatUnit repeat) {

        this.id = id;
        this.clinicId = clinicId;
        this.beginDate = beginTime;
        this.expireDate = expireTime;
        this.eventStart = eventStart;
        this.eventFinish = eventFinish;
        this.repeat = repeat;
    }

}

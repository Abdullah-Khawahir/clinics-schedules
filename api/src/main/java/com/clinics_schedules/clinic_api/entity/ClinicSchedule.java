package com.clinics_schedules.clinic_api.entity;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

import com.clinics_schedules.clinic_api.entity.enums.TimeRepeatUnit;

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

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_clinic_schedule")
public class ClinicSchedule {
    @Id
    @Column(name = "schedule_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "schedule_begin_date", nullable = false)
    private Date beginTime;
    @Column(name = "schedule_expire_date", nullable = false)
    private Date expireTime;

    @Column(name = "event_start_time", nullable = false)
    private LocalTime eventStart;
    @Column(name = "event_finish_time", nullable = false)
    private LocalTime eventFinish;

    @Column(name = "event_repeat", nullable = false)
    @Enumerated(EnumType.STRING)
    private TimeRepeatUnit repeat;

    // @OneToMany()
    // @JoinColumn(
    // table = "tbl_Schedule_Employees_List",
    // name = "schedule_id",
    // referencedColumnName = "schedule_id"
    // )
    @ManyToMany
    @JoinTable(name = "tbl_Schedule_Employees_List", joinColumns = @JoinColumn(name = "schedule_id"), inverseJoinColumns = @JoinColumn(name = "employee_id"))
    private List<Employee> employee;

}

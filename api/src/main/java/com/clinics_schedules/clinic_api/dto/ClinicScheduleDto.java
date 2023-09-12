package com.clinics_schedules.clinic_api.dto;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

import com.clinics_schedules.clinic_api.entity.ClinicSchedule;
import com.clinics_schedules.clinic_api.entity.Employee;
import com.clinics_schedules.clinic_api.entity.ClinicSchedule.TimeRepeatUnit;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@AllArgsConstructor
@Accessors(chain = true)
public class ClinicScheduleDto {
    private Integer id;
    private Integer clinicId;
    private Date beginTime;
    private Date expireTime;
    private LocalTime eventStart;
    private LocalTime eventFinish;
    private TimeRepeatUnit repeat;

    private List<EventDto> events;
    private List<Employee> employees;

    public ClinicScheduleDto(final ClinicSchedule schedule) {
        this.id = schedule.getId();
        this.clinicId = schedule.getClinicId();
        this.beginTime = schedule.getBeginDate();
        this.expireTime = schedule.getExpireDate();
        this.eventStart = schedule.getEventStart();
        this.eventFinish = schedule.getEventFinish();
        this.repeat = schedule.getRepeat();
        this.employees = schedule.getEmployees();
    }

}

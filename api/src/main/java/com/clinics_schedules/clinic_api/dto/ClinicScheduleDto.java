package com.clinics_schedules.clinic_api.dto;

import java.time.LocalTime;
import java.util.List;

import com.clinics_schedules.clinic_api.entity.ClinicSchedule;
import com.clinics_schedules.clinic_api.entity.Employee;
import com.clinics_schedules.clinic_api.enums.TimeRepeatUnit;

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
    private Long beginDate;
    private Long expireDate;
    private LocalTime eventStart;
    private LocalTime eventFinish;
    private TimeRepeatUnit repeat;

    private List<EventDto> events;
    private List<Employee> employees;

    public ClinicScheduleDto(final ClinicSchedule schedule) {
        this.id = schedule.getId();
        this.clinicId = schedule.getClinicId();
        this.beginDate = schedule.getBeginDate().getTime();
        this.expireDate = schedule.getExpireDate().getTime();
        this.eventStart = schedule.getEventStart();
        this.eventFinish = schedule.getEventFinish();
        this.repeat = schedule.getRepeat();
        this.employees = schedule.getEmployees();
    }

}

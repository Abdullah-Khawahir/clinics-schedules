package com.clinics_schedules.clinic_api.dto;

import java.time.LocalTime;
import java.util.List;

import com.clinics_schedules.clinic_api.entity.Employee;
import com.clinics_schedules.clinic_api.enums.TimeRepeatUnit;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class FullClinicScheduleDto {

    private Integer id;

    private ClinicDto clinic;

    private Long beginDate;

    private Long expireDate;

    private LocalTime eventStart;

    private LocalTime eventFinish;

    private TimeRepeatUnit repeat;

    private List<Employee> employees;

    private String note;

}

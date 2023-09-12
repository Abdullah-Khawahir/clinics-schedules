package com.clinics_schedules.clinic_api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Entity
@Accessors(chain = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_Schedule_Employees_List")
public class ScheduleEmployeeList {

    
    @Column(name = "schedule_id", unique = false)
    private Integer scheduleId;

    @Id
    @Column(name = "employee_id")
    private Integer employeeId;

}

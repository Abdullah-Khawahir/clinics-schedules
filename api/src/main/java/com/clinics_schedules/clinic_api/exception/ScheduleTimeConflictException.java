package com.clinics_schedules.clinic_api.exception;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.clinics_schedules.clinic_api.entity.ClinicSchedule;

import lombok.Getter;

@Getter
@ResponseStatus(code = HttpStatus.CONFLICT)
public class ScheduleTimeConflictException extends RuntimeException {
    private String details;
    private List<ClinicSchedule> conflictedSchedules;

    public ScheduleTimeConflictException(ClinicSchedule schedule, List<ClinicSchedule> conflictedSchedules) {

        super("schedule conflicts with the schedules of this ids: "
                .concat(conflictedSchedules
                        .stream()
                        .map(s -> s.getId().toString())
                        .collect(Collectors.joining(" , "))));

        this.details = String.format(
                "the schedule of Id : %s have a conflictTime with the following\n",
                schedule.getId())
                .concat(
                        conflictedSchedules
                                .stream()
                                .map(s -> String.format("id:%d , start:%s , finish:%s", s.getId(),
                                        s.getEventStart().toString(), s.getEventFinish().toString()))
                                .collect(Collectors.joining("\n")));
        this.conflictedSchedules = conflictedSchedules;

    }
}

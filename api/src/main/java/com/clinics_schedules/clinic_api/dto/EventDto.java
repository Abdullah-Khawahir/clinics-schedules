package com.clinics_schedules.clinic_api.dto;

import com.clinics_schedules.clinic_api.entity.Event;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventDto {
    private Integer scheduleId;
    private Long beginTime;
    private Long finishTime;

    public EventDto(final Event event) {
        this.scheduleId = event.getScheduleId();
        this.beginTime = event.getBeginTime().getTime();
        this.finishTime = event.getFinishTime().getTime();
    }

}

package com.clinics_schedules.clinic_api.dto;

import java.util.Date;

import com.clinics_schedules.clinic_api.entity.Event;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventDto {
    private Integer scheduleId;
    private Date beginTime;
    private Date finishTime;

    public EventDto(final Event event) {
        this.scheduleId = event.getScheduleId();
        this.beginTime = event.getBeginTime();
        this.finishTime = event.getFinishTime();
    }

}

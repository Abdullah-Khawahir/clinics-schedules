package com.clinics_schedules.clinic_api.payload;

import java.util.Date;

import lombok.Builder;
import lombok.Getter;

@Getter()
@Builder()
public class ErrorDetails {
    private Date timestamp;
    private String message;
    private String details;

    public ErrorDetails(Date timestamp, String message, String details) {
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
    }

}
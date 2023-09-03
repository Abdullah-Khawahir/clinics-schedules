package com.clinics_schedules.clinic_api.payload;

import java.util.Date;

import lombok.Builder;
import lombok.Getter;

@Getter()
@Builder()
public class ErrorDetails {
    private final Date timestamp;
    private final String message;
    private final Object details;

    public ErrorDetails(final Date timestamp, final String message, final Object details) {
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
    }

}
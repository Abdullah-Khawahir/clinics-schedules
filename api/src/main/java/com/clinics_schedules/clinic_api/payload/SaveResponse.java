package com.clinics_schedules.clinic_api.payload;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.Getter;

@ResponseStatus(code = HttpStatus.CREATED)
@Getter
public class SaveResponse {
    private final Date timestamp ;

    private final String message;


    public SaveResponse(final String message){
        this.message = message;
        this.timestamp = new Date();

    }

}

package com.clinics_schedules.clinic_api.payload;

import java.sql.Date;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@ResponseStatus(code = HttpStatus.CREATED)
@AllArgsConstructor
@Getter
public class SaveResponse {
    private final Date timestamp ;

    private final String message;


}

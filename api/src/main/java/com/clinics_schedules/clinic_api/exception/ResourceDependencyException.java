package com.clinics_schedules.clinic_api.exception;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.IM_USED)
public class ResourceDependencyException extends RuntimeException {
    public final String resourceName;

    public final List<?> dependentFields;

    public ResourceDependencyException(
            String resourceName,
            List<?> dependentFields) {
        super(String.format("the %s is needed by other records delete them first then try again", resourceName));
        this.resourceName = resourceName;
        this.dependentFields = dependentFields;
    }
}

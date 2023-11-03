package com.clinics_schedules.clinic_api.exception;

import java.util.Date;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.clinics_schedules.clinic_api.payload.ErrorDetails;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorDetails> handleResourceNotFoundException(
			final ResourceNotFoundException exception,
			final WebRequest webRequest) {

		return new ResponseEntity<ErrorDetails>(
				ErrorDetails
						.builder()
						.message(exception.getMessage())
						.details(null)
						.timestamp(new Date())
						.build(),
				HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<ErrorDetails> DataIntegrityViolationHandler(
			final DataIntegrityViolationException exception,
			final WebRequest webRequest) {
		return new ResponseEntity<ErrorDetails>(
				ErrorDetails
						.builder()
						.message(exception.getMostSpecificCause().getMessage())
						.details(null)
						.timestamp(new Date())
						.build(),
				HttpStatus.NOT_ACCEPTABLE);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorDetails> ValidationExceptionHandler(final MethodArgumentNotValidException exception,
			final WebRequest webRequest) {
		return new ResponseEntity<ErrorDetails>(
				ErrorDetails
						.builder()
						.message("invalid input")
						.details(exception.getAllErrors()
								.stream()
								.map(error -> String.format("%s for %s",
										error.getDefaultMessage(),
										error.getObjectName()))
								.toList())
						.timestamp(new Date())
						.build(),
				HttpStatus.BAD_REQUEST);

	}

	@ExceptionHandler(ScheduleTimeConflictException.class)
	public ResponseEntity<ErrorDetails> timeConflictHandler(final ScheduleTimeConflictException exception,
			final WebRequest webRequest) {
		return new ResponseEntity<ErrorDetails>(
				ErrorDetails.builder()
						.message(exception.getMessage())
						.details(exception.getDetails())
						.timestamp(new Date())
						.build(),
				HttpStatus.CONFLICT);
	}

	@ExceptionHandler(UsernameNotFoundException.class)
	public ResponseEntity<ErrorDetails> usernameNotFoundHandler(
			final UsernameNotFoundException exception,
			final WebRequest webRequest) {
		return new ResponseEntity<ErrorDetails>(
				ErrorDetails.builder()
						.message(exception.getMessage())
						.details(null)
						.timestamp(new Date())
						.build(),
				HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(ResourceDependencyException.class)
	public ResponseEntity<ErrorDetails> dependencyException(final ResourceDependencyException exception,
			final WebRequest webRequest) {
		return new ResponseEntity<ErrorDetails>(
				ErrorDetails.builder()
						.message(exception.getMessage())
						.details(exception.dependentFields)
						.timestamp(new Date())
						.build(),
				HttpStatus.CONFLICT);
	}
}

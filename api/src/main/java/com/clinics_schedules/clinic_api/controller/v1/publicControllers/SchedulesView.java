package com.clinics_schedules.clinic_api.controller.v1.publicControllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clinics_schedules.clinic_api.entity.ClinicSchedule;
import com.clinics_schedules.clinic_api.service.ClinicScheduleService;

@RestController
@RequestMapping({ "/public" })
public class SchedulesView {
	@Autowired
	ClinicScheduleService scheduleService;

	@GetMapping(path = "/schedules")
	public List<ClinicSchedule> getMethodName(
			@RequestParam(required = false) String name,
			@RequestParam(required = false, defaultValue = "1000") Integer limit,
			@RequestParam(required = false) Integer clinicId) {

				return scheduleService
				.getAll()
				.stream()
				.filter(t -> isEmpty(name) ? true
						: (t.getEmployees().stream()
								.filter(emp -> emp.getArabicName().contains(name) ||
										emp.getEnglishName().contains(name))

								.count() != 0))

				.filter(s -> isEmpty(clinicId) ? true : s.getId() == clinicId)
				.limit(limit)
				.toList();
	}

	private boolean isEmpty(Object object) {
		return object == null;
	}
}

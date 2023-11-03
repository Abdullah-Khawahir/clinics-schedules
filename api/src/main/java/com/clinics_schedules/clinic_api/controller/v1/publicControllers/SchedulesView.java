package com.clinics_schedules.clinic_api.controller.v1.publicControllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clinics_schedules.clinic_api.dto.ClinicDto;
import com.clinics_schedules.clinic_api.dto.FullClinicScheduleDto;
import com.clinics_schedules.clinic_api.service.ClinicScheduleService;
import com.clinics_schedules.clinic_api.service.ClinicService;

@RestController
@RequestMapping({ "/public" })
@CrossOrigin(origins = { "http://localhost:4200", "*" })
public class SchedulesView {
	@Autowired
	ClinicScheduleService scheduleService;

	@Autowired
	ClinicService clinicService;

	@GetMapping(path = "/schedules")
	public List<FullClinicScheduleDto> getMethodName(
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
				.map(schedule -> FullClinicScheduleDto
						.builder()
						.id(schedule.getId())
						.clinic(clinicService.getByID(schedule.getClinicId()).map(ClinicDto::new).get())
						.beginDate(schedule.getBeginDate().getTime())
						.expireDate(schedule.getExpireDate().getTime())
						.eventStart(schedule.getEventStart())
						.eventFinish(schedule.getEventFinish())
						.repeat(schedule.getRepeat())
						.employees(schedule.getEmployees())
						.build())
				.toList();
	}

	private boolean isEmpty(Object object) {
		return object == null;
	}
}

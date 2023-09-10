package com.clinics_schedules.clinic_api.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinics_schedules.clinic_api.dto.ClinicScheduleDto;
import com.clinics_schedules.clinic_api.entity.ClinicSchedule;
import com.clinics_schedules.clinic_api.entity.ClinicSchedule.TimeRepeatUnit;
import com.clinics_schedules.clinic_api.entity.Event;
import com.clinics_schedules.clinic_api.exception.ResourceNotFoundException;
import com.clinics_schedules.clinic_api.interfaces.BasicCRUDService;
import com.clinics_schedules.clinic_api.repository.ClinicScheduleRepository;

@Service
public class ClinicScheduleService implements BasicCRUDService<ClinicSchedule, ClinicScheduleDto, Integer> {
	@Autowired
	private ClinicScheduleRepository repository;
	@Autowired
	private EventService eventService;

	@Override
	public ClinicSchedule save(final ClinicScheduleDto scheduleDto) {
		final ClinicSchedule newSchedule = new ClinicSchedule(
				scheduleDto.getId(),
				scheduleDto.getClinicId(),
				scheduleDto.getBeginTime(),
				scheduleDto.getExpireTime(),
				scheduleDto.getEventStart(),
				scheduleDto.getEventFinish(),
				scheduleDto.getRepeat());

		var events = getEvents(newSchedule);

		eventService.saveEvents(events);

		return repository.save(newSchedule);
	}

	private List<Event> getEvents(final ClinicSchedule newSchedule) {
		final List<Event> events = new ArrayList<Event>(60);

		final Calendar start = Calendar.getInstance();
		start.setTime(newSchedule.getBeginDate());

		final Calendar end = Calendar.getInstance();
		end.setTime(newSchedule.getExpireDate());
		end.add(Calendar.DAY_OF_WEEK, 1);

		final Calendar datePointer = Calendar.getInstance();
		datePointer.setTime(start.getTime());
		do {
			datePointer.set(Calendar.HOUR_OF_DAY, newSchedule.getEventStart().getHour());
			datePointer.set(Calendar.MINUTE, newSchedule.getEventStart().getMinute());
			final var eventStart = datePointer.getTime();

			System.out.println(datePointer.get(Calendar.HOUR_OF_DAY));

			datePointer.set(Calendar.HOUR_OF_DAY, newSchedule.getEventFinish().getHour());
			datePointer.set(Calendar.MINUTE, newSchedule.getEventFinish().getMinute());
			final var eventEnd = datePointer.getTime();

			System.out.println(datePointer.get(Calendar.HOUR_OF_DAY));

			events.add(new Event(newSchedule.getId(), eventStart, eventEnd));

			addNextRepeatStep(datePointer, newSchedule.getRepeat());
		} while (datePointer.before(end) && newSchedule.getRepeat() != TimeRepeatUnit.never);

		return events;
	}

	private void addNextRepeatStep(Calendar date, TimeRepeatUnit repeat) {
		switch (repeat) {
			case never:
				break;
			case daily: {
				date.add(Calendar.DAY_OF_WEEK, 1);
				return;
			}
			case monthly: {
				date.add(Calendar.MONTH, 1);
				return;
			}
			case weekdays: {
				var day = date.get(Calendar.DAY_OF_WEEK);
				if (day == Calendar.SATURDAY ||
						day == Calendar.SUNDAY ||
						day == Calendar.MONDAY ||
						day == Calendar.TUESDAY ||
						day == Calendar.WEDNESDAY) {
					date.add(Calendar.DAY_OF_WEEK, 1);
					return;
				} else {
					if (day == Calendar.THURSDAY) {
						date.add(Calendar.DAY_OF_WEEK, 3);
						return;
					}
					if (day == Calendar.FRIDAY) {
						date.add(Calendar.DAY_OF_WEEK, 2);
						return;
					}
				}

			}
			case weekends: {
				var day = date.get(Calendar.DAY_OF_WEEK);
				if (day == Calendar.THURSDAY ||
						day == Calendar.FRIDAY) {
					date.add(Calendar.DAY_OF_WEEK, 1);
					return;
				} else {
					if (day == Calendar.SATURDAY) {
						date.add(Calendar.DAY_OF_WEEK, 6);
						return;
					}
					if (day == Calendar.SUNDAY) {
						date.add(Calendar.DAY_OF_WEEK, 5);
						return;
					}
					if (day == Calendar.MONDAY) {
						date.add(Calendar.DAY_OF_WEEK, 4);
						return;
					}
					if (day == Calendar.TUESDAY) {
						date.add(Calendar.DAY_OF_WEEK, 3);
						return;
					}
					if (day == Calendar.WEDNESDAY) {
						date.add(Calendar.DAY_OF_WEEK, 2);
						return;
					}

				}
			}
			case weekly: {
				date.add(Calendar.WEEK_OF_MONTH, 1);
				return;
			}
		}
	}

	@Override
	public List<ClinicSchedule> getAll() {
		return repository.findAll();
	}

	@Override
	public ClinicSchedule updateById(final Integer id, final ClinicScheduleDto scheduleDto) {
		final var currentSchedule = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Clinic_Schedule", "id", id.toString()));

		currentSchedule
				.setClinicId(scheduleDto.getClinicId())
				.setBeginDate(scheduleDto.getBeginTime())
				.setExpireDate(scheduleDto.getExpireTime())
				.setEventStart(scheduleDto.getEventStart())
				.setEventFinish(scheduleDto.getEventFinish())
				.setRepeat(scheduleDto.getRepeat());

		deleteOldEvents(currentSchedule);

		return this.save(new ClinicScheduleDto(currentSchedule));
	}

	private void deleteOldEvents(final ClinicSchedule currentSchedule) {
		try {
			eventService.deleteByScheduleId(currentSchedule.getId());
		} catch (ResourceNotFoundException rnfe) {
		}
	}

	@Override
	public void deleteById(final Integer id) {
		if (!repository.existsById(id))
			throw new ResourceNotFoundException("Clinic_Schedule", "id", id.toString());

		repository.deleteById(id);
	}

}

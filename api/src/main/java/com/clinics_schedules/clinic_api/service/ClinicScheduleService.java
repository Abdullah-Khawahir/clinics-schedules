package com.clinics_schedules.clinic_api.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinics_schedules.clinic_api.dto.ClinicScheduleDto;
import com.clinics_schedules.clinic_api.entity.ClinicSchedule;
import com.clinics_schedules.clinic_api.entity.ClinicSchedule.TimeRepeatUnit;
import com.clinics_schedules.clinic_api.entity.Event;
import com.clinics_schedules.clinic_api.exception.ResourceNotFoundException;
import com.clinics_schedules.clinic_api.exception.ScheduleTimeConflictException;
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
		final ClinicSchedule scheduleToSave = new ClinicSchedule(
				null,
				scheduleDto.getClinicId(),
				scheduleDto.getBeginTime(),
				scheduleDto.getExpireTime(),
				scheduleDto.getEventStart(),
				scheduleDto.getEventFinish(),
				scheduleDto.getRepeat());

		var conflicts = getConflictList(scheduleToSave);
		if (!conflicts.isEmpty()) {
			Set<Integer> conflictedScheduleId = new HashSet<>();
			conflicts.forEach(event -> conflictedScheduleId.add(event.getScheduleId()));

			var conflictSchedules = repository.findAllById(conflictedScheduleId);
			throw new ScheduleTimeConflictException(scheduleToSave, conflictSchedules);
		}
		final var savedSchedule = repository.save(scheduleToSave);

		final var events = getEvents(savedSchedule);

		eventService.saveEvents(events);

		return savedSchedule;
	}

	private List<Event> getEvents(final ClinicSchedule schedule) {
		final List<Event> events = new ArrayList<Event>(60);

		final Calendar start = Calendar.getInstance();
		start.setTime(schedule.getBeginDate());

		final Calendar end = Calendar.getInstance();
		end.setTime(schedule.getExpireDate());
		end.add(Calendar.DAY_OF_WEEK, 1);

		final Calendar datePointer = Calendar.getInstance();
		datePointer.setTime(start.getTime());
		do {
			datePointer.set(Calendar.HOUR_OF_DAY, schedule.getEventStart().getHour());
			datePointer.set(Calendar.MINUTE, schedule.getEventStart().getMinute());
			final var eventStart = datePointer.getTime();

			datePointer.set(Calendar.HOUR_OF_DAY, schedule.getEventFinish().getHour());
			datePointer.set(Calendar.MINUTE, schedule.getEventFinish().getMinute());
			final var eventEnd = datePointer.getTime();

			events.add(new Event(schedule.getId(), eventStart, eventEnd));

			addNextRepeatStep(datePointer, schedule.getRepeat());
		} while (datePointer.before(end) && schedule.getRepeat() != TimeRepeatUnit.never);

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

		var conflicts = getConflictList(currentSchedule);
		if (!conflicts.isEmpty()) {
			Set<Integer> conflictedScheduleId = new HashSet<>();
			conflicts.forEach(event -> conflictedScheduleId.add(event.getScheduleId()));

			var conflictSchedules = repository.findAllById(conflictedScheduleId);
			throw new ScheduleTimeConflictException(currentSchedule, conflictSchedules);
		}

		deleteOldEvents(currentSchedule);
		final var updatedSchedule = repository.save(currentSchedule);
		final var events = this.getEvents(updatedSchedule);

		eventService.saveEvents(events);
		return updatedSchedule;
	}

	private List<Event> getConflictList(final ClinicSchedule currentSchedule) {
		var conflict = new ArrayList<Event>();
		var schedules = this.getAll()
				.stream()
				.filter(s -> s.getClinicId() == currentSchedule.getClinicId())
				.toList();

		for (ClinicSchedule schedule : schedules) {
			if (schedule.getId() != currentSchedule.getId()) {
				if (isScheduleDateOverLapping(schedule, currentSchedule)) {
					var events = eventService.getEventsByScheduleID(schedule.getId());
					for (Event event : events) {
						for (Event currentScheduleEvent : this.getEvents(currentSchedule)) {
							if (isEventTimeAndDateOverlap(currentScheduleEvent, event)) {
								conflict.add(event);
							}
						}
					}
				}
			}
		}
		return conflict;
	}

	private boolean isEventTimeAndDateOverlap(Event eventA, Event eventB) {
		Event earlierEvent, laterEvent;
		if (eventA.getBeginTime().before(eventB.getBeginTime())) {
			earlierEvent = eventA;
			laterEvent = eventB;
		} else {
			earlierEvent = eventB;
			laterEvent = eventA;
		}
		return earlierEvent.getFinishTime().after(laterEvent.getBeginTime());
	}

	private boolean isScheduleDateOverLapping(ClinicSchedule scheduleA, ClinicSchedule scheduleB) {
		ClinicSchedule earlierSchedule, laterSchedule;
		if (scheduleA.getBeginDate().getTime() <= scheduleB.getBeginDate().getTime()) {
			earlierSchedule = scheduleA;
			laterSchedule = scheduleB;
		} else {
			earlierSchedule = scheduleB;
			laterSchedule = scheduleA;
		}
		return earlierSchedule.getExpireDate().getTime() >= laterSchedule.getBeginDate().getTime();
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

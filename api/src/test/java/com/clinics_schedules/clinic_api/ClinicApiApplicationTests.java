package com.clinics_schedules.clinic_api;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import com.clinics_schedules.clinic_api.dto.BuildingDto;
import com.clinics_schedules.clinic_api.dto.ClinicDto;
import com.clinics_schedules.clinic_api.dto.ClinicScheduleDto;
import com.clinics_schedules.clinic_api.dto.EmployeeDto;
import com.clinics_schedules.clinic_api.dto.HospitalDto;
import com.clinics_schedules.clinic_api.enums.TimeRepeatUnit;
import com.clinics_schedules.clinic_api.repository.BuildingRepository;
import com.clinics_schedules.clinic_api.repository.ClinicRepository;
import com.clinics_schedules.clinic_api.repository.EmployeeRepository;
import com.clinics_schedules.clinic_api.repository.HospitalRepository;
import com.clinics_schedules.clinic_api.service.BuildingService;
import com.clinics_schedules.clinic_api.service.ClinicScheduleService;
import com.clinics_schedules.clinic_api.service.ClinicService;
import com.clinics_schedules.clinic_api.service.EmployeeService;
import com.clinics_schedules.clinic_api.service.HospitalService;

import lombok.extern.slf4j.Slf4j;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = ClinicApiApplication.class)
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-integrationtest.properties")
@Slf4j
public class ClinicApiApplicationTests {

        public ClinicApiApplicationTests() {
        }

        @Autowired
        private HospitalService hospitalService;
        @Autowired
        private HospitalRepository hospitalRepository;
        @Autowired
        private BuildingService BuildingService;
        @Autowired
        private BuildingRepository BuildingRepository;

        @Autowired
        private ClinicService clinicService;
        @Autowired
        private ClinicRepository ClinicRepository;

        @Autowired
        private ClinicScheduleService scheduleService;
        // @Autowired
        // private ClinicScheduleRepository ScheduleRepository;
        @Autowired
        private EmployeeService empService;
        @Autowired
        private EmployeeRepository EmployeeRepository;

        // @Autowired
        // private EventRepository EventRepository;

        @Test
        public void AddingScheduleTest() {
                hospitalRepository.deleteAll();
                var h = hospitalService.save(
                                HospitalDto.builder()
                                                .englishName("english name")
                                                // .arabicName("arabic")
                                                .build());
                log.info(h.toString());

                BuildingRepository.deleteAll();
                var b = BuildingService.save(
                                BuildingDto.builder()
                                                .hospitalId(h.getId())
                                                // .arabicName("b1a")
                                                .englishName("b1e")
                                                .number(0)
                                                .build());
                log.info(b.toString());

                ClinicRepository.deleteAll();
                var c = clinicService.save(
                                ClinicDto.builder()
                                                .buildingId(b.getId())
                                                // .arabicName("c1a")
                                                .englishName("c1e")
                                                .number(0)
                                                .ext("6666")
                                                .note("bad clinic")
                                                .build());
                log.info(c.toString());

                EmployeeRepository.deleteAll();
                var e = List.of(
                                empService.save(new EmployeeDto(null, "e1e", "none")),
                                empService.save(new EmployeeDto(null, "e2e", "none")),
                                empService.save(new EmployeeDto(null, "e3e", "none")));
                log.info(e.toString());
                scheduleService.getAll().forEach(sch -> scheduleService.deleteById(sch.getId()));
                var sch = scheduleService.save(
                                ClinicScheduleDto.builder()
                                                .clinicId(c.getId())
                                                .beginDate(new Date().getTime())
                                                .expireDate(new Date().getTime() + TimeUnit.DAYS.toMillis(20))
                                                .eventStart(LocalTime.of(8, 0, 0))
                                                .eventFinish(LocalTime.of(12, 0, 0))
                                                .employees(e)
                                                .repeat(TimeRepeatUnit.daily)
                                                .build());
                log.info(sch.toString());
                // hospitalRepository.deleteAll();

        }
}

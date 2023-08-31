package com.clinics_schedules.clinic_api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.clinics_schedules.clinic_api.service.HospitalService;

@SpringBootTest

class ClinicApiApplicationTests {
	@Autowired
	HospitalService hospitalService;
	


}

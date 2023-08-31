package com.clinics_schedules.clinic_api.service;

import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import com.clinics_schedules.clinic_api.entity.Hospital;
import com.clinics_schedules.clinic_api.exception.ResourceNotFoundException;
import com.clinics_schedules.clinic_api.repository.HospitalRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class HospitalService {

    public final HospitalRepository repository;



    
    public Optional<Hospital> getHospitalByName(final String name){
        final Optional<Hospital> byArabic = this.repository.findByArabicName(name);
        final Optional<Hospital> byEnglish = this.repository.findByEnglishName(name);


        return Stream.of(byArabic , byEnglish)
        .filter(Optional::isPresent)
        .findFirst()
        .orElseThrow(() -> new ResourceNotFoundException( "Hospital", "hospital_name" , name  ));

    }


}

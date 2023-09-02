package com.clinics_schedules.clinic_api.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinics_schedules.clinic_api.dto.HospitalDto;
import com.clinics_schedules.clinic_api.entity.Hospital;
import com.clinics_schedules.clinic_api.exception.ResourceNotFoundException;
import com.clinics_schedules.clinic_api.repository.HospitalRepository;

@Service
public class HospitalService {

    @Autowired
    public HospitalRepository repository;

    public Hospital save(final HospitalDto hospital) {

        return repository.save(
                Hospital.builder()
                        .id(null)
                        .arabicName(hospital.getArabicName())
                        .englishName(hospital.getEnglishName())
                        .build());
    }

    public List<Hospital> getAll() {
        return repository.findAll();
    }

    public void deleteById(final Integer id) {
        if (!repository.existsById(id))
            throw new ResourceNotFoundException("Hospital", "hospital_id", id.toString());
        repository.deleteById(id);
    }

    public Hospital updateById(final Integer id, final HospitalDto hospital) {
        final Hospital currentHospital = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("hospital", "hospital_id", Integer.toString(id)));

        currentHospital.setArabicName(hospital.getArabicName());
        currentHospital.setEnglishName(hospital.getEnglishName());

        return repository.save(currentHospital);

    }

    public Optional<Hospital> getHospitalByName(final String name) {
        final Optional<Hospital> byArabic = this.repository.findByArabicName(name);
        final Optional<Hospital> byEnglish = this.repository.findByEnglishName(name);

        return Stream.of(byArabic, byEnglish)
                .filter(Optional::isPresent)
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "hospital_name", name));

    }

}

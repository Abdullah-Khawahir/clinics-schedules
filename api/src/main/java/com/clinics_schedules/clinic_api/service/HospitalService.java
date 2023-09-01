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

    public List<HospitalDto> getAll() {
        return repository.findAll()
                .stream()
                .map(HospitalDto::new)
                .toList();
    }

    public void deleteById(final int id) {

        repository.deleteById(id);
    }

    public Hospital updateById(final int id, final HospitalDto hospital) {

        final var currentHospitalOptional = repository.findById(id);
        if (!currentHospitalOptional.isPresent())
            throw new ResourceNotFoundException("hospital", "hospital_id", Integer.toString(id));

        final var currentHospital = currentHospitalOptional.get();

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

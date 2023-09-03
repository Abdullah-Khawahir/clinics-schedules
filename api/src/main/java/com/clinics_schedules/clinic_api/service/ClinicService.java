package com.clinics_schedules.clinic_api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinics_schedules.clinic_api.dto.ClinicDto;
import com.clinics_schedules.clinic_api.entity.Clinic;
import com.clinics_schedules.clinic_api.exception.ResourceNotFoundException;
import com.clinics_schedules.clinic_api.interfaces.BasicCRUDService;
import com.clinics_schedules.clinic_api.repository.ClinicRepository;

@Service
public class ClinicService implements BasicCRUDService<Clinic, ClinicDto, Integer> {
    @Autowired
    private ClinicRepository repository;

    @Override
    public Clinic save(final ClinicDto clinicDto) {

        return repository.save(new Clinic(clinicDto));
    }

    @Override
    public List<Clinic> getAll() {
        return repository.findAll();
    }

    @Override
    public Clinic updateById(final Integer id, final ClinicDto entity) {
        final var currentClinic = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Clinic", "clinic_id", id.toString()));

        currentClinic
                .setArabicName(entity.getArabicName())
                .setEnglishName(entity.getEnglishName())
                .setBuildingId(entity.getBuildingId())
                .setNumber(entity.getNumber())
                .setExt(entity.getExt());

        return repository.save(currentClinic);
    }

    @Override
    public void deleteById(final Integer id) {
        if (!repository.existsById(id))
            throw new ResourceNotFoundException("Clinic", "clinic_id", id.toString());

        repository.deleteById(id);

    }

}

package com.clinics_schedules.clinic_api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinics_schedules.clinic_api.dto.BuildingDto;
import com.clinics_schedules.clinic_api.entity.Building;
import com.clinics_schedules.clinic_api.exception.ResourceDependencyException;
import com.clinics_schedules.clinic_api.exception.ResourceNotFoundException;
import com.clinics_schedules.clinic_api.interfaces.BasicCRUDService;
import com.clinics_schedules.clinic_api.repository.BuildingRepository;

@Service
public class BuildingService implements BasicCRUDService<Building, BuildingDto, Integer> {

    @Autowired
    private BuildingRepository repository;

    @Override
    public List<Building> getAll() {
        return repository.findAll();
    }

    @Override
    public Building save(final BuildingDto building) {
        return repository.save(
                Building.builder()
                        .id(null)
                        // .arabicName(building.getArabicName())
                        .englishName(building.getEnglishName())
                        .number(building.getNumber())
                        .hospitalId(building.getHospitalId())
                        .build());
    }

    @Override
    public Building updateById(final Integer id, final BuildingDto buildingDto) {
        final Building currentBuilding = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("building", "building_id", id.toString()));

        // currentBuilding.setArabicName(buildingDto.getArabicName());
        currentBuilding.setEnglishName(buildingDto.getEnglishName());
        currentBuilding.setNumber(buildingDto.getNumber());

        return repository.save(currentBuilding);

    }

    @Override
    public void deleteById(final Integer id) throws ResourceNotFoundException {
        if (!repository.existsById(id))
            throw new ResourceNotFoundException("Building", "building_id", id.toString());
        var target = repository.findById(id);
        if (target.map(t -> t.getClinics().isEmpty()).get()) {
            repository.deleteById(id);
        } else {
            throw new ResourceDependencyException("Building", target.get().getClinics());
        }
    }

    @Override
    public Optional<Building> getByID(Integer id) {
        return this.repository.findById(id);
    }

}

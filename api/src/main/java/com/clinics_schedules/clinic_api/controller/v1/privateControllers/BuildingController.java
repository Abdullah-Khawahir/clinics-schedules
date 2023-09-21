package com.clinics_schedules.clinic_api.controller.v1.privateControllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinics_schedules.clinic_api.dto.BuildingDto;
import com.clinics_schedules.clinic_api.entity.Building;
import com.clinics_schedules.clinic_api.service.BuildingService;

import jakarta.validation.Valid;

@RestController
@RequestMapping({ "/private" })
@CrossOrigin(origins = {"http://localhost:4200" , "*"})
public class BuildingController {
    @Autowired
    private BuildingService buildingService;

    @GetMapping(path = "/building")
    public ResponseEntity<List<BuildingDto>> getAllBuildings() {
        return ResponseEntity
                .ok(
                        buildingService
                                .getAll()
                                .stream()
                                .map(BuildingDto::new)
                                .toList());
    }

    @PostMapping(path = "/building")
    public ResponseEntity<BuildingDto> saveBuilding(
            @Valid @RequestBody(required = true) final BuildingDto building) throws DataIntegrityViolationException {

        final var newSavedBuilding = buildingService.save(building);

        return new ResponseEntity<>(new BuildingDto(newSavedBuilding), HttpStatus.CREATED);
    }

    @PutMapping(path = "/building/{id}")
    public ResponseEntity<BuildingDto> updateBuilding(@PathVariable final Integer id,
            @Valid @RequestBody final BuildingDto buildingDto) {

        final Building updateBuilding = buildingService.updateById(id, buildingDto);
        return new ResponseEntity<BuildingDto>(
                new BuildingDto(updateBuilding),
                HttpStatus.ACCEPTED);
    }

    @DeleteMapping(path = "/building/{id}")
    public void deleteById(@PathVariable(required = true) final Integer id) {
        buildingService.deleteById(id);
    }
}

package com.clinics_schedules.clinic_api.dto;

import com.clinics_schedules.clinic_api.entity.Building;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
@Setter
public class BuildingDto {

    private final Integer id;
    private final String englishName;
    private final String arabicName;
    private final Integer hospitalId;
    private final Integer number;

    public BuildingDto(final Building building) {
        this.id = building.getId();
        englishName = building.getEnglishName();
        arabicName = building.getArabicName();
        number = building.getNumber();
        hospitalId = building.getHospitalId();

    }

}

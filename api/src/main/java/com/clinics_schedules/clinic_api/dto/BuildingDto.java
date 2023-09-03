package com.clinics_schedules.clinic_api.dto;

import com.clinics_schedules.clinic_api.entity.Building;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
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
    @Size(min = 3, max = 255 )
    @NotBlank
    private final String englishName;
    @Size(min = 3, max = 255)
    @NotBlank
    private final String arabicName;
    @NotNull
    @PositiveOrZero
    private final Integer hospitalId;
    @NotNull
    @PositiveOrZero
    private final Integer number;

    public BuildingDto(final Building building) {
        this.id = building.getId();
        englishName = building.getEnglishName();
        arabicName = building.getArabicName();
        number = building.getNumber();
        hospitalId = building.getHospitalId();

    }

}

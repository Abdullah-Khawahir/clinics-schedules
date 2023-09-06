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

    private Integer id;
    @Size(min = 3, max = 255)
    @NotBlank
    private String englishName;
    @Size(min = 3, max = 255)
    @NotBlank
    private String arabicName;
    @NotNull
    @PositiveOrZero
    private Integer hospitalId;
    @NotNull
    @PositiveOrZero
    private Integer number;

    public BuildingDto(final Building building) {
        this.id = building.getId();
        englishName = building.getEnglishName();
        arabicName = building.getArabicName();
        number = building.getNumber();
        hospitalId = building.getHospitalId();

    }

}

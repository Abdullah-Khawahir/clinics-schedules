package com.clinics_schedules.clinic_api.dto;

import com.clinics_schedules.clinic_api.Const;
import com.clinics_schedules.clinic_api.entity.Clinic;
import com.clinics_schedules.clinic_api.interfaces.Dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ClinicDto implements Dto {
    private Integer id;

    @Size(min = 3, max = 255, message = Const.VARIABLE_SIZE_VALIDATION_MESSAGE)
    @NotBlank(message = Const.NON_BLANK_STRING_MESSAGE)
    private String arabicName;

    @Size(min = 3, max = 255, message = Const.VARIABLE_SIZE_VALIDATION_MESSAGE)
    @NotBlank(message = Const.NON_BLANK_STRING_MESSAGE)
    private String englishName;

    @NotNull
    @PositiveOrZero(message = Const.NON_NEGATIVE_NUMBER_MESSAGE)
    private Integer number;

    @NotNull
    @PositiveOrZero(message = Const.NON_NEGATIVE_NUMBER_MESSAGE)
    private Integer buildingId;

    private String ext;

    public ClinicDto(final Clinic clinic) {
        this.id = clinic.getId();
        this.arabicName = clinic.getArabicName();
        this.englishName = clinic.getEnglishName();
        this.number = clinic.getNumber();
        this.buildingId = clinic.getBuildingId();
        this.ext = clinic.getExt();
    }

}

package com.clinics_schedules.clinic_api.dto;

import com.clinics_schedules.clinic_api.entity.Hospital;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class HospitalDto {

    private Integer id;
    @Size(min = 3, max = 255)
    @NotBlank
    private String englishName;
   
    // @Size(min = 3, max = 255)
    // @NotBlank
    // private String arabicName;

    public HospitalDto(final Hospital hospital) {
        if (hospital == null)
            throw new IllegalStateException();
        this.id = hospital.getId();
        this.englishName = hospital.getEnglishName();
        // this.arabicName = hospital.getArabicName();

    }
}

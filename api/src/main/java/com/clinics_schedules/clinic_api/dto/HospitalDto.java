package com.clinics_schedules.clinic_api.dto;

import com.clinics_schedules.clinic_api.entity.Hospital;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
@AllArgsConstructor
public class HospitalDto  {
    private final Integer id;
    private final String englishName;
    private final String arabicName;

    public HospitalDto(final Hospital hospital){
        if( hospital == null) throw new IllegalStateException();
        this.id = hospital.getId();
        this.englishName = hospital.getEnglishName();
        this.arabicName = hospital.getArabicName();

    }
}

package com.clinics_schedules.clinic_api.dto;

import com.clinics_schedules.clinic_api.entity.Clinic;
import com.clinics_schedules.clinic_api.interfaces.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ClinicDto  implements Dto {
    private Integer id;
    private String arabicName;
    private String englishName;
    private Integer number;
    private Integer buildingId;
    private String ext;

    public ClinicDto(final Clinic clinic){
            
        this.id = clinic.getId();
        this.arabicName = clinic.getArabicName();
        this.englishName = clinic.getEnglishName();
        this.number = clinic.getNumber();
        this.buildingId = clinic.getBuildingId();
        this.ext = clinic.getExt();
    }

}

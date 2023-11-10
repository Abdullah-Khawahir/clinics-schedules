package com.clinics_schedules.clinic_api.interfaces;

import java.util.Optional;

public interface  FindableByName <T> {
    
    // Optional<T> findByArabicName(String name);
    Optional<T> findByEnglishName(String name);

}

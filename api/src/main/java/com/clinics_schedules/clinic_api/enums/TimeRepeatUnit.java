package com.clinics_schedules.clinic_api.enums;

public enum TimeRepeatUnit {
    never,
    daily,
    weekends,
    weekdays,
    weekly,
    monthly;

    @Override
    public String toString() {
        return switch (this) {
            case never -> "never";
            case daily -> "daily";
            case monthly -> "monthly";
            case weekdays -> "weekdays";
            case weekends -> "weekends";
            case weekly -> "weekly";
        };
    }

}
package com.clinics_schedules.clinic_api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.clinics_schedules.clinic_api.interceptors.LoggingInterceptor;

@Configuration
@EnableScheduling
public class AppConfig implements WebMvcConfigurer {

    @Override

    public void addInterceptors(InterceptorRegistry registry) {

        registry.addInterceptor(new LoggingInterceptor());

    }

}

package com.clinics_schedules.clinic_api.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    
    @Bean
    WebSecurityCustomizer ignore() {
        System.out.println("SecurityConfig.ignore()");
        return (web) -> web.ignoring().anyRequest();
    }
}

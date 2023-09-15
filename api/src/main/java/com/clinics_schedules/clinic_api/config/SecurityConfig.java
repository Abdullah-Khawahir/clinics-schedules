package com.clinics_schedules.clinic_api.config;

import org.apache.catalina.connector.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.clinics_schedules.clinic_api.service.UserSecurityService;

@EnableWebSecurity
@Configuration
public class SecurityConfig {
    @Autowired
    UserSecurityService userService;

    @Bean
    PasswordEncoder encoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.csrf(CsrfConfigurer::disable)
                .authorizeHttpRequests(auth -> auth.requestMatchers("/private/**").authenticated())
                .authorizeHttpRequests(auth -> auth.requestMatchers("/public/**").permitAll())
                .userDetailsService(userService)
                .httpBasic(Customizer.withDefaults())
                .build();
    }

}

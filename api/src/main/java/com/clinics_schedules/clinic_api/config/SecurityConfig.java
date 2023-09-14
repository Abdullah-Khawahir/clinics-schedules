package com.clinics_schedules.clinic_api.config;

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

import lombok.extern.slf4j.Slf4j;

@EnableWebSecurity
@Configuration
@Slf4j
public class SecurityConfig {
    @Autowired
    UserSecurityService userService;

    // DigestAuthenticationEntryPoint entryPoint() {
    // DigestAuthenticationEntryPoint result = new DigestAuthenticationEntryPoint();
    // result.setRealmName("My App Realm");
    // result.setKey("3028472b-da34-4501-bfd8-a355c42bdf92");
    // return result;
    // }

    // DigestAuthenticationFilter digestAuthenticationFilter() {
    // DigestAuthenticationFilter result = new DigestAuthenticationFilter();
    // result.setUserDetailsService(userService);
    // result.setAuthenticationEntryPoint(entryPoint());
    // return result;
    // }

    @Bean
    PasswordEncoder encoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.csrf(CsrfConfigurer::disable)
                .authorizeHttpRequests(
                        auth -> auth.anyRequest().authenticated())
                .userDetailsService(userService)
                .httpBasic(Customizer.withDefaults())
                .build();
    }

}

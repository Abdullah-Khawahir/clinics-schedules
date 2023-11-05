package com.clinics_schedules.clinic_api;

import java.util.List;

import org.junit.Test;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;
@Slf4j
public class RandomTests {

    
    @Test
    public void test() throws JsonProcessingException{
        log.info( new ObjectMapper().writeValueAsString(new ObjectMapper().writeValueAsString(List.of("a" , "b"))));
    }
}

package com.clinics_schedules.clinic_api.interceptors;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.io.IOUtils;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import jakarta.servlet.ServletRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class LoggingInterceptor implements HandlerInterceptor {
    private ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT)
            .enable(SerializationFeature.ORDER_MAP_ENTRIES_BY_KEYS);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        if ("GET".equals(request.getMethod()))
            return;
        try {
            var requestCache = new ContentCachingRequestWrapper(request);
            var requestInfo = Map.of(
                    "TYPE", "HTTP_REQUEST",
                    "Method", requestCache.getMethod(),
                    "URI", requestCache.getRequestURI(),
                    "Query", Optional.ofNullable(request.getQueryString()).orElse("__"),
                    "Headers", getHeaders(requestCache),
                    "Body",
                    IOUtils.toString(requestCache.getInputStream(), requestCache.getCharacterEncoding()),
                    "User", Optional.ofNullable(request.getUserPrincipal()).map(Principal::getName).orElse("__"),
                    "Client", requestCache.getRemoteAddr());

            var responseCache = new ContentCachingResponseWrapper(response);
            var responseInfo = Map.of(
                    "TYPE", "HTTP_RESPONSE",
                    "STATUS", response.getStatus(),
                    "Method", request.getMethod(),
                    "URI", request.getRequestURI(),
                    "Headers",
                    responseCache.getHeaderNames().stream().map(h -> h + " : " + responseCache.getHeader(h)).toList(),
                    // "Body", IOUtils.toString(responseCache.getContentAsByteArray(),
                    // Charset.forName("UTF-8").name()),
                    "User", Optional.ofNullable(request.getUserPrincipal()).map(Principal::getName).orElse("__"),
                    "Client", request.getRemoteAddr());

            var requestAndResponse = Map.of("Request", requestInfo, "Response", responseInfo);
            log.info("Request: \n{}\n", mapper.writeValueAsString(requestAndResponse));
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private List<String> getHeaders(ServletRequest request) {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        Enumeration<String> headerNames = httpRequest.getHeaderNames();
        var list = new ArrayList<String>();
        if (headerNames != null) {
            while (headerNames.hasMoreElements()) {
                var headerName = headerNames.nextElement();
                list.add(headerName + " : " + httpRequest.getHeader(headerName));
            }
        }
        return list;
    }

}
